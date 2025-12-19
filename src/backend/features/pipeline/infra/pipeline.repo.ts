import { prisma } from '@/backend/core/db/prisma';
import { moveOpportunityToStage } from '@/backend/features/opportunities';

/**
 * Repository for Pipeline page data access.
 * Handles queries for stages and opportunities grouped by stage.
 */
export function makePipelineRepo() {
  return {
    /**
     * Get all stages with their opportunities for the pipeline board.
     * Returns stages ordered by their `order` field, with opportunities.
     */
    async getPipelineBoard(userId: string, filters?: { categoryId?: string; stageId?: string; search?: string }) {
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

      // Add search filter - matches opportunity title, contact name, or company name
      if (filters?.search && filters.search.trim().length > 0) {
        const searchTerm = filters.search.trim();
        opportunityWhere.OR = [
          {
            title: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
          {
            contact: {
              name: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          },
          {
            contact: {
              company: {
                contains: searchTerm,
                mode: 'insensitive',
              },
            },
          },
        ];
      }

      // Fetch all opportunities with their related data
      const opportunities = await prisma.opportunity.findMany({
        where: opportunityWhere,
        include: {
          contact: true,
          category: true,
          stage: true,
          challenge: {
            select: {
              id: true,
              name: true,
            },
          },
          conversations: {
            orderBy: {
              lastMessageAt: 'desc',
            },
            include: {
              contact: true,
              stage: true,
            },
          },
        },
      });

      // Build a quick lookup for stage order (used to find the most advanced stage)
      const stageOrderById = new Map<string, number>(
        stages.map((stage) => [stage.id, stage.order]),
      );

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
              challengeId: string | null;
              challengeName: string | null;
              lastMessageAt: Date | null;
              nextActionType: string | null;
              nextActionDueAt: Date | null;
              priority: 'low' | 'medium' | 'high' | null;
              isOutOfSync: boolean;
              conversations: Array<{
                id: string;
                contactName: string;
                contactCompany: string | null;
                channel: string;
                stageName: string | null;
                lastMessageAt: Date | null;
                lastMessageSnippet: string | null;
                isOutOfSync: boolean;
              }>;
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
              challengeId: string | null;
              challengeName: string | null;
              lastMessageAt: Date | null;
              nextActionType: string | null;
          nextActionDueAt: Date | null;
          priority: 'low' | 'medium' | 'high' | null;
          isOutOfSync: boolean;
          conversations: Array<{
            id: string;
            contactName: string;
            contactCompany: string | null;
            channel: string;
            stageName: string | null;
            lastMessageAt: Date | null;
            lastMessageSnippet: string | null;
            isOutOfSync: boolean;
          }>;
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
          challengeId: opp.challenge?.id ?? null,
          challengeName: opp.challenge?.name ?? null,
          lastMessageAt: mostRecentConversation?.lastMessageAt ?? null,
          nextActionType: opp.nextActionType,
          nextActionDueAt: opp.nextActionDueAt,
          priority: opp.priority as 'low' | 'medium' | 'high' | null,
          isOutOfSync,
          conversations: opp.conversations.map((conv) => ({
            id: conv.id,
            contactName: conv.contact.name,
            contactCompany: conv.contact.company ?? null,
            channel: conv.channel,
            stageName: conv.stage?.name ?? null,
            lastMessageAt: conv.lastMessageAt ?? null,
            lastMessageSnippet: conv.lastMessageSnippet ?? null,
            isOutOfSync: conv.isOutOfSync,
          })),
        };

        // Decide which stage column this opportunity should live in.
        // Rule: use the most advanced stage across its conversations (by stage.order).
        // Fallback to the opportunity's own stageId, otherwise treat as unassigned.
        let derivedStageId: string | null = null;
        let bestOrder = -Infinity;

        for (const conv of opp.conversations) {
          if (!conv.stageId) continue;
          const order = stageOrderById.get(conv.stageId);
          if (order !== undefined && order > bestOrder) {
            bestOrder = order;
            derivedStageId = conv.stageId;
          }
        }

        const targetStageId = derivedStageId ?? opp.stageId;

        if (targetStageId && stageMap.has(targetStageId)) {
          const stage = stageMap.get(targetStageId)!;
          stage.opportunities.push(opportunity);
        } else {
          // Add to unassigned if no stage can be determined
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
      // Use the opportunities use-case to move the opportunity
      return await moveOpportunityToStage({
        userId: input.userId,
        opportunityId: input.opportunityId,
        stageId: input.stageId,
      });
    },
  };
}

