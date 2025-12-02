import type { ConversationDetail } from '../../../services/conversations.service';
import type { useConversationEdit } from './use-conversation-edit.state';
import type { useUpdateConversation } from '../../../services/conversations.mutations';

/**
 * UI state hook for conversation edit actions.
 * Component-level hook for orchestrating edit operations (no I/O, uses mutations).
 */
export function useConversationEditActions(
  conversation: ConversationDetail | null,
  edit: ReturnType<typeof useConversationEdit>,
  updateMutation: ReturnType<typeof useUpdateConversation>,
) {
  const handleSave = async () => {
    if (!conversation) return;

    const payload = edit.getUpdatePayload();
    try {
      await updateMutation.mutateAsync({
        id: conversation.id,
        payload,
      });
      edit.setIsEditing(false);
    } catch (err) {
      // Error handling is done by React Query
      console.error('Failed to update conversation:', err);
    }
  };

  const handleCancel = () => {
    edit.cancelEditing();
  };

  const handleFieldChange = (field: keyof typeof edit.values, value: string | null) => {
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

