'use client';

import { useRouter } from 'next/navigation';
import { usePipelineBoard } from '../../services/pipeline.queries';
import { useMoveOpportunity } from '../../services/pipeline.mutations';
import { useStages } from '@/features/stages';
import { PipelinePageView } from './pipeline-page.view';
import { PIPELINE_PAGE_CONFIG } from './pipeline-page.config';

export function PipelinePageContainer() {
  const router = useRouter();
  const { data: board, isLoading, error } = usePipelineBoard();
  const { data: stages = [] } = useStages();
  const moveOpportunityMutation = useMoveOpportunity();

  const handleOpportunityClick = (opportunityId: string) => {
    router.push(`/conversations/${opportunityId}`);
  };

  const handleMoveOpportunity = (opportunityId: string, stageId: string) => {
    moveOpportunityMutation.mutate(
      { conversationId: opportunityId, stageId },
      {
        onError: (error: unknown) => {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          const errorDetails = error && typeof error === 'object' ? JSON.stringify(error, null, 2) : String(error);
          console.error('Failed to move opportunity:', errorMessage, errorDetails);
          // TODO: Show error toast/notification
        },
      },
    );
  };

  return (
    <PipelinePageView
      board={board ?? null}
      isLoading={isLoading}
      error={error}
      config={PIPELINE_PAGE_CONFIG}
      onOpportunityClick={handleOpportunityClick}
      onMoveOpportunity={handleMoveOpportunity}
      availableStages={stages}
    />
  );
}

