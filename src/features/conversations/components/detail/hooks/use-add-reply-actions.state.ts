import type { ConversationDetail } from '../../../services/conversations.service';
import type { useAddMessage } from '../../../services/conversations.mutations';
import { useAddReplyDialog } from './use-add-reply-dialog.state';

/**
 * UI state hook for add reply dialog actions.
 * Component-level hook for orchestrating add reply operations (no I/O, uses mutations).
 */
export function useAddReplyActions(
  conversation: ConversationDetail | null,
  addMessageMutation: ReturnType<typeof useAddMessage>,
) {
  const addReplyDialog = useAddReplyDialog(async (values) => {
    if (!conversation) return;
    await addMessageMutation.mutateAsync({
      conversationId: conversation.id,
      payload: {
        body: values.body,
        sender: values.sender,
        sentAt: values.sentAt,
      },
    });
  });

  const handleUseAiSuggestion = (suggestion: string) => {
    addReplyDialog.changeField('body', suggestion);
  };

  return {
    addReplyDialog,
    handleUseAiSuggestion,
  };
}

