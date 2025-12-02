import { useMutation, useQueryClient } from '@tanstack/react-query';
import { moveOpportunity } from './pipeline.service';
import { pipelineKeys } from './pipeline.keys';
import { conversationsKeys } from '@/features/conversations/services/conversations.keys';
import type { PipelineBoard } from './pipeline.service';

/**
 * Mutation hook for moving an opportunity to a different stage.
 * Uses optimistic updates for instant UI feedback.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useMoveOpportunity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ conversationId, stageId }: { conversationId: string; stageId: string }) =>
      moveOpportunity(conversationId, stageId),
    onMutate: async ({ conversationId, stageId }) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: pipelineKeys.board() });

      // Snapshot the previous value
      const previousBoard = queryClient.getQueryData<PipelineBoard>(pipelineKeys.board());

      // Optimistically update the board
      if (previousBoard) {
        // Find the opportunity being moved and its current stage
        let opportunityToMove: typeof previousBoard.stages[0]['opportunities'][0] | null = null;
        let sourceStageId: string | null = null;

        for (const stage of previousBoard.stages) {
          const opp = stage.opportunities.find((o) => o.id === conversationId);
          if (opp) {
            opportunityToMove = opp;
            sourceStageId = stage.id;
            break;
          }
        }

        if (opportunityToMove && sourceStageId) {
          const targetStageId = stageId === '__unassigned__' ? '__unassigned__' : stageId;

          // Don't do anything if moving to the same stage
          if (sourceStageId === targetStageId) {
            return { previousBoard };
          }

          // Create updated stages
          const updatedStages = previousBoard.stages.map((stage) => {
            // Remove from source stage
            if (stage.id === sourceStageId) {
              return {
                ...stage,
                opportunities: stage.opportunities.filter((opp) => opp.id !== conversationId),
              };
            }
            // Add to target stage
            if (stage.id === targetStageId) {
              return {
                ...stage,
                opportunities: [...stage.opportunities, opportunityToMove!],
              };
            }
            return stage;
          });

          // If target stage doesn't exist (unassigned), create it
          const targetStageExists = updatedStages.some((s) => s.id === targetStageId);
          if (!targetStageExists && targetStageId === '__unassigned__') {
            updatedStages.unshift({
              id: '__unassigned__',
              name: 'Unassigned',
              description: 'Conversations without a stage',
              order: -1,
              opportunities: [opportunityToMove],
            });
          }

          // Remove empty unassigned stage if it exists and is now empty
          const finalStages = updatedStages.filter((stage) => {
            if (stage.id === '__unassigned__' && stage.opportunities.length === 0) {
              return false;
            }
            return true;
          });

          const updatedBoard: PipelineBoard = {
            stages: finalStages,
          };

          // Update the query cache optimistically
          queryClient.setQueryData<PipelineBoard>(pipelineKeys.board(), updatedBoard);
        }
      }

      // Return context with snapshot for rollback
      return { previousBoard };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousBoard) {
        queryClient.setQueryData(pipelineKeys.board(), context.previousBoard);
      }
    },
    onSettled: (_, __, variables) => {
      // Always refetch after error or success to ensure consistency
      queryClient.invalidateQueries({ queryKey: pipelineKeys.board() });
      queryClient.invalidateQueries({ queryKey: conversationsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: conversationsKeys.detail(variables.conversationId) });
    },
  });
}

