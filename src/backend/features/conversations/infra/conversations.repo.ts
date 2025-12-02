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
  };
}


