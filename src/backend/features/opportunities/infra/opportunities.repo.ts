import { prisma } from '@/backend/core/db/prisma';

/**
 * Repository for Opportunities data access.
 * Handles all database queries for opportunities (processes).
 */
export function makeOpportunitiesRepo() {
  return {
    /**
     * Get a single opportunity by ID with all related conversations.
     */
    async getOpportunityById(params: { userId: string; opportunityId: string }) {
      const { userId, opportunityId } = params;

      const opportunity = await prisma.opportunity.findFirst({
        where: {
          id: opportunityId,
          userId,
        },
        include: {
          contact: true,
          category: true,
          stage: true,
          conversations: {
            include: {
              stage: true,
              messages: {
                orderBy: {
                  sentAt: 'asc',
                },
                // Get all messages for full conversation detail
              },
              linkedInEmailEvents: {
                orderBy: {
                  emailReceivedAt: 'desc',
                },
                take: 1,
              },
            },
            orderBy: {
              updatedAt: 'desc',
            },
          },
        },
      });

      if (!opportunity) {
        return null;
      }

      // Fetch ALL conversations for this opportunity
      // Include conversations that are:
      // 1. Explicitly linked to this opportunity via opportunityId, OR
      // 2. Associated with the same contact (for backwards compatibility)
      const allContactConversations = await prisma.conversation.findMany({
        where: {
          userId,
          OR: [
            { opportunityId: opportunity.id },
            { contactId: opportunity.contactId },
          ],
        },
        include: {
          contact: true,
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
        orderBy: {
          updatedAt: 'desc',
        },
      });

      // Create a map of all conversations by ID
      // We use the conversations from the query above which includes all conversations for the opportunity
      const allConversationsMap = new Map<string, typeof allContactConversations[0]>();
      
      // Collect unique contact IDs
      const contactIds = new Set<string>();
      for (const conv of allContactConversations) {
        allConversationsMap.set(conv.id, conv);
        contactIds.add(conv.contactId);
      }
      
      // Fetch contacts - always fetch them manually to ensure they're available
      const contactsMap = new Map<string, { name: string; company: string | null }>();
      if (contactIds.size > 0) {
        try {
          const contacts = await prisma.contact.findMany({
            where: {
              id: { in: Array.from(contactIds) },
              userId,
            },
            select: {
              id: true,
              name: true,
              company: true,
            },
          });
          
          for (const contact of contacts) {
            contactsMap.set(contact.id, {
              name: contact.name,
              company: contact.company ?? null,
            });
          }
          
          // Log if we're missing any contacts
          const missingContactIds = Array.from(contactIds).filter(id => !contactsMap.has(id));
          if (missingContactIds.length > 0) {
            console.error(`Missing contacts for IDs: ${missingContactIds.join(', ')}`);
          }
        } catch (error) {
          console.error('Error fetching contacts:', error);
          throw error;
        }
      }

      return {
        id: opportunity.id,
        contactId: opportunity.contactId,
        contactName: opportunity.contact.name,
        contactCompany: opportunity.contact.company ?? null,
        contactHeadlineOrRole: opportunity.contact.headlineOrRole ?? null,
        title: opportunity.title ?? null,
        categoryId: opportunity.categoryId ?? null,
        categoryName: opportunity.category?.name ?? null,
        stageId: opportunity.stageId ?? null,
        stageName: opportunity.stage?.name ?? null,
        nextActionType: opportunity.nextActionType ?? null,
        nextActionDueAt: opportunity.nextActionDueAt,
        priority: opportunity.priority as 'low' | 'medium' | 'high' | null,
        summary: opportunity.summary ?? null,
        notes: opportunity.notes ?? null,
        createdAt: opportunity.createdAt,
        updatedAt: opportunity.updatedAt,
        // Include all conversations for this opportunity (explicitly linked or same contact)
        conversations: Array.from(allConversationsMap.values()).map((conv) => {
          // Get contact info from the manually fetched map (more reliable than Prisma include)
          const contactInfo = contactsMap.get(conv.contactId);
          if (!contactInfo) {
            console.error(`Conversation ${conv.id} has no contact info. ContactId: ${conv.contactId}. Available contact IDs:`, Array.from(contactsMap.keys()));
            throw new Error(`Conversation ${conv.id} has no contact info. ContactId: ${conv.contactId}. Available contacts: ${Array.from(contactsMap.keys()).join(', ')}`);
          }
          
          return {
            id: conv.id,
            contactName: contactInfo.name,
            contactCompany: contactInfo.company,
            channel: conv.channel,
          stageId: conv.stageId ?? null,
          stageName: conv.stage?.name ?? null,
          lastMessageAt: conv.lastMessageAt,
          lastMessageSide: conv.lastMessageSide as 'user' | 'contact' | null,
          lastMessageSnippet: conv.lastMessageSnippet ?? null,
          isOutOfSync: conv.isOutOfSync,
          originalUrl: conv.originalUrl ?? null,
          messages: conv.messages.map((msg) => ({
            id: msg.id,
            sender: msg.sender as 'user' | 'contact',
            body: msg.body,
            sentAt: msg.sentAt,
            source: msg.source,
            status: msg.status as 'pending' | 'confirmed',
          })),
          latestEmailEvent:
            conv.linkedInEmailEvents.length > 0
              ? {
                id: conv.linkedInEmailEvents[0].id,
                senderName: conv.linkedInEmailEvents[0].senderName,
                snippet: conv.linkedInEmailEvents[0].snippet ?? null,
                emailReceivedAt: conv.linkedInEmailEvents[0].emailReceivedAt,
              }
              : null,
          };
        }),
      };
    },

    /**
     * List opportunities for a user with optional filters.
     */
    async listOpportunities(params: {
      userId: string;
      search?: string;
      categoryId?: string;
      stageId?: string;
      page: number;
      pageSize: number;
      sortBy: 'updatedAt' | 'nextActionDueAt' | 'priority';
      sortDir: 'asc' | 'desc';
    }) {
      const {
        userId,
        search,
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
          {
            title: {
              contains: search,
              mode: 'insensitive',
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

      const skip = (page - 1) * pageSize;
      const orderBy: any = {};
      orderBy[sortBy] = sortDir;

      const [opportunities, total] = await Promise.all([
        prisma.opportunity.findMany({
          where,
          include: {
            contact: true,
            category: true,
            stage: true,
            conversations: {
              orderBy: {
                lastMessageAt: 'desc',
              },
              take: 1, // Get most recent conversation for snippet
            },
          },
          skip,
          take: pageSize,
          orderBy,
        }),
        prisma.opportunity.count({ where }),
      ]);

      return {
        items: opportunities.map((opp) => ({
          id: opp.id,
          contactName: opp.contact.name,
          contactCompany: opp.contact.company ?? null,
          title: opp.title ?? null,
          categoryName: opp.category?.name ?? null,
          stageName: opp.stage?.name ?? null,
          nextActionType: opp.nextActionType ?? null,
          nextActionDueAt: opp.nextActionDueAt,
          priority: opp.priority as 'low' | 'medium' | 'high' | null,
          updatedAt: opp.updatedAt,
          lastMessageAt: opp.conversations[0]?.lastMessageAt ?? null,
          lastMessageSnippet: opp.conversations[0]?.lastMessageSnippet ?? null,
        })),
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      };
    },

    /**
     * Create a new opportunity.
     */
    async createOpportunity(params: {
      userId: string;
      contactId: string;
      title?: string;
      categoryId?: string;
      stageId?: string;
      nextActionType?: string;
      nextActionDueAt?: Date;
      priority?: 'low' | 'medium' | 'high' | null;
      notes?: string;
    }) {
      const {
        userId,
        contactId,
        title,
        categoryId,
        stageId,
        nextActionType,
        nextActionDueAt,
        priority,
        notes,
      } = params;

      return await prisma.opportunity.create({
        data: {
          userId,
          contactId,
          title: title ?? null,
          categoryId: categoryId ?? null,
          stageId: stageId ?? null,
          nextActionType: nextActionType ?? null,
          nextActionDueAt: nextActionDueAt ?? null,
          priority: priority ?? null,
          notes: notes ?? null,
        },
      });
    },

    /**
     * Update an opportunity's metadata.
     */
    async updateOpportunity(params: {
      userId: string;
      opportunityId: string;
      title?: string;
      categoryId?: string | null;
      stageId?: string | null;
      nextActionType?: string | null;
      nextActionDueAt?: Date | null;
      priority?: 'low' | 'medium' | 'high' | null;
      summary?: string | null;
      notes?: string | null;
    }) {
      const {
        userId,
        opportunityId,
        title,
        categoryId,
        stageId,
        nextActionType,
        nextActionDueAt,
        priority,
        summary,
        notes,
      } = params;

      // Verify the opportunity belongs to the user
      const existing = await prisma.opportunity.findFirst({
        where: {
          id: opportunityId,
          userId,
        },
      });

      if (!existing) {
        return null;
      }

      // Build update data
      const updateData: any = {};
      if (title !== undefined) updateData.title = title;
      if (categoryId !== undefined) updateData.categoryId = categoryId;
      if (stageId !== undefined) updateData.stageId = stageId;
      if (nextActionType !== undefined) updateData.nextActionType = nextActionType;
      if (nextActionDueAt !== undefined) updateData.nextActionDueAt = nextActionDueAt;
      if (priority !== undefined) updateData.priority = priority;
      if (summary !== undefined) updateData.summary = summary;
      if (notes !== undefined) updateData.notes = notes;

      return await prisma.opportunity.update({
        where: {
          id: opportunityId,
        },
        data: updateData,
      });
    },

    /**
     * Move an opportunity to a different stage.
     * Also updates all linked conversations to keep stages in sync.
     */
    async moveOpportunityToStage(params: {
      userId: string;
      opportunityId: string;
      stageId: string | null;
    }) {
      const { userId, opportunityId, stageId } = params;

      // Verify the opportunity belongs to the user
      const opportunity = await prisma.opportunity.findFirst({
        where: {
          id: opportunityId,
          userId,
        },
      });

      if (!opportunity) {
        return null;
      }

      // If stageId is provided, verify it belongs to the user and check if it's a closed stage
      let isClosedStage = false;
      if (stageId) {
        const stage = await prisma.stage.findFirst({
          where: {
            id: stageId,
            userId,
          },
        });

        if (!stage) {
          return null;
        }

        // Check if the stage name starts with "Closed"
        isClosedStage = stage.name.toLowerCase().startsWith('closed');
      }

      // Prepare update data
      const updateData: any = {
        stageId,
      };

      // If moving to a closed stage, set priority and next action to null
      if (isClosedStage) {
        updateData.priority = null;
        updateData.nextActionType = null;
        updateData.nextActionDueAt = null;
      }

      // Update the opportunity
      await prisma.opportunity.update({
        where: {
          id: opportunityId,
        },
        data: updateData,
      });

      // Keep all conversations linked to this opportunity in sync with the opportunity stage
      await prisma.conversation.updateMany({
        where: {
          opportunityId,
          userId,
        },
        data: {
          stageId,
        },
      });

      return await prisma.opportunity.findUnique({
        where: {
          id: opportunityId,
        },
      });
    },

    /**
     * Delete an opportunity and all associated conversations.
     */
    async deleteOpportunity(params: { userId: string; opportunityId: string }) {
      const { userId, opportunityId } = params;

      // Verify the opportunity belongs to the user
      const opportunity = await prisma.opportunity.findFirst({
        where: {
          id: opportunityId,
          userId,
        },
      });

      if (!opportunity) {
        return false;
      }

      // Get all conversations linked to this opportunity
      const conversations = await prisma.conversation.findMany({
        where: {
          opportunityId,
          userId,
        },
        select: {
          id: true,
        },
      });

      // Delete all conversations associated with this opportunity
      // This will cascade delete all messages due to the onDelete: Cascade relationship
      if (conversations.length > 0) {
        await prisma.conversation.deleteMany({
          where: {
            id: {
              in: conversations.map((c) => c.id),
            },
          },
        });
      }

      // Delete the opportunity
      await prisma.opportunity.delete({
        where: {
          id: opportunityId,
        },
      });

      return true;
    },
  };
}

