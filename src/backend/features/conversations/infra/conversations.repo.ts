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
      emailStatus?: 'no_reply' | 'replied' | 'call_scheduled' | 'rejected' | 'in_process';
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
        emailStatus,
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
          {
            conversationContacts: {
              some: {
                contact: {
                  name: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
            },
          },
          {
            conversationContacts: {
              some: {
                contact: {
                  company: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
            },
          },
        ];
      }

      if (categoryId) {
        // Filter by conversation's category
        where.categoryId = categoryId;
      }

      if (stageId) {
        where.stageId = stageId;
      }

      if (emailStatus) {
        where.emailStatus = emailStatus;
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
          contact: {
            select: {
              name: true,
              company: true,
              warmOrCold: true,
            },
          },
          conversationContacts: {
            include: {
              contact: {
                select: {
                  name: true,
                  company: true,
                },
              },
            },
          },
          category: {
            select: {
              name: true,
            },
          },
          stage: {
            select: {
              name: true,
            },
          },
          challenge: {
            select: {
              id: true,
              name: true,
            },
          },
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

        const contactCount = conv.conversationContacts.length || 1;

        return {
          id: conv.id,
          contactName: conv.contact.name,
          contactCompany: conv.contact.company ?? null,
          contactCount,
          channel: conv.channel,
          category: conv.category?.name ?? null, // Use conversation's category
          stage: conv.stage?.name ?? null,
          lastMessageAt: conv.lastMessageAt,
          lastMessageSnippet: conv.lastMessageSnippet ?? null,
          lastMessageSide: conv.lastMessageSide as 'user' | 'contact' | null,
          priority: (conv.priority as 'low' | 'medium' | 'high' | null) ?? null,
          isOutOfSync: conv.isOutOfSync,
          needsAttention,
          warmOrCold: conv.contact.warmOrCold as 'warm' | 'cold' | null,
          challengeId: conv.challenge?.id ?? null,
          challengeName: conv.challenge?.name ?? null,
        };
      });
    },

    /**
     * Create a new conversation (and contact if needed), with a single raw message.
     */
    async createConversation(params: {
      userId: string;
      contactId?: string;
      contactIds?: string[];
      contactName: string;
      contactCompany?: string;
      opportunityId?: string;
      challengeId?: string;
      channel: ConversationChannelType;
      pastedText: string;
      categoryId?: string;
      stageId?: string;
      priority: 'low' | 'medium' | 'high' | null;
      firstMessageSender: 'user' | 'contact';
      firstMessageContactId?: string;
    }) {
      const {
        userId,
        contactId,
        contactName,
        contactCompany,
        opportunityId,
        challengeId,
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

      // Use provided opportunityId, or find/create an opportunity for this contact
      let opportunity: { id: string } | null = null;

      if (opportunityId) {
        // Verify the opportunity exists and belongs to the user
        const existingOpportunity = await prisma.opportunity.findFirst({
          where: {
            id: opportunityId,
            userId,
          },
        });
        if (existingOpportunity) {
          opportunity = existingOpportunity;
        }
      }

      // If no opportunity was provided or found, find or create one for this contact
      if (!opportunity) {
        opportunity = await prisma.opportunity.findFirst({
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
      }

      // Determine all contacts to add
      const allContactIds = new Set<string>();
      allContactIds.add(ensuredContact.id);
      
      if (params.contactIds) {
        // Verify all contact IDs belong to the user
        const additionalContacts = await prisma.contact.findMany({
          where: {
            id: { in: params.contactIds },
            userId,
          },
        });
        additionalContacts.forEach(c => allContactIds.add(c.id));
      }

      // Create conversation and link it to the opportunity
      const conversation = await prisma.conversation.create({
        data: {
          userId,
          contactId: ensuredContact.id, // Primary contact
          opportunityId: opportunity.id,
          challengeId: challengeId ?? null,
          channel,
          categoryId: categoryId ?? null,
          stageId: stageId ?? null,
          priority: (priority ?? null) as any,
          lastMessageAt: now,
          lastMessageSide: firstMessageSender,
          lastMessageSnippet: pastedText.slice(0, 2000),
        },
      });

      // Create ConversationContact entries for all contacts
      const conversationContacts = Array.from(allContactIds).map((cid) => ({
        conversationId: conversation.id,
        contactId: cid,
        addedAt: now,
      }));

      await prisma.conversationContact.createMany({
        data: conversationContacts,
      });

      await prisma.message.create({
        data: {
          conversationId: conversation.id,
          sender: firstMessageSender,
          body: pastedText,
          sentAt: now,
          source: 'manual_paste',
          status: 'pending', // Messages start as pending by default
          contactId: firstMessageSender === 'contact' && params.firstMessageContactId 
            ? params.firstMessageContactId 
            : null,
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
          contact: {
            select: {
              id: true,
              name: true,
              company: true,
            },
          },
          conversationContacts: {
            include: {
              contact: {
                select: {
                  id: true,
                  name: true,
                  company: true,
                },
              },
            },
            orderBy: [
              { addedAt: 'asc' },
            ],
          },
          category: true,
          stage: true,
          opportunity: true,
          messages: {
            include: {
              contact: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
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

      const autoFollowupsEnabled =
        (conversation as any).autoFollowupsEnabled !== undefined
          ? Boolean((conversation as any).autoFollowupsEnabled)
          : true;

      // Get first contact (for backwards compatibility with contactId/contactName)
      const firstContact = conversation.conversationContacts[0]?.contact 
        || conversation.contact;

      return {
        id: conversation.id,
        contactId: conversation.contactId,
        contactName: firstContact.name,
        contactCompany: firstContact.company ?? null,
        contacts: conversation.conversationContacts.map(cc => ({
          id: cc.contact.id,
          name: cc.contact.name,
          company: cc.contact.company ?? null,
        })),
        opportunityId: conversation.opportunityId ?? null,
        opportunityTitle: conversation.opportunity?.title ?? null,
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
        autoFollowupsEnabled,
        lastMessageAt: conversation.lastMessageAt,
        lastMessageSide: conversation.lastMessageSide as 'user' | 'contact' | null,
        messages: conversation.messages.map((msg) => ({
          id: msg.id,
          sender: msg.sender as 'user' | 'contact',
          body: msg.body,
          sentAt: msg.sentAt,
          source: msg.source,
          status: msg.status as 'pending' | 'confirmed',
          contactId: msg.contactId ?? null,
          contactName: msg.contact?.name ?? null,
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
        strategyIds: conversation.strategyIds || [],
        responseReceived: conversation.responseReceived,
        responseReceivedAt: conversation.responseReceivedAt,
        emailSentAt: conversation.emailSentAt,
        loomVideoUrl: conversation.loomVideoUrl,
        loomSent: conversation.loomSent,
        emailFollowUpDates: conversation.emailFollowUpDates || [],
        emailStatus: conversation.emailStatus as 'no_reply' | 'replied' | 'call_scheduled' | 'rejected' | 'in_process' | null,
        followUp1Date: conversation.followUp1Date,
        followUp2Date: conversation.followUp2Date,
        followUp3Date: conversation.followUp3Date,
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
        challengeId?: string | null;
        nextActionType?: string | null;
        nextActionDueAt?: Date | null;
        priority?: 'low' | 'medium' | 'high' | null;
        notes?: string | null;
        originalUrl?: string | null;
        autoFollowupsEnabled?: boolean;
        strategyIds?: string[];
        responseReceived?: boolean;
        responseReceivedAt?: Date | null;
        emailSentAt?: Date | null;
        loomVideoUrl?: string | null;
        loomSent?: boolean;
        emailFollowUpDates?: Date[];
        emailStatus?: 'no_reply' | 'replied' | 'call_scheduled' | 'rejected' | 'in_process' | null;
        followUp1Date?: Date | null;
        followUp2Date?: Date | null;
        followUp3Date?: Date | null;
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
      if (updates.challengeId !== undefined) {
        updateData.challengeId = updates.challengeId;
      }
      if (updates.autoFollowupsEnabled !== undefined) {
        updateData.autoFollowupsEnabled = updates.autoFollowupsEnabled;
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
      if (updates.strategyIds !== undefined) {
        updateData.strategyIds = updates.strategyIds;
      }
      if (updates.responseReceived !== undefined) {
        updateData.responseReceived = updates.responseReceived;
      }
      if (updates.responseReceivedAt !== undefined) {
        updateData.responseReceivedAt = updates.responseReceivedAt;
      }
      if (updates.emailSentAt !== undefined) {
        updateData.emailSentAt = updates.emailSentAt;
      }
      if (updates.loomVideoUrl !== undefined) {
        updateData.loomVideoUrl = updates.loomVideoUrl;
      }
      if (updates.loomSent !== undefined) {
        updateData.loomSent = updates.loomSent;
      }
      if (updates.emailFollowUpDates !== undefined) {
        updateData.emailFollowUpDates = updates.emailFollowUpDates;
      }
      if (updates.emailStatus !== undefined) {
        updateData.emailStatus = updates.emailStatus;
      }
      if (updates.followUp1Date !== undefined) {
        updateData.followUp1Date = updates.followUp1Date;
      }
      if (updates.followUp2Date !== undefined) {
        updateData.followUp2Date = updates.followUp2Date;
      }
      if (updates.followUp3Date !== undefined) {
        updateData.followUp3Date = updates.followUp3Date;
      }

      // If moving to a closed stage, set priority and next action to null
      if (isMovingToClosedStage) {
        updateData.priority = null;
        updateData.nextActionType = null;
        updateData.nextActionDueAt = null;
      }

      // If we're changing the stage and this conversation is (or will be) linked to an opportunity,
      // propagate the new stage to the opportunity and all its conversations.
      if (updates.stageId !== undefined) {
        const effectiveOpportunityId = currentConversation.opportunityId ?? opportunityIdToLink;

        if (effectiveOpportunityId) {
          // Update the opportunity's stage so the pipeline reflects the change
          await prisma.opportunity.updateMany({
            where: {
              id: effectiveOpportunityId,
              userId,
            },
            data: {
              stageId: updates.stageId,
            },
          });

          // Update all conversations linked to this opportunity to keep them in sync
          await prisma.conversation.updateMany({
            where: {
              userId,
              opportunityId: effectiveOpportunityId,
            },
            data: {
              stageId: updates.stageId,
            },
          });
        }
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
      contactId?: string;
    }) {
      const { userId, conversationId, body, sender, sentAt, contactId } = params;

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

      // Validate contactId if provided
      if (contactId && sender === 'contact') {
        // Verify the contact belongs to this conversation
        const conversationContact = await prisma.conversationContact.findFirst({
          where: {
            conversationId,
            contactId,
          },
        });
        if (!conversationContact) {
          throw new Error('Contact does not belong to this conversation');
        }
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
          contactId: contactId ?? null,
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

    /**
     * Add a contact to a conversation.
     */
    async addContactToConversation(params: {
      userId: string;
      conversationId: string;
      contactId: string;
    }) {
      const { userId, conversationId, contactId } = params;

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

      // Verify contact belongs to user
      const contact = await prisma.contact.findFirst({
        where: {
          id: contactId,
          userId,
        },
      });

      if (!contact) {
        return null;
      }

      // Check if contact is already in conversation
      const existing = await prisma.conversationContact.findFirst({
        where: {
          conversationId,
          contactId,
        },
      });

      if (existing) {
        return this.getConversationById({ userId, conversationId });
      }

      // Add contact to conversation
      await prisma.conversationContact.create({
        data: {
          conversationId,
          contactId,
        },
      });

      return this.getConversationById({ userId, conversationId });
    },

    /**
     * Remove a contact from a conversation.
     * Cannot remove if it's the only contact.
     */
    async removeContactFromConversation(params: {
      userId: string;
      conversationId: string;
      contactId: string;
    }) {
      const { userId, conversationId, contactId } = params;

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

      // Get all contacts in conversation
      const allContacts = await prisma.conversationContact.findMany({
        where: {
          conversationId,
        },
      });

      if (allContacts.length <= 1) {
        throw new Error('Cannot remove the only contact from a conversation');
      }

      const contactToRemove = allContacts.find(cc => cc.contactId === contactId);
      if (!contactToRemove) {
        return this.getConversationById({ userId, conversationId });
      }

      // If removing the contact that conversation.contactId points to, update it to another contact
      if (conversation.contactId === contactId) {
        const otherContact = allContacts.find(cc => cc.contactId !== contactId);
        if (otherContact) {
          await prisma.conversation.update({
            where: { id: conversationId },
            data: { contactId: otherContact.contactId },
          });
        }
      }

      // Remove contact
      await prisma.conversationContact.delete({
        where: {
          conversationId_contactId: {
            conversationId,
            contactId,
          },
        },
      });

      return this.getConversationById({ userId, conversationId });
    },

  };
}


