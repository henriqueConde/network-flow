'use client';

import { ChallengeDetailPageView } from './challenge-detail-page.view';
import { CHALLENGE_DETAIL_CONFIG } from './challenge-detail-page.config';
import { useChallengeDetail } from '../../services/challenges.queries';
import { useUpdateChallenge } from '../../services/challenges.mutations';
import { useChallengeEdit } from './hooks/use-challenge-edit.state';
import { useChallengeEditActions } from './hooks/use-challenge-edit-actions.state';
import { useChallengeDetailNavigation } from './hooks/use-challenge-navigation.state';

type ChallengeDetailPageContainerProps = {
  challengeId: string;
};

export function ChallengeDetailPageContainer({ challengeId }: ChallengeDetailPageContainerProps) {
  // Data fetching
  const { data: challenge, isLoading, error } = useChallengeDetail(challengeId);

  // Mutations
  const updateMutation = useUpdateChallenge();

  // UI state hooks
  const challengeOrNull = challenge ?? null;
  const edit = useChallengeEdit(challengeOrNull);
  const editActions = useChallengeEditActions(challengeOrNull, edit, updateMutation);

  // Navigation
  const { handleBack } = useChallengeDetailNavigation();

  return (
    <ChallengeDetailPageView
      challenge={challengeOrNull}
      isLoading={isLoading}
      error={error ? 'Failed to load challenge. Please try again.' : null}
      config={CHALLENGE_DETAIL_CONFIG}
      editValues={edit.values}
      editErrors={edit.errors}
      isEditing={edit.isEditing}
      isSaving={updateMutation.isPending}
      onBack={handleBack}
      onStartEdit={edit.startEditing}
      onChangeEditField={editActions.handleFieldChange}
      onSave={editActions.handleSave}
      onCancel={editActions.handleCancel}
    />
  );
}



