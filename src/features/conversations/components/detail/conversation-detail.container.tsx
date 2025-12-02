'use client';

import { useRouter, useParams } from 'next/navigation';
import { ConversationDetailView } from './conversation-detail.view';
import { CONVERSATION_DETAIL_CONFIG } from './conversation-detail.config';
import { useConversationDetail } from '../../services/conversations.queries';
import { useUpdateConversation, useAddMessage } from '../../services/conversations.mutations';
import { useConversationEdit } from './hooks/use-conversation-edit.state';
import { useAddReplyDialog } from './hooks/use-add-reply-dialog.state';
import { useStages } from '@/features/stages';
import { useCategories } from '@/features/categories';

export function ConversationDetailContainer() {
  const router = useRouter();
  const params = useParams();
  const conversationId = params?.id as string;

  const { data: conversation, isLoading, error } = useConversationDetail(conversationId);
  const { data: stages = [] } = useStages();
  const { data: categories = [] } = useCategories();
  const updateMutation = useUpdateConversation();
  const addMessageMutation = useAddMessage();

  const edit = useConversationEdit(conversation ?? null);

  const handleBack = () => {
    router.push('/conversations');
  };

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

  const handlePasteNewMessages = () => {
    // TODO: Implement paste new messages dialog/modal
    console.log('Paste new messages - to be implemented');
  };

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

  // Make fields always editable - start editing mode when any field changes
  const handleFieldChange = (field: keyof typeof edit.values, value: string | null) => {
    if (!edit.isEditing) {
      edit.startEditing();
    }
    edit.changeField(field, value);
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
      onChangeEditField={handleFieldChange}
      onSave={handleSave}
      onCancel={handleCancel}
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
    />
  );
}

