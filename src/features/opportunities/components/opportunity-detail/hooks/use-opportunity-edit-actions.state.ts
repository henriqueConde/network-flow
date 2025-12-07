import type { OpportunityDetail } from '../../../services/opportunities.service';
import type { useOpportunityEdit } from './use-opportunity-edit.state';
import type { useUpdateOpportunity } from '../../../services/opportunities.mutations';

/**
 * UI state hook for opportunity edit actions.
 * Component-level hook for orchestrating edit operations (no I/O, uses mutations).
 */
export function useOpportunityEditActions(
  opportunity: OpportunityDetail | null,
  edit: ReturnType<typeof useOpportunityEdit>,
  updateMutation: ReturnType<typeof useUpdateOpportunity>,
) {
  const handleSave = async () => {
    if (!opportunity) return;

    const payload = edit.getUpdatePayload();
    try {
      await updateMutation.mutateAsync({
        id: opportunity.id,
        payload,
      });
      edit.setIsEditing(false);
    } catch (err) {
      // Error handling is done by React Query
      console.error('Failed to update opportunity:', err);
    }
  };

  const handleCancel = () => {
    edit.cancelEditing();
  };

  const handleFieldChange = (
    field: keyof typeof edit.values,
    value: string | string[] | boolean | any | null,
  ) => {
    if (!edit.isEditing) {
      edit.startEditing();
    }
    edit.changeField(field, value);
  };

  return {
    handleSave,
    handleCancel,
    handleFieldChange,
  };
}

