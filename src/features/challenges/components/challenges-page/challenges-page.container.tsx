'use client';

import { useRouter } from 'next/navigation';
import { ChallengesPageView } from './challenges-page.view';
import { useChallengesList } from '../../services/challenges.queries';
import { useCreateChallenge, useUpdateChallenge, useDeleteChallenge } from '../../services/challenges.mutations';
import { CHALLENGES_PAGE_CONFIG } from './challenges-page.config';
import { useChallengesFilters } from './hooks/use-challenges-filters.state';
import { useChallengeDialog } from './hooks/use-challenge-dialog.state';
import { useDeleteChallengeDialog } from './hooks/use-delete-challenge-dialog.state';
import type { ChallengeListItem } from '../../services/challenges.service';

export function ChallengesPageContainer() {
  const router = useRouter();

  const {
    search,
    active,
    page,
    pageSize,
    sortBy,
    sortDir,
    handleSearchChange,
    handleActiveChange,
    handlePageChange,
    handleSortChange,
  } = useChallengesFilters();

  const createMutation = useCreateChallenge();
  const updateMutation = useUpdateChallenge();
  const deleteMutation = useDeleteChallenge();

  const challengeDialog = useChallengeDialog(async (values, editingChallenge) => {
    if (editingChallenge && editingChallenge.id) {
      await updateMutation.mutateAsync({
        id: editingChallenge.id,
        payload: {
          name: values.name,
          startDate: values.startDate,
          endDate: values.endDate,
          goal: values.goal,
          outreachesCount: values.outreachesCount,
          acceptsCount: values.acceptsCount,
          repliesCount: values.repliesCount,
          callsCount: values.callsCount,
          interviewsCount: values.interviewsCount,
          notes: values.notes || undefined,
        },
      });
    } else {
      await createMutation.mutateAsync({
        name: values.name,
        startDate: values.startDate,
        endDate: values.endDate,
        goal: values.goal,
        outreachesCount: values.outreachesCount,
        acceptsCount: values.acceptsCount,
        repliesCount: values.repliesCount,
        callsCount: values.callsCount,
        interviewsCount: values.interviewsCount,
        notes: values.notes || undefined,
      });
    }
    challengeDialog.close();
  });

  const deleteDialog = useDeleteChallengeDialog();

  const handleConfirmDelete = async () => {
    if (deleteDialog.challengeId) {
      await deleteMutation.mutateAsync(deleteDialog.challengeId);
      deleteDialog.close();
    }
  };

  const {
    data,
    isLoading,
    error,
  } = useChallengesList({
    search: search || undefined,
    active: active ?? undefined,
    page,
    pageSize,
    sortBy,
    sortDir,
  });

  const handleRowClick = (challengeId: string) => {
    router.push(`/challenges/${challengeId}`);
  };

  const handleOpenCreate = () => {
    challengeDialog.open();
  };

  const handleOpenEdit = (challenge: ChallengeListItem) => {
    challengeDialog.open(challenge);
  };

  const handleOpenDelete = (challenge: ChallengeListItem) => {
    deleteDialog.open(challenge.id, challenge.name);
  };

  return (
    <ChallengesPageView
      challenges={data?.challenges || []}
      total={data?.total || 0}
      page={data?.page || 1}
      pageSize={data?.pageSize || pageSize}
      totalPages={data?.totalPages || 0}
      isLoading={isLoading}
      error={error ? 'Failed to load challenges. Please try again.' : null}
      search={search}
      active={active}
      sortBy={sortBy}
      sortDir={sortDir}
      config={CHALLENGES_PAGE_CONFIG}
      onSearchChange={handleSearchChange}
      onActiveChange={handleActiveChange}
      onPageChange={handlePageChange}
      onSortChange={handleSortChange}
      onRowClick={handleRowClick}
      isDialogOpen={challengeDialog.isOpen}
      isEditing={!!challengeDialog.editingChallenge}
      dialogValues={challengeDialog.values}
      dialogErrors={challengeDialog.errors}
      onOpenCreate={handleOpenCreate}
      onOpenEdit={handleOpenEdit}
      onCloseDialog={challengeDialog.close}
      onChangeDialogField={challengeDialog.changeField}
      onSubmitDialog={challengeDialog.submit}
      isSubmitting={createMutation.isPending || updateMutation.isPending}
      isDeleteDialogOpen={deleteDialog.isOpen}
      deleteChallengeName={deleteDialog.challengeName}
      onOpenDelete={handleOpenDelete}
      onCloseDeleteDialog={deleteDialog.close}
      onConfirmDelete={handleConfirmDelete}
      isDeleting={deleteMutation.isPending}
    />
  );
}

