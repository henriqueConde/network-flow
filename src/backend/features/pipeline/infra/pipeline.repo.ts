import { prisma } from '@/backend/core/db/prisma';

/**
 * Repository for Pipeline page data access.
 * Handles queries for stages and opportunities grouped by stage.
 */
export function makePipelineRepo() {
  return {
    /**
     * Get all stages with their opportunities for the pipeline board.
     * Returns stages ordered by their `order` field, with conversations as opportunities.
     */
    async getPipelineBoard(userId: string, filters?: { categoryId?: string; stageId?: string }) {
      // Fetch all stages for the user, ordered by their order field
      const stages = await prisma.stage.findMany({
        where: {
          userId,
        },
        orderBy: {
          order: 'asc',
        },
      });

      // Build where clause for conversations
      const conversationWhere: any = {
        userId,
      };

      if (filters?.categoryId) {
        conversationWhere.categoryId = filters.categoryId;
      }

      if (filters?.stageId) {
        conversationWhere.stageId = filters.stageId;
      }

      // Fetch all conversations with their related data
      const conversations = await prisma.conversation.findMany({
        where: conversationWhere,
        include: {
          contact: true,
          category: true,
          stage: true,
        },
      });

      // Group conversations by stage
      const stageMap = new Map(
        stages.map((stage) => [
          stage.id,
          {
            id: stage.id,
            name: stage.name,
            description: stage.description,
            order: stage.order,
            opportunities: [] as Array<{
              id: string;
              contactName: string;
              contactCompany: string | null;
              categoryName: string | null;
              lastMessageAt: Date | null;
              nextActionType: string | null;
              nextActionDueAt: Date | null;
              priority: 'low' | 'medium' | 'high' | null;
              isOutOfSync: boolean;
            }>,
          },
        ]),
      );

      // Add an "Unassigned" stage for conversations without a stage
      const unassignedStage = {
        id: '__unassigned__',
        name: 'Unassigned',
        description: 'Conversations without a stage',
        order: -1, // Show first
        opportunities: [] as Array<{
          id: string;
          contactName: string;
          contactCompany: string | null;
          categoryName: string | null;
          lastMessageAt: Date | null;
          nextActionType: string | null;
          nextActionDueAt: Date | null;
          priority: 'low' | 'medium' | 'high' | null;
          isOutOfSync: boolean;
        }>,
      };

      // Add conversations to their respective stages
      for (const conv of conversations) {
        const opportunity = {
          id: conv.id,
          contactName: conv.contact.name,
          contactCompany: conv.contact.company,
          categoryName: conv.category?.name ?? null,
          lastMessageAt: conv.lastMessageAt,
          nextActionType: conv.nextActionType,
          nextActionDueAt: conv.nextActionDueAt,
          priority: conv.priority as 'low' | 'medium' | 'high' | null,
          isOutOfSync: conv.isOutOfSync,
        };

        if (conv.stageId && stageMap.has(conv.stageId)) {
          const stage = stageMap.get(conv.stageId)!;
          stage.opportunities.push(opportunity);
        } else {
          // Add to unassigned if no stage
          unassignedStage.opportunities.push(opportunity);
        }
      }

      // Convert map to array, maintaining order
      const stagesWithOpportunities = Array.from(stageMap.values());

      // Add unassigned stage if it has opportunities
      if (unassignedStage.opportunities.length > 0) {
        stagesWithOpportunities.unshift(unassignedStage);
      }

      return {
        stages: stagesWithOpportunities,
      };
    },

    /**
     * Update a conversation's stage (move opportunity between columns).
     */
    async moveOpportunity(input: {
      userId: string;
      conversationId: string;
      stageId: string | null;
    }) {
      // Verify the conversation belongs to the user
      const conversation = await prisma.conversation.findFirst({
        where: {
          id: input.conversationId,
          userId: input.userId,
        },
      });

      if (!conversation) {
        return null;
      }

      // If stageId is provided, verify it belongs to the user and check if it's a closed stage
      let isClosedStage = false;
      if (input.stageId) {
        const stage = await prisma.stage.findFirst({
          where: {
            id: input.stageId,
            userId: input.userId,
          },
        });

        if (!stage) {
          return null;
        }

        // Check if the stage name starts with "Closed" (e.g., "Closed (positive)", "Closed (negative)")
        isClosedStage = stage.name.toLowerCase().startsWith('closed');
      }

      // Prepare update data
      const updateData: any = {
        stageId: input.stageId,
      };

      // If moving to a closed stage, set priority and next action to null
      if (isClosedStage) {
        updateData.priority = null;
        updateData.nextActionType = null;
        updateData.nextActionDueAt = null;
      }

      // Update the conversation's stage (and priority/nextAction if moving to closed)
      const updated = await prisma.conversation.update({
        where: {
          id: input.conversationId,
        },
        data: updateData,
      });

      return updated;
    },
  };
}

