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
  const handleSaveMetadata = async () => {
    if (!conversation) return;

    const payload = edit.getUpdatePayload();
    try {
      await updateMutation.mutateAsync({
        id: conversation.id,
        payload,
      });
      edit.setIsEditingMetadata(false);
    } catch (err) {
      // Error handling is done by React Query
      console.error('Failed to update conversation:', err);
    }
  };

  const handleSaveNotes = async () => {
    if (!conversation) return;

    const payload = edit.getUpdatePayload();
    try {
      await updateMutation.mutateAsync({
        id: conversation.id,
        payload,
      });
      edit.setIsEditingNotes(false);
    } catch (err) {
      // Error handling is done by React Query
      console.error('Failed to update conversation:', err);
    }
  };

  const handleCancelMetadata = () => {
    edit.cancelEditingMetadata();
  };

  const handleCancelNotes = () => {
    edit.cancelEditingNotes();
  };

  const handleFieldChange = (field: keyof typeof edit.values, value: string | null) => {
    // Determine which section this field belongs to
    const metadataFields: (keyof typeof edit.values)[] = [
      'categoryId',
      'stageId',
      'nextActionType',
      'nextActionDueAt',
      'priority',
      'originalUrl',
    ];
    const notesFields: (keyof typeof edit.values)[] = ['notes'];

    if (metadataFields.includes(field)) {
      if (!edit.isEditingMetadata) {
        edit.startEditingMetadata();
      }
    } else if (notesFields.includes(field)) {
      if (!edit.isEditingNotes) {
        edit.startEditingNotes();
      }
    }

    edit.changeField(field, value);
  };

  return {
    handleSaveMetadata,
    handleSaveNotes,
    handleCancelMetadata,
    handleCancelNotes,
    handleFieldChange,
  };
}

