import { prisma } from '@/backend/core/db/prisma';
import { makeOpportunitiesRepo } from '@/backend/features/opportunities/infra/opportunities.repo';

/**
 * Repository for Pipeline page data access.
 * Handles queries for stages and opportunities grouped by stage.
 */
export function makePipelineRepo() {
  const opportunitiesRepo = makeOpportunitiesRepo();

  return {
    /**
     * Get all stages with their opportunities for the pipeline board.
     * Returns stages ordered by their `order` field, with opportunities.
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

      // Build where clause for opportunities
      const opportunityWhere: any = {
        userId,
      };

      if (filters?.categoryId) {
        opportunityWhere.categoryId = filters.categoryId;
      }

      if (filters?.stageId) {
        opportunityWhere.stageId = filters.stageId;
      }

      // Fetch all opportunities with their related data
      const opportunities = await prisma.opportunity.findMany({
        where: opportunityWhere,
        include: {
          contact: true,
          category: true,
          stage: true,
          conversations: {
            orderBy: {
              lastMessageAt: 'desc',
            },
            take: 1, // Get most recent conversation for lastMessageAt
          },
        },
      });

      // Group opportunities by stage
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
              title: string | null;
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

      // Add an "Unassigned" stage for opportunities without a stage
      const unassignedStage = {
        id: '__unassigned__',
        name: 'Unassigned',
        description: 'Opportunities without a stage',
        order: -1, // Show first
        opportunities: [] as Array<{
          id: string;
          contactName: string;
          contactCompany: string | null;
          title: string | null;
          categoryName: string | null;
          lastMessageAt: Date | null;
          nextActionType: string | null;
          nextActionDueAt: Date | null;
          priority: 'low' | 'medium' | 'high' | null;
          isOutOfSync: boolean;
        }>,
      };

      // Add opportunities to their respective stages
      for (const opp of opportunities) {
        // Get the most recent conversation's lastMessageAt and isOutOfSync status
        const mostRecentConversation = opp.conversations[0];
        const isOutOfSync = mostRecentConversation?.isOutOfSync ?? false;

        const opportunity = {
          id: opp.id,
          contactName: opp.contact.name,
          contactCompany: opp.contact.company,
          title: opp.title,
          categoryName: opp.category?.name ?? null,
          lastMessageAt: mostRecentConversation?.lastMessageAt ?? null,
          nextActionType: opp.nextActionType,
          nextActionDueAt: opp.nextActionDueAt,
          priority: opp.priority as 'low' | 'medium' | 'high' | null,
          isOutOfSync,
        };

        if (opp.stageId && stageMap.has(opp.stageId)) {
          const stage = stageMap.get(opp.stageId)!;
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
     * Move an opportunity to a different stage (move between columns).
     */
    async moveOpportunity(input: {
      userId: string;
      opportunityId: string;
      stageId: string | null;
    }) {
      // Use the opportunities repo to move the opportunity
      return await opportunitiesRepo.moveOpportunityToStage({
        userId: input.userId,
        opportunityId: input.opportunityId,
        stageId: input.stageId,
      });
    },
  };
}

