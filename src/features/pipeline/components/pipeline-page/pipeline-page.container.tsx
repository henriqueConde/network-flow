'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePipelineBoard } from '../../services/pipeline.queries';
import { useMoveOpportunity } from '../../services/pipeline.mutations';
import type { PipelineOpportunity } from '../../services/pipeline.service';
import { useStages } from '@/features/stages';
import { useCategories } from '@/features/categories';
import { useDebounce } from '@/shared/hooks';
import { PipelinePageView } from './pipeline-page.view';
import { PIPELINE_PAGE_CONFIG } from './pipeline-page.config';

export function PipelinePageContainer() {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [stageId, setStageId] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');

  // Debounce search to avoid excessive API calls
  const debouncedSearch = useDebounce(search, 300);

  const { data: board, isLoading, error } = usePipelineBoard({
    categoryId: categoryId || undefined,
    stageId: stageId || undefined,
    search: debouncedSearch.trim() || undefined,
  });
  const { data: stages = [] } = useStages();
  const { data: categories = [] } = useCategories();
  const moveOpportunityMutation = useMoveOpportunity();

  const handleOpportunityClick = (opportunityId: string) => {
    router.push(`/opportunities/${opportunityId}`);
  };

  const handleMoveOpportunity = (opportunityId: string, stageId: string) => {
    moveOpportunityMutation.mutate(
      { opportunityId, stageId },
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

  // Helper function to get menu items for moving an opportunity (logic in container)
  const getMoveMenuItems = (opportunityId: string): Array<{ id: string; label: string }> => {
    if (!board) return [];

    // Find the current stage of this opportunity
    const currentStage = board.stages.find((s) =>
      s.opportunities.some((o) => o.id === opportunityId),
    );

    // Filter out the current stage
    const otherStages = stages.filter((stage) => stage.id !== currentStage?.id);

    // If current stage is not unassigned, add an "Unassigned" option
    const showUnassigned = currentStage?.id !== '__unassigned__';

    const menuItems: Array<{ id: string; label: string }> = [];

    if (showUnassigned) {
      menuItems.push({
        id: '__unassigned__',
        label: PIPELINE_PAGE_CONFIG.copy.opportunity.unassigned,
      });
    }

    otherStages.forEach((stage) => {
      menuItems.push({
        id: stage.id,
        label: stage.name,
      });
    });

    return menuItems;
  };

  // Helper function to get current stage for an opportunity (logic in container)
  const getCurrentStageForOpportunity = (opportunityId: string): { id: string; name: string } | null => {
    if (!board) return null;
    const stage = board.stages.find((s) =>
      s.opportunities.some((opp) => opp.id === opportunityId),
    );
    return stage ? { id: stage.id, name: stage.name } : null;
  };

  // Helper function to get active opportunity for drag overlay (logic in container)
  const getActiveOpportunity = (activeId: string | null): PipelineOpportunity | null => {
    if (!board || !activeId) return null;
    return board.stages
      .flatMap((stage) => stage.opportunities)
      .find((opp) => opp.id === activeId) || null;
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
      availableCategories={categories}
      categoryId={categoryId}
      stageId={stageId}
      search={search}
      onCategoryChange={setCategoryId}
      onStageChange={setStageId}
      onSearchChange={setSearch}
      getMoveMenuItems={getMoveMenuItems}
      getCurrentStageForOpportunity={getCurrentStageForOpportunity}
      getActiveOpportunity={getActiveOpportunity}
    />
  );
}

