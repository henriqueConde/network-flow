'use client';

import { ConversationDetailView } from './conversation-detail.view';
import { CONVERSATION_DETAIL_CONFIG } from './conversation-detail.config';
import { EDIT_MESSAGE_DIALOG_CONFIG } from './components/edit-message-dialog/edit-message-dialog.config';
import { useConversationDetail } from '../../services/conversations.queries';
import { useUpdateConversation, useAddMessage, useUpdateMessage, useDeleteMessage, useToggleMessageStatus } from '../../services/conversations.mutations';
import { useAnalyzeConversationMutation } from '../../services/conversation-ai.mutations';
import { useConversationEdit } from './hooks/use-conversation-edit.state';
import { useConversationDetailNavigation } from './hooks/use-conversation-detail-navigation.state';
import { useConversationEditActions } from './hooks/use-conversation-edit-actions.state';
import { useConversationAiAnalysis } from './hooks/use-conversation-ai-analysis.state';
import { useAddReplyActions } from './hooks/use-add-reply-actions.state';
import { useEditMessageActions } from './hooks/use-edit-message-actions.state';
import { useMessageActions } from './hooks/use-message-actions.state';
import { usePasteMessages } from './hooks/use-paste-messages.state';
import { useStages } from '@/features/stages';
import { useCategories } from '@/features/categories';

export function ConversationDetailContainer() {
  // Navigation
  const { conversationId, handleBack } = useConversationDetailNavigation();

  // Data fetching
  const { data: conversation, isLoading, error } = useConversationDetail(conversationId);
  const { data: stages = [] } = useStages();
  const { data: categories = [] } = useCategories();

  // Mutations
  const updateMutation = useUpdateConversation();
  const addMessageMutation = useAddMessage();
  const updateMessageMutation = useUpdateMessage();
  const deleteMessageMutation = useDeleteMessage();
  const toggleMessageStatusMutation = useToggleMessageStatus();
  const analyzeMutation = useAnalyzeConversationMutation();

  // UI state hooks
  const conversationOrNull = conversation ?? null;
  const edit = useConversationEdit(conversationOrNull);
  const editActions = useConversationEditActions(conversationOrNull, edit, updateMutation);
  const { messages, handleSendMessage, clearMessages, isLoading: isAiLoading, error: aiError } = useConversationAiAnalysis(conversationId, analyzeMutation);

  // Action hooks
  const { addReplyDialog, handleUseAiSuggestion } = useAddReplyActions(conversationOrNull, addMessageMutation);
  const { editMessageDialog, handleEditMessage } = useEditMessageActions(conversationOrNull, updateMessageMutation);
  const { handleToggleMessageStatus, handleDeleteMessage } = useMessageActions(
    conversationOrNull,
    toggleMessageStatusMutation,
    deleteMessageMutation,
    CONVERSATION_DETAIL_CONFIG.copy.messages.actions.deleteConfirmation,
  );
  const { handlePasteNewMessages } = usePasteMessages();

  return (
    <ConversationDetailView
      conversation={conversation ?? null}
      isLoading={isLoading}
      error={error ? 'Failed to load conversation. Please try again.' : null}
      config={CONVERSATION_DETAIL_CONFIG}
      editMessageDialogConfig={EDIT_MESSAGE_DIALOG_CONFIG}
      editValues={edit.values}
      editErrors={edit.errors}
      isEditing={edit.isEditing}
      isSaving={updateMutation.isPending}
      onBack={handleBack}
      onChangeEditField={editActions.handleFieldChange}
      onSave={editActions.handleSave}
      onCancel={editActions.handleCancel}
      onPasteNewMessages={handlePasteNewMessages}
      isAddReplyOpen={addReplyDialog.isOpen}
      addReplyValues={addReplyDialog.values}
      addReplyErrors={addReplyDialog.errors}
      isAddingReply={addMessageMutation.isPending}
      onOpenAddReply={addReplyDialog.open}
      onCloseAddReply={addReplyDialog.close}
      onChangeAddReplyField={addReplyDialog.changeField}
      onSubmitAddReply={addReplyDialog.submit}
      availableStages={stages}
      availableCategories={categories}
      aiMessages={messages}
      isAiLoading={isAiLoading}
      aiError={aiError}
      onSendAiMessage={handleSendMessage}
      onClearAiMessages={clearMessages}
      onUseAiSuggestion={handleUseAiSuggestion}
      onConfirmMessage={handleToggleMessageStatus}
      onEditMessage={handleEditMessage}
      onDeleteMessage={handleDeleteMessage}
      isEditMessageOpen={editMessageDialog.isOpen}
      editMessageValues={editMessageDialog.values}
      editMessageErrors={editMessageDialog.errors}
      isUpdatingMessage={updateMessageMutation.isPending}
      onCloseEditMessage={editMessageDialog.close}
      onChangeEditMessageField={editMessageDialog.changeField}
      onSubmitEditMessage={editMessageDialog.submit}
    />
  );
}

