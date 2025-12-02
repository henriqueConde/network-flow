import { prisma } from '@/backend/core/db/prisma';
import type { ConversationChannelType } from '@/shared/types';

/**
 * Repository for Conversations Inbox.
 * Handles data access for listing and creating conversations.
 */
export function makeConversationsRepo() {
  return {
    /**
     * List conversations for the inbox view.
     * Basic filters:
     * - search: matches contact name or company (ILIKE)
     * - status: all | needs_attention | waiting_on_them
     */
    async listConversations(params: {
      userId: string;
      search?: string;
      status?: 'all' | 'needs_attention' | 'waiting_on_them';
      page: number;
      pageSize: number;
      sortBy: 'updatedAt' | 'lastMessageAt' | 'priority';
      sortDir: 'asc' | 'desc';
    }) {
      const {
        userId,
        search,
        status = 'all',
        page,
        pageSize,
        sortBy,
        sortDir,
      } = params;

      const where: any = {
        userId,
      };

      if (search && search.trim().length > 0) {
        where.OR = [
          {
            contact: {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
          {
            contact: {
              company: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
        ];
      }

      if (status === 'needs_attention') {
        // Heuristic: last message from contact or overdue next action
        where.OR = [
          ...(where.OR ?? []),
          {
            lastMessageSide: 'contact',
          },
          {
            nextActionDueAt: {
              lt: new Date(),
              not: null,
            },
          },
        ];
      } else if (status === 'waiting_on_them') {
        // Last message from user and no overdue action
        where.AND = [
          ...(where.AND ?? []),
          {
            lastMessageSide: 'user',
          },
          {
            OR: [
              {
                nextActionDueAt: null,
              },
              {
                nextActionDueAt: {
                  gte: new Date(),
                },
              },
            ],
          },
        ];
      }

      const conversations = await prisma.conversation.findMany({
        where,
        include: {
          contact: true,
          category: true,
          stage: true,
        },
        orderBy:
          sortBy === 'priority'
            ? [{ priority: sortDir }]
            : [{ [sortBy]: sortDir }, { lastMessageAt: 'desc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      const now = new Date();

      return conversations.map((conv) => {
        const hasOverdueAction =
          conv.nextActionDueAt !== null && conv.nextActionDueAt < now;

        const needsAttention =
          conv.lastMessageSide === 'contact' || hasOverdueAction;

        return {
          id: conv.id,
          contactName: conv.contact.name,
          contactCompany: conv.contact.company ?? null,
          channel: conv.channel,
          category: conv.category?.name ?? null,
          stage: conv.stage?.name ?? null,
          lastMessageAt: conv.lastMessageAt,
          lastMessageSnippet: conv.lastMessageSnippet ?? null,
          lastMessageSide: conv.lastMessageSide as 'user' | 'contact' | null,
          priority: (conv.priority as 'low' | 'medium' | 'high') ?? 'medium',
          isOutOfSync: conv.isOutOfSync,
          needsAttention,
        };
      });
    },

    /**
     * Create a new conversation (and contact if needed), with a single raw message.
     */
    async createConversation(params: {
      userId: string;
      contactId?: string;
      contactName: string;
      contactCompany?: string;
      channel: ConversationChannelType;
      pastedText: string;
      categoryId?: string;
      stageId?: string;
      priority: 'low' | 'medium' | 'high';
    }) {
      const {
        userId,
        contactId,
        contactName,
        contactCompany,
        channel,
        pastedText,
        categoryId,
        stageId,
        priority,
      } = params;

      const now = new Date();

      // Either use existing contact or create a new one
      const contact =
        contactId != null
          ? await prisma.contact.findFirst({
              where: {
                id: contactId,
                userId,
              },
            })
          : null;

      const ensuredContact =
        contact ??
        (await prisma.contact.create({
          data: {
            userId,
            name: contactName,
            company: contactCompany,
          },
        }));

      const conversation = await prisma.conversation.create({
        data: {
          userId,
          contactId: ensuredContact.id,
          channel,
          categoryId: categoryId ?? null,
          stageId: stageId ?? null,
          priority,
          lastMessageAt: now,
          lastMessageSide: 'contact',
          lastMessageSnippet: pastedText.slice(0, 2000),
        },
      });

      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          sender: 'contact',
          body: pastedText,
          sentAt: now,
          source: 'manual_paste',
        },
      });

      return conversation;
    },

    /**
     * Get a single conversation by ID with all related data.
     * Includes messages and latest email event if out of sync.
     */
    async getConversationById(params: { userId: string; conversationId: string }) {
      const { userId, conversationId } = params;

      const conversation = await prisma.conversation.findFirst({
        where: {
          id: conversationId,
          userId,
        },
        include: {
          contact: true,
          category: true,
          stage: true,
          messages: {
            orderBy: {
              sentAt: 'asc',
            },
          },
          linkedInEmailEvents: {
            orderBy: {
              emailReceivedAt: 'desc',
            },
            take: 1,
          },
        },
      });

      if (!conversation) {
        return null;
      }

      return {
        id: conversation.id,
        contactId: conversation.contactId,
        contactName: conversation.contact.name,
        contactCompany: conversation.contact.company ?? null,
        channel: conversation.channel,
        categoryId: conversation.categoryId ?? null,
        categoryName: conversation.category?.name ?? null,
        stageId: conversation.stageId ?? null,
        stageName: conversation.stage?.name ?? null,
        nextActionType: conversation.nextActionType ?? null,
        nextActionDueAt: conversation.nextActionDueAt,
        priority: conversation.priority as 'low' | 'medium' | 'high',
        isOutOfSync: conversation.isOutOfSync,
        summary: conversation.summary ?? null,
        notes: conversation.notes ?? null,
        lastMessageAt: conversation.lastMessageAt,
        lastMessageSide: conversation.lastMessageSide as 'user' | 'contact' | null,
        messages: conversation.messages.map((msg) => ({
          id: msg.id,
          sender: msg.sender as 'user' | 'contact',
          body: msg.body,
          sentAt: msg.sentAt,
          source: msg.source,
        })),
        latestEmailEvent:
          conversation.linkedInEmailEvents.length > 0
            ? {
                id: conversation.linkedInEmailEvents[0].id,
                senderName: conversation.linkedInEmailEvents[0].senderName,
                snippet: conversation.linkedInEmailEvents[0].snippet ?? null,
                emailReceivedAt: conversation.linkedInEmailEvents[0].emailReceivedAt,
              }
            : null,
      };
    },

    /**
     * Update a conversation's metadata (category, stage, next action, notes, etc.).
     */
    async updateConversation(params: {
      userId: string;
      conversationId: string;
      updates: {
        categoryId?: string | null;
        stageId?: string | null;
        nextActionType?: string | null;
        nextActionDueAt?: Date | null;
        priority?: 'low' | 'medium' | 'high';
        notes?: string | null;
      };
    }) {
      const { userId, conversationId, updates } = params;

      const conversation = await prisma.conversation.updateMany({
        where: {
          id: conversationId,
          userId,
        },
        data: {
          ...(updates.categoryId !== undefined && { categoryId: updates.categoryId }),
          ...(updates.stageId !== undefined && { stageId: updates.stageId }),
          ...(updates.nextActionType !== undefined && { nextActionType: updates.nextActionType }),
          ...(updates.nextActionDueAt !== undefined && {
            nextActionDueAt: updates.nextActionDueAt,
          }),
          ...(updates.priority !== undefined && { priority: updates.priority }),
          ...(updates.notes !== undefined && { notes: updates.notes }),
        },
      });

      if (conversation.count === 0) {
        return null;
      }

      // Return updated conversation
      return this.getConversationById({ userId, conversationId });
    },

    /**
     * Add a message to a conversation.
     * Updates the conversation's lastMessageAt, lastMessageSide, and lastMessageSnippet.
     */
    async addMessage(params: {
      userId: string;
      conversationId: string;
      body: string;
      sender: 'user' | 'contact';
      sentAt: Date;
    }) {
      const { userId, conversationId, body, sender, sentAt } = params;

      // Verify conversation belongs to user
      const conversation = await prisma.conversation.findFirst({
        where: {
          id: conversationId,
          userId,
        },
      });

      if (!conversation) {
        return null;
      }

      // Create the message
      const message = await prisma.message.create({
        data: {
          conversationId,
          sender,
          body,
          sentAt,
          source: 'manual_reply',
        },
      });

      // Update conversation metadata
      await prisma.conversation.update({
        where: { id: conversationId },
        data: {
          lastMessageAt: sentAt,
          lastMessageSide: sender,
          lastMessageSnippet: body.slice(0, 2000),
        },
      });

      // Return updated conversation with all messages
      return this.getConversationById({ userId, conversationId });
    },
  };
}


