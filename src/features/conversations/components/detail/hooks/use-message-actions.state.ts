import type { ConversationDetail } from '../../../services/conversations.service';
import type { useToggleMessageStatus, useDeleteMessage } from '../../../services/conversations.mutations';

/**
 * UI state hook for message actions (toggle status, delete).
 * Component-level hook for orchestrating message operations (no I/O, uses mutations).
 */
export function useMessageActions(
  conversation: ConversationDetail | null,
  toggleMessageStatusMutation: ReturnType<typeof useToggleMessageStatus>,
  deleteMessageMutation: ReturnType<typeof useDeleteMessage>,
  deleteConfirmationMessage: string,
) {
  const handleToggleMessageStatus = async (messageId: string) => {
    if (!conversation) return;
    await toggleMessageStatusMutation.mutateAsync({
      conversationId: conversation.id,
      messageId,
    });
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (!conversation) return;
    // TODO: Replace with proper dialog component
    if (confirm(deleteConfirmationMessage)) {
      await deleteMessageMutation.mutateAsync({
        conversationId: conversation.id,
        messageId,
      });
    }
  };

  return {
    handleToggleMessageStatus,
    handleDeleteMessage,
  };
}

