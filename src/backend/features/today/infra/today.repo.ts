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
            // Also count pending messages as overdue (user needs to confirm they sent them)
            const now = new Date();
            const overdueConversations = await prisma.conversation.count({
                where: {
                    userId,
                    nextActionDueAt: {
                        lt: now,
                        not: null,
                    },
                },
            });
            
            const pendingMessages = await prisma.message.count({
                where: {
                    conversation: {
                        userId,
                    },
                    sender: 'user',
                    status: 'pending',
                },
            });
            
            const overdueFollowUps = overdueConversations + pendingMessages;

            return {
                activeOpportunities: activeConversations,
                interviewsInProgress,
                overdueFollowUps,
            };
        },

        /**
         * Get prioritized actions for today
         * Includes conversations with nextActionDueAt <= end of today and conversations with pending messages
         */
        async getTodayActions(userId: string) {
            const now = new Date();
            const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

            // Get conversations with actions due today
            const conversationsWithActions = await prisma.conversation.findMany({
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

            // Get conversations with pending messages (user needs to confirm they sent them)
            const conversationsWithPendingMessages = await prisma.conversation.findMany({
                where: {
                    userId,
                    messages: {
                        some: {
                            sender: 'user',
                            status: 'pending',
                        },
                    },
                },
                include: {
                    contact: true,
                    category: true,
                    stage: true,
                    messages: {
                        where: {
                            sender: 'user',
                            status: 'pending',
                        },
                        orderBy: {
                            sentAt: 'asc',
                        },
                        take: 1,
                    },
                },
                take: 20,
            });

            // Combine and deduplicate by conversation ID
            const allActions = new Map<string, {
                id: string;
                type: 'reply' | 'follow_up' | 'outreach';
                title: string;
                description?: string;
                conversationId: string;
                contactName: string;
                contactCompany?: string;
                dueAt: Date;
                priority: 'high' | 'medium' | 'low' | null;
                category?: string;
                stage?: string;
            }>();

            // Add conversations with actions due today
            conversationsWithActions.forEach((conv) => {
                allActions.set(conv.id, {
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
                });
            });

            // Add conversations with pending messages (if not already added)
            conversationsWithPendingMessages.forEach((conv) => {
                if (!allActions.has(conv.id)) {
                    const oldestPendingMessage = conv.messages[0];
                    allActions.set(conv.id, {
                        id: `pending-${conv.id}`,
                        type: 'follow_up',
                        title: `Confirm message sent - ${conv.contact.name}`,
                        description: oldestPendingMessage?.body
                            ? oldestPendingMessage.body.slice(0, 150) + (oldestPendingMessage.body.length > 150 ? '...' : '')
                            : undefined,
                        conversationId: conv.id,
                        contactName: conv.contact.name,
                        contactCompany: conv.contact.company || undefined,
                        dueAt: oldestPendingMessage?.sentAt || now,
                        priority: conv.priority as 'high' | 'medium' | 'low',
                        category: conv.category?.name || undefined,
                        stage: conv.stage?.name || undefined,
                    });
                }
            });

            // Sort by priority and due date, then return
            return Array.from(allActions.values()).sort((a, b) => {
                // First by priority (high > medium > low > null)
                const priorityOrder = { high: 3, medium: 2, low: 1, null: 0 };
                const aPriority = priorityOrder[a.priority || 'null'];
                const bPriority = priorityOrder[b.priority || 'null'];
                if (aPriority !== bPriority) {
                    return bPriority - aPriority;
                }
                // Then by due date
                return a.dueAt.getTime() - b.dueAt.getTime();
            }).slice(0, 20);
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
         * Includes conversations with overdue nextActionDueAt and conversations with pending messages
         */
        async getOverdueItems(userId: string) {
            const now = new Date();

            // Get conversations with overdue nextActionDueAt
            const overdueConversations = await prisma.conversation.findMany({
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

            // Get conversations with pending messages
            const conversationsWithPendingMessages = await prisma.conversation.findMany({
                where: {
                    userId,
                    messages: {
                        some: {
                            sender: 'user',
                            status: 'pending',
                        },
                    },
                },
                include: {
                    contact: true,
                    messages: {
                        where: {
                            sender: 'user',
                            status: 'pending',
                        },
                        orderBy: {
                            sentAt: 'asc',
                        },
                        take: 1,
                    },
                },
                take: 20,
            });

            // Combine and deduplicate by conversation ID
            const allOverdue = new Map<string, {
                id: string;
                conversationId: string;
                contactName: string;
                contactCompany?: string;
                actionType: string;
                dueDate: Date;
                daysOverdue: number;
                messagePreview?: string;
            }>();

            // Add overdue conversations
            overdueConversations.forEach((conv) => {
                const daysOverdue = Math.floor(
                    (now.getTime() - conv.nextActionDueAt!.getTime()) / (1000 * 60 * 60 * 24)
                );
                allOverdue.set(conv.id, {
                    id: `overdue-${conv.id}`,
                    conversationId: conv.id,
                    contactName: conv.contact.name,
                    contactCompany: conv.contact.company || undefined,
                    actionType: conv.nextActionType || 'Follow up',
                    dueDate: conv.nextActionDueAt!,
                    daysOverdue,
                });
            });

            // Add conversations with pending messages (if not already added)
            conversationsWithPendingMessages.forEach((conv) => {
                if (!allOverdue.has(conv.id)) {
                    const oldestPendingMessage = conv.messages[0];
                    const daysOverdue = oldestPendingMessage
                        ? Math.floor(
                              (now.getTime() - oldestPendingMessage.sentAt.getTime()) / (1000 * 60 * 60 * 24)
                          )
                        : 0;
                    // Create a preview of the message (first 150 characters)
                    const messagePreview = oldestPendingMessage?.body
                        ? oldestPendingMessage.body.slice(0, 150) + (oldestPendingMessage.body.length > 150 ? '...' : '')
                        : undefined;
                    allOverdue.set(conv.id, {
                        id: `pending-${conv.id}`,
                        conversationId: conv.id,
                        contactName: conv.contact.name,
                        contactCompany: conv.contact.company || undefined,
                        actionType: 'Confirm message sent',
                        dueDate: oldestPendingMessage?.sentAt || now,
                        daysOverdue,
                        messagePreview,
                    });
                }
            });

            return Array.from(allOverdue.values()).sort((a, b) => a.daysOverdue - b.daysOverdue).slice(0, 20);
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
