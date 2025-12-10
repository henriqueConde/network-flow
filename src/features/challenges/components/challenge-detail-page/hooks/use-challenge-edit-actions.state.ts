import type { ChallengeDetail } from '../../../services/challenges.service';
import type { useChallengeEdit } from './use-challenge-edit.state';
import type { useUpdateChallenge } from '../../../services/challenges.mutations';

/**
 * UI state hook for challenge edit actions.
 * Component-level hook for orchestrating edit operations (no I/O, uses mutations).
 */
export function useChallengeEditActions(
  challenge: ChallengeDetail | null,
  edit: ReturnType<typeof useChallengeEdit>,
  updateMutation: ReturnType<typeof useUpdateChallenge>,
) {
  const handleSave = async () => {
    if (!challenge || !edit.validate()) {
      return;
    }

    const payload = edit.getUpdatePayload();

    try {
      await updateMutation.mutateAsync({
        id: challenge.id,
        payload,
      });
      edit.cancelEditing();
    } catch (err) {
      // Error handling is done by React Query
      console.error('Failed to update challenge:', err);
    }
  };

  const handleCancel = () => {
    edit.cancelEditing();
  };

  const handleFieldChange = (
    field: keyof typeof edit.values,
    value: string | number | null,
  ) => {
    edit.changeField(field, value);
  };

  return {
    handleSave,
    handleCancel,
    handleFieldChange,
  };
}

