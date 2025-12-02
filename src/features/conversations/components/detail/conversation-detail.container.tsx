'use client';

import { ConversationDetailView } from './conversation-detail.view';
import { CONVERSATION_DETAIL_CONFIG } from './conversation-detail.config';
import { useConversationDetail } from '../../services/conversations.queries';
import { useUpdateConversation, useAddMessage } from '../../services/conversations.mutations';
import { useAnalyzeConversationMutation } from '../../services/conversation-ai.mutations';
import { useConversationEdit } from './hooks/use-conversation-edit.state';
import { useAddReplyDialog } from './hooks/use-add-reply-dialog.state';
import { useConversationDetailNavigation } from './hooks/use-conversation-detail-navigation.state';
import { useConversationEditActions } from './hooks/use-conversation-edit-actions.state';
import { useConversationAiAnalysis } from './hooks/use-conversation-ai-analysis.state';
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
  const analyzeMutation = useAnalyzeConversationMutation();

  // UI state hooks
  const conversationOrNull = conversation ?? null;
  const edit = useConversationEdit(conversationOrNull);
  const editActions = useConversationEditActions(conversationOrNull, edit, updateMutation);
  const { messages, handleSendMessage, clearMessages, isLoading: isAiLoading, error: aiError } = useConversationAiAnalysis(conversationId, analyzeMutation);

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

  const handlePasteNewMessages = () => {
    // TODO: Implement paste new messages dialog/modal
    console.log('Paste new messages - to be implemented');
  };

  return (
    <ConversationDetailView
      conversation={conversation ?? null}
      isLoading={isLoading}
      error={error ? 'Failed to load conversation. Please try again.' : null}
      config={CONVERSATION_DETAIL_CONFIG}
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
    />
  );
}

