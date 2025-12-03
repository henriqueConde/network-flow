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
      categoryId?: string;
      stageId?: string;
      page: number;
      pageSize: number;
      sortBy: 'updatedAt' | 'lastMessageAt' | 'priority';
      sortDir: 'asc' | 'desc';
    }) {
      const {
        userId,
        search,
        status = 'all',
        categoryId,
        stageId,
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

      if (categoryId) {
        where.categoryId = categoryId;
      }

      if (stageId) {
        where.stageId = stageId;
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
          priority: (conv.priority as 'low' | 'medium' | 'high' | null) ?? null,
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
      priority: 'low' | 'medium' | 'high' | null;
      firstMessageSender: 'user' | 'contact';
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
        firstMessageSender,
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

      // Find or create an opportunity for this contact
      let opportunity = await prisma.opportunity.findFirst({
        where: {
          userId,
          contactId: ensuredContact.id,
        },
        orderBy: {
          createdAt: 'desc', // Get the most recent one
        },
      });

      // If no opportunity exists, create one with metadata from the conversation
      if (!opportunity) {
        // Generate opportunity title from contact and company
        let title: string | null = null;
        if (contactCompany) {
          title = contactCompany;
          if (ensuredContact.headlineOrRole) {
            title = `${ensuredContact.headlineOrRole} at ${contactCompany}`;
          }
        }

        opportunity = await prisma.opportunity.create({
          data: {
            userId,
            contactId: ensuredContact.id,
            title,
            categoryId: categoryId ?? null,
            stageId: stageId ?? null,
            nextActionType: null,
            nextActionDueAt: null,
            priority: (priority ?? 'medium') as 'low' | 'medium' | 'high' | null,
          },
        });
      }

      // Create conversation and link it to the opportunity
      const conversation = await prisma.conversation.create({
        data: {
          userId,
          contactId: ensuredContact.id,
          opportunityId: opportunity.id,
          channel,
          categoryId: categoryId ?? null,
          stageId: stageId ?? null,
          priority: (priority ?? null) as any,
          lastMessageAt: now,
          lastMessageSide: firstMessageSender,
          lastMessageSnippet: pastedText.slice(0, 2000),
        },
      });

      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          sender: firstMessageSender,
          body: pastedText,
          sentAt: now,
          source: 'manual_paste',
          status: 'pending', // Messages start as pending by default
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
        originalUrl: conversation.originalUrl ?? null,
        lastMessageAt: conversation.lastMessageAt,
        lastMessageSide: conversation.lastMessageSide as 'user' | 'contact' | null,
        messages: conversation.messages.map((msg) => ({
          id: msg.id,
          sender: msg.sender as 'user' | 'contact',
          body: msg.body,
          sentAt: msg.sentAt,
          source: msg.source,
          status: msg.status as 'pending' | 'confirmed',
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
     * Helper: Check if a stage is a closed stage by its ID.
     * A stage is considered closed if its name starts with "Closed".
     */
    async isClosedStage(userId: string, stageId: string | null): Promise<boolean> {
      if (!stageId) {
        return false;
      }

      const stage = await prisma.stage.findFirst({
        where: {
          id: stageId,
          userId,
        },
      });

      if (!stage) {
        return false;
      }

      // Check if the stage name starts with "Closed" (e.g., "Closed (positive)", "Closed (negative)")
      return stage.name.toLowerCase().startsWith('closed');
    },

    /**
     * Update a conversation's metadata (category, stage, next action, notes, etc.).
     * If moving to a closed stage, automatically sets priority and next action to null.
     * If moving to "Interviewing" stage, automatically links to an opportunity for the contact.
     */
    async updateConversation(params: {
      userId: string;
      conversationId: string;
      updates: {
        categoryId?: string | null;
        stageId?: string | null;
        nextActionType?: string | null;
        nextActionDueAt?: Date | null;
        priority?: 'low' | 'medium' | 'high' | null;
        notes?: string | null;
        originalUrl?: string | null;
      };
    }) {
      const { userId, conversationId, updates } = params;

      // Get current conversation to check opportunityId and contactId
      const currentConversation = await prisma.conversation.findFirst({
        where: {
          id: conversationId,
          userId,
        },
        select: {
          opportunityId: true,
          contactId: true,
        },
      });

      if (!currentConversation) {
        return null;
      }

      // Check if we're moving to a closed stage
      let isMovingToClosedStage = false;
      if (updates.stageId !== undefined) {
        isMovingToClosedStage = await this.isClosedStage(userId, updates.stageId);
      }

      // Check if we're moving to "Interviewing" stage
      let opportunityIdToLink: string | null = null;
      if (updates.stageId !== undefined && updates.stageId !== null && !currentConversation.opportunityId) {
        const newStage = await prisma.stage.findFirst({
          where: {
            id: updates.stageId,
            userId,
          },
        });
        if (newStage && newStage.name === 'Interviewing') {
          // Find or create an opportunity for this contact
          let opportunity = await prisma.opportunity.findFirst({
            where: {
              userId,
              contactId: currentConversation.contactId,
            },
            orderBy: {
              createdAt: 'desc', // Get the most recent one
            },
          });

          // If no opportunity exists, create one
          if (!opportunity) {
            opportunity = await prisma.opportunity.create({
              data: {
                userId,
                contactId: currentConversation.contactId,
                categoryId: updates.categoryId ?? null,
                stageId: updates.stageId ?? null,
              },
            });
          }

          opportunityIdToLink = opportunity.id;
        }
      }

      // Build update data object, only including defined fields
      const updateData: any = {};
      if (updates.categoryId !== undefined) {
        updateData.categoryId = updates.categoryId;
      }
      if (updates.stageId !== undefined) {
        updateData.stageId = updates.stageId;
      }
      if (opportunityIdToLink !== null) {
        updateData.opportunityId = opportunityIdToLink;
      }
      if (updates.nextActionType !== undefined) {
        updateData.nextActionType = updates.nextActionType;
      }
      if (updates.nextActionDueAt !== undefined) {
        updateData.nextActionDueAt = updates.nextActionDueAt;
      }
      if (updates.priority !== undefined) {
        updateData.priority = updates.priority;
      }
      if (updates.notes !== undefined) {
        updateData.notes = updates.notes;
      }
      if (updates.originalUrl !== undefined) {
        updateData.originalUrl = updates.originalUrl;
      }

      // If moving to a closed stage, set priority and next action to null
      if (isMovingToClosedStage) {
        updateData.priority = null;
        updateData.nextActionType = null;
        updateData.nextActionDueAt = null;
      }

      const conversation = await prisma.conversation.updateMany({
        where: {
          id: conversationId,
          userId,
        },
        data: updateData,
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
      // Default is 'pending', but we set 'confirmed' for contact messages (they already exist in the original platform)
      // User messages stay 'pending' until they confirm they sent it
      const status = sender === 'contact' ? 'confirmed' : 'pending';

      const message = await prisma.message.create({
        data: {
          conversationId,
          sender,
          body,
          sentAt,
          source: 'manual_reply',
          status,
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

    /**
     * Update a message's body and/or sentAt.
     * All messages can be updated.
     */
    async updateMessage(params: {
      userId: string;
      messageId: string;
      body?: string;
      sentAt?: Date;
    }) {
      const { userId, messageId, body, sentAt } = params;

      // First, verify the message exists and belongs to a conversation owned by the user
      const message = await prisma.message.findFirst({
        where: {
          id: messageId,
          conversation: {
            userId,
          },
        },
        include: {
          conversation: true,
        },
      });

      if (!message) {
        return null;
      }

      // Build update data
      const updateData: any = {};
      if (body !== undefined) {
        updateData.body = body;
      }
      if (sentAt !== undefined) {
        updateData.sentAt = sentAt;
      }

      // Update message
      await prisma.message.update({
        where: { id: messageId },
        data: updateData,
      });

      // If body or sentAt was updated, check if we need to update conversation metadata
      if (body !== undefined || sentAt !== undefined) {
        const allMessages = await prisma.message.findMany({
          where: { conversationId: message.conversationId },
          orderBy: { sentAt: 'desc' },
          take: 1,
        });

        if (allMessages.length > 0 && allMessages[0].id === messageId) {
          const updatedMessage = await prisma.message.findUnique({
            where: { id: messageId },
          });
          
          if (updatedMessage) {
            await prisma.conversation.update({
              where: { id: message.conversationId },
              data: {
                lastMessageAt: updatedMessage.sentAt,
                lastMessageSide: updatedMessage.sender,
                lastMessageSnippet: updatedMessage.body.slice(0, 2000),
              },
            });
          }
        }
      }

      // Return updated conversation
      return this.getConversationById({
        userId,
        conversationId: message.conversationId,
      });
    },

    /**
     * Delete a message.
     * All messages can be deleted.
     * Updates conversation metadata if the deleted message was the last one.
     */
    async deleteMessage(params: {
      userId: string;
      messageId: string;
    }) {
      const { userId, messageId } = params;

      // First, verify the message exists and belongs to a conversation owned by the user
      const message = await prisma.message.findFirst({
        where: {
          id: messageId,
          conversation: {
            userId,
          },
        },
        include: {
          conversation: true,
        },
      });

      if (!message) {
        return null;
      }

      const conversationId = message.conversationId;

      // Delete the message
      await prisma.message.delete({
        where: { id: messageId },
      });

      // Update conversation metadata if needed
      const remainingMessages = await prisma.message.findMany({
        where: { conversationId },
        orderBy: { sentAt: 'desc' },
        take: 1,
      });

      if (remainingMessages.length > 0) {
        const lastMessage = remainingMessages[0];
        await prisma.conversation.update({
          where: { id: conversationId },
          data: {
            lastMessageAt: lastMessage.sentAt,
            lastMessageSide: lastMessage.sender,
            lastMessageSnippet: lastMessage.body.slice(0, 2000),
          },
        });
      } else {
        // No messages left, clear conversation metadata
        await prisma.conversation.update({
          where: { id: conversationId },
          data: {
            lastMessageAt: null,
            lastMessageSide: null,
            lastMessageSnippet: null,
          },
        });
      }

      // Return updated conversation
      return this.getConversationById({
        userId,
        conversationId,
      });
    },

    /**
     * Toggle message status between pending and confirmed.
     * Only user-created messages can have their status toggled.
     */
    async toggleMessageStatus(params: {
      userId: string;
      messageId: string;
    }) {
      const { userId, messageId } = params;

      // First, verify the message exists and belongs to a conversation owned by the user
      const message = await prisma.message.findFirst({
        where: {
          id: messageId,
          conversation: {
            userId,
          },
        },
        include: {
          conversation: true,
        },
      });

      if (!message) {
        return null;
      }

      // Only allow toggling status for user messages
      if (message.sender !== 'user') {
        return this.getConversationById({
          userId,
          conversationId: message.conversationId,
        });
      }

      // Toggle status: pending -> confirmed, confirmed -> pending
      const newStatus = message.status === 'pending' ? 'confirmed' : 'pending';

      // Update message status
      await prisma.message.update({
        where: { id: messageId },
        data: { status: newStatus },
      });

      // Return updated conversation
      return this.getConversationById({
        userId,
        conversationId: message.conversationId,
      });
    },

    /**
     * Delete a conversation.
     * This will cascade delete all associated messages
     * due to the onDelete: Cascade relationship in the schema.
     */
    async deleteConversation(params: { userId: string; conversationId: string }) {
      const { userId, conversationId } = params;

      // First verify the conversation exists and belongs to the user
      const conversation = await prisma.conversation.findFirst({
        where: {
          id: conversationId,
          userId,
        },
      });

      if (!conversation) {
        return false;
      }

      // Use delete (not deleteMany) to ensure cascade deletes work properly
      // The cascade will automatically delete:
      // - All messages in this conversation (via message's cascade)
      await prisma.conversation.delete({
        where: {
          id: conversationId,
        },
      });

      return true;
    },
  };
}


