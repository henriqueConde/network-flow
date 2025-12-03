'use client';

import { useRouter } from 'next/navigation';
import { OpportunitiesInboxView } from './opportunities-inbox.view';
import { useOpportunitiesList } from '../../services/opportunities.queries';
import { useDeleteOpportunity } from '../../services/opportunities.mutations';
import { OPPORTUNITIES_INBOX_CONFIG } from './opportunities-inbox.config';
import { useOpportunitiesFilters } from './hooks/use-opportunities-filters.state';
import { useCategories } from '@/features/categories';
import { useStages } from '@/features/stages';
import { useState, useCallback } from 'react';

export function OpportunitiesInboxContainer() {
  const router = useRouter();

  // UI state hooks
  const {
    search,
    categoryId,
    stageId,
    page,
    pageSize,
    sortBy,
    sortDir,
    handleSearchChange,
    handleCategoryChange,
    handleStageChange,
    handlePageChange,
    handleSortChange,
  } = useOpportunitiesFilters();

  const { data: categories = [] } = useCategories();
  const { data: stages = [] } = useStages();

  const deleteMutation = useDeleteOpportunity();

  // Delete dialog state
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    opportunityId: string | null;
    opportunityTitle: string | null;
  }>({
    isOpen: false,
    opportunityId: null,
    opportunityTitle: null,
  });

  const handleOpenDelete = useCallback((opportunityId: string, opportunityTitle: string | null) => {
    setDeleteDialog({
      isOpen: true,
      opportunityId,
      opportunityTitle,
    });
  }, []);

  const handleCloseDelete = useCallback(() => {
    if (deleteMutation.isPending) return;
    setDeleteDialog({ isOpen: false, opportunityId: null, opportunityTitle: null });
  }, [deleteMutation.isPending]);

  const handleConfirmDelete = useCallback(async () => {
    if (deleteDialog.opportunityId) {
      await deleteMutation.mutateAsync(deleteDialog.opportunityId);
      handleCloseDelete();
    }
  }, [deleteDialog.opportunityId, deleteMutation, handleCloseDelete]);

  // Data fetching
  const { data, isLoading, error } = useOpportunitiesList({
    search: search || undefined,
    categoryId: categoryId || undefined,
    stageId: stageId || undefined,
    page,
    pageSize,
    sortBy,
    sortDir,
  });

  const handleRowClick = (opportunityId: string) => {
    router.push(`/opportunities/${opportunityId}`);
  };

  return (
    <OpportunitiesInboxView
      opportunities={data?.items || []}
      total={data?.total || 0}
      totalPages={data?.totalPages || 0}
      isLoading={isLoading}
      error={error ? 'Failed to load opportunities. Please try again.' : null}
      search={search}
      page={page}
      sortBy={sortBy}
      sortDir={sortDir}
      categoryId={categoryId}
      stageId={stageId}
      availableCategories={categories}
      availableStages={stages}
      config={OPPORTUNITIES_INBOX_CONFIG}
      onSearchChange={handleSearchChange}
      onCategoryChange={handleCategoryChange}
      onStageChange={handleStageChange}
      onPageChange={handlePageChange}
      onSortChange={handleSortChange}
      onRowClick={handleRowClick}
      onOpenDelete={handleOpenDelete}
      isDeleteDialogOpen={deleteDialog.isOpen}
      deleteOpportunityTitle={deleteDialog.opportunityTitle}
      onCloseDeleteDialog={handleCloseDelete}
      onConfirmDelete={handleConfirmDelete}
      isDeleting={deleteMutation.isPending}
    />
  );
}

