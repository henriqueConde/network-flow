import { useState } from 'react';
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
) {
  const [deleteMessageId, setDeleteMessageId] = useState<string | null>(null);

  const handleToggleMessageStatus = async (messageId: string) => {
    if (!conversation) return;
    await toggleMessageStatusMutation.mutateAsync({
      conversationId: conversation.id,
      messageId,
    });
  };

  const handleOpenDeleteDialog = (messageId: string) => {
    setDeleteMessageId(messageId);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteMessageId(null);
  };

  const handleConfirmDelete = async () => {
    if (!conversation || !deleteMessageId) return;
    await deleteMessageMutation.mutateAsync({
      conversationId: conversation.id,
      messageId: deleteMessageId,
    });
    setDeleteMessageId(null);
  };

  return {
    handleToggleMessageStatus,
    handleOpenDeleteDialog,
    deleteMessageId,
    handleCloseDeleteDialog,
    handleConfirmDelete,
    isDeleting: deleteMessageMutation.isPending,
  };
}

