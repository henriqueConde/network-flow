import { prisma } from '@/backend/core/db/prisma';
import { ConversationChannel, ConversationChannelType } from '@/shared/types';

/**
 * Repository for Today page data access.
 * Handles all database queries for metrics, actions, messages, and overdue items.
 */
export function makeTodayRepo() {
    return {
        /**
         * Get today's metrics for a user
         */
        async getMetrics(userId: string) {
            // Active opportunities (conversations that have a stage, excluding dormant/closed)
            // For now, count all conversations with a stage that's not null
            const allConversations = await prisma.conversation.findMany({
                where: {
                    userId,
                    stageId: {
                        not: null,
                    },
                },
                include: {
                    stage: true,
                },
            });

            const activeConversations = allConversations.filter(
                (conv) =>
                    conv.stage &&
                    !['Dormant', 'Closed (positive)', 'Closed (negative)'].includes(conv.stage.name)
            ).length;

            // Interviews in progress (stage name = "Interviewing")
            const interviewingStage = await prisma.stage.findFirst({
                where: {
                    userId,
                    name: 'Interviewing',
                },
            });

            const interviewsInProgress = interviewingStage
                ? await prisma.conversation.count({
                    where: {
                        userId,
                        stageId: interviewingStage.id,
                    },
                })
                : 0;

            // Overdue follow-ups (nextActionDueAt < now and not null)
            const now = new Date();
            const overdueFollowUps = await prisma.conversation.count({
                where: {
                    userId,
                    nextActionDueAt: {
                        lt: now,
                        not: null,
                    },
                },
            });

            return {
                activeOpportunities: activeConversations,
                interviewsInProgress,
                overdueFollowUps,
            };
        },

        /**
         * Get prioritized actions for today
         */
        async getTodayActions(userId: string) {
            const now = new Date();
            const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

            const conversations = await prisma.conversation.findMany({
                where: {
                    userId,
                    nextActionDueAt: {
                        lte: endOfToday,
                        not: null,
                    },
                },
                include: {
                    contact: true,
                    category: true,
                    stage: true,
                },
                orderBy: [
                    {
                        priority: 'desc', // high > medium > low
                    },
                    {
                        nextActionDueAt: 'asc',
                    },
                ],
                take: 20,
            });

            return conversations.map((conv) => ({
                id: `action-${conv.id}`,
                type: inferActionType(conv.nextActionType, conv.lastMessageSide),
                title: generateActionTitle(conv.nextActionType, conv.contact.name),
                description: conv.lastMessageSnippet || undefined,
                conversationId: conv.id,
                contactName: conv.contact.name,
                contactCompany: conv.contact.company || undefined,
                dueAt: conv.nextActionDueAt!,
                priority: conv.priority as 'high' | 'medium' | 'low',
                category: conv.category?.name || undefined,
                stage: conv.stage?.name || undefined,
            }));
        },

        /**
         * Get new messages from email notifications (signals only, not content).
         * These are LinkedIn notification emails that indicate new DMs exist,
         * prompting the user to manually paste the actual message content.
         */
        async getNewMessages(userId: string) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);

            const emailEvents = await prisma.linkedInEmailEvent.findMany({
                where: {
                    userId,
                    emailReceivedAt: {
                        gte: yesterday,
                    },
                    matchedConversationId: {
                        not: null,
                    },
                },
                include: {
                    matchedConversation: {
                        include: {
                            contact: true,
                        },
                    },
                },
                orderBy: {
                    emailReceivedAt: 'desc',
                },
                take: 10,
            });

            // Check out-of-sync status for each conversation
            const messages = await Promise.all(
                emailEvents.map(async (event) => {
                    const isOutOfSync = await isConversationOutOfSync(userId, event.matchedConversationId!);
                    return {
                        id: event.id,
                        conversationId: event.matchedConversationId!,
                        contactName: event.matchedConversation?.contact.name || event.senderName,
                        contactCompany: event.matchedConversation?.contact.company || undefined,
                        snippet: event.snippet || event.subject,
                        receivedAt: event.emailReceivedAt,
                        channel: ConversationChannel.LINKEDIN,
                        isOutOfSync,
                    };
                })
            );

            return messages;
        },

        /**
         * Get overdue items
         */
        async getOverdueItems(userId: string) {
            const now = new Date();

            const conversations = await prisma.conversation.findMany({
                where: {
                    userId,
                    nextActionDueAt: {
                        lt: now,
                        not: null,
                    },
                },
                include: {
                    contact: true,
                },
                orderBy: {
                    nextActionDueAt: 'asc', // Oldest first
                },
                take: 20,
            });

            return conversations.map((conv) => {
                const daysOverdue = Math.floor(
                    (now.getTime() - conv.nextActionDueAt!.getTime()) / (1000 * 60 * 60 * 24)
                );

                return {
                    id: `overdue-${conv.id}`,
                    conversationId: conv.id,
                    contactName: conv.contact.name,
                    contactCompany: conv.contact.company || undefined,
                    actionType: conv.nextActionType || 'Follow up',
                    dueDate: conv.nextActionDueAt!,
                    daysOverdue,
                };
            });
        },
    };
}

/**
 * Helper: Infer action type from nextActionType and lastMessageSide
 */
function inferActionType(
    nextActionType: string | null,
    lastMessageSide: string | null
): 'reply' | 'follow_up' | 'outreach' {
    if (!nextActionType) return 'follow_up';
    const action = nextActionType.toLowerCase();
    if (action.includes('reply') || (lastMessageSide === 'contact' && action.includes('respond'))) {
        return 'reply';
    }
    if (action.includes('reach') || action.includes('outreach') || action.includes('contact')) {
        return 'outreach';
    }
    return 'follow_up';
}

/**
 * Helper: Generate action title
 */
function generateActionTitle(nextActionType: string | null, contactName: string): string {
    if (!nextActionType) return `Follow up with ${contactName}`;
    return `${nextActionType} - ${contactName}`;
}

/**
 * Helper: Check if conversation is out of sync.
 * A conversation is out of sync if there's an email notification timestamp
 * that's newer than the last message timestamp in the conversation.
 * This indicates there are newer messages on LinkedIn that haven't been pasted yet.
 */
async function isConversationOutOfSync(userId: string, conversationId: string): Promise<boolean> {
    // Get the conversation to check its last message timestamp
    const conversation = await prisma.conversation.findUnique({
        where: { id: conversationId },
        select: { lastMessageAt: true },
    });

    if (!conversation || !conversation.lastMessageAt) {
        // If no messages in conversation yet, check if there's any email event
        const hasEmailEvent = await prisma.linkedInEmailEvent.findFirst({
            where: {
                userId,
                matchedConversationId: conversationId,
            },
        });
        return !!hasEmailEvent;
    }

    // Get the latest email notification for this conversation
    const latestEmailEvent = await prisma.linkedInEmailEvent.findFirst({
        where: {
            userId,
            matchedConversationId: conversationId,
        },
        orderBy: {
            emailReceivedAt: 'desc',
        },
    });

    if (!latestEmailEvent) {
        return false;
    }

    // Conversation is out of sync if email notification is newer than last pasted message
    return (
        latestEmailEvent.emailReceivedAt.getTime() >
        conversation.lastMessageAt.getTime()
    );
}
