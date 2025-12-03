import { useCallback } from 'react';
import type { ConversationDetail } from '../../../services/conversations.service';
import type { useUpdateMessage } from '../../../services/conversations.mutations';
import { useEditMessageDialog } from './use-edit-message-dialog.state';

/**
 * UI state hook for edit message dialog actions.
 * Component-level hook for orchestrating edit message operations (no I/O, uses mutations).
 */
export function useEditMessageActions(
  conversation: ConversationDetail | null,
  updateMessageMutation: ReturnType<typeof useUpdateMessage>,
) {
  const handleSubmit = useCallback(
    async (values: { body: string; sentAt: string }, messageId: string) => {
      if (!conversation) return;
      await updateMessageMutation.mutateAsync({
        conversationId: conversation.id,
        messageId,
        payload: {
          body: values.body,
          sentAt: values.sentAt,
        },
      });
    },
    [conversation, updateMessageMutation],
  );

  const editMessageDialog = useEditMessageDialog(handleSubmit);

  const handleEditMessage = useCallback(
    (messageId: string) => {
      if (!conversation) return;
      const message = conversation.messages.find((m) => m.id === messageId);
      if (message) {
        editMessageDialog.open(messageId, message.body, message.sentAt);
      }
    },
    [conversation, editMessageDialog],
  );

  return {
    editMessageDialog,
    handleEditMessage,
  };
}

