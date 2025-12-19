'use client';

import { ConversationDetailView } from './conversation-detail.view';
import { CONVERSATION_DETAIL_CONFIG } from './conversation-detail.config';
import { EDIT_MESSAGE_DIALOG_CONFIG } from './components/edit-message-dialog/edit-message-dialog.config';
import { useConversationDetail } from '../../services/conversations.queries';
import { useUpdateConversation, useAddMessage, useUpdateMessage, useDeleteMessage, useToggleMessageStatus, useAddContactToConversation, useRemoveContactFromConversation } from '../../services/conversations.mutations';
import { useAnalyzeConversationMutation } from '../../services/conversation-ai.mutations';
import { useContactsList } from '@/features/contacts/services/contacts.queries';
import { useConversationEdit } from './hooks/use-conversation-edit.state';
import { useConversationDetailNavigation } from './hooks/use-conversation-detail-navigation.state';
import { useRouter } from 'next/navigation';
import { useConversationEditActions } from './hooks/use-conversation-edit-actions.state';
import { useConversationAiAnalysis } from './hooks/use-conversation-ai-analysis.state';
import { useAddReplyActions } from './hooks/use-add-reply-actions.state';
import { useEditMessageActions } from './hooks/use-edit-message-actions.state';
import { useMessageActions } from './hooks/use-message-actions.state';
import { usePasteMessages } from './hooks/use-paste-messages.state';
import { useStages } from '@/features/stages';
import { useCategories } from '@/features/categories';
import { DeleteMessageDialog } from './components/delete-message-dialog/delete-message-dialog.view';
import { DELETE_MESSAGE_DIALOG_CONFIG } from './components/delete-message-dialog/delete-message-dialog.config';
import { useState, useMemo } from 'react';
import { useDebounce } from '@/shared/hooks';
import { getContactColor } from '@/shared/utils/color.utils';

export function ConversationDetailContainer() {
  // Navigation
  const router = useRouter();
  const { conversationId, handleBack } = useConversationDetailNavigation();

  const handleViewContact = (contactId: string) => {
    router.push(`/contacts/${contactId}`);
  };

  const handleViewOpportunity = (opportunityId: string) => {
    router.push(`/opportunities/${opportunityId}`);
  };

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
  const addContactMutation = useAddContactToConversation();
  const removeContactMutation = useRemoveContactFromConversation();

  // UI state hooks
  const conversationOrNull = conversation ?? null;
  const edit = useConversationEdit(conversationOrNull);
  const editActions = useConversationEditActions(conversationOrNull, edit, updateMutation);
  const { messages, handleSendMessage, clearMessages, isLoading: isAiLoading, error: aiError } = useConversationAiAnalysis(conversationId, analyzeMutation);

  // Action hooks
  const { addReplyDialog, handleUseAiSuggestion } = useAddReplyActions(conversationOrNull, addMessageMutation);
  const { editMessageDialog, handleEditMessage } = useEditMessageActions(conversationOrNull, updateMessageMutation);
  const {
    handleToggleMessageStatus,
    handleOpenDeleteDialog,
    deleteMessageId,
    handleCloseDeleteDialog,
    handleConfirmDelete,
    isDeleting,
  } = useMessageActions(conversationOrNull, toggleMessageStatusMutation, deleteMessageMutation);
  const { handlePasteNewMessages } = usePasteMessages();

  const handleToggleAutoFollowups = (enabled: boolean) => {
    if (!conversationId || !conversation) return;
    updateMutation.mutate({
      id: conversationId,
      payload: {
        autoFollowupsEnabled: enabled,
      },
    });
  };

  // Contact management
  const [isAddContactDialogOpen, setIsAddContactDialogOpen] = useState(false);
  const [contactSearchInput, setContactSearchInput] = useState('');
  const debouncedContactSearch = useDebounce(contactSearchInput, 300);

  // Fetch contacts for add contact dialog
  const { data: contactsData, isLoading: isLoadingContactsForAdd } = useContactsList({
    search: debouncedContactSearch.trim() || undefined,
    page: 1,
    pageSize: 50,
    sortBy: 'name',
    sortDir: 'asc',
    enabled: isAddContactDialogOpen,
  });

  const handleAddContact = () => {
    setIsAddContactDialogOpen(true);
    setContactSearchInput('');
  };

  const handleCloseAddContactDialog = () => {
    setIsAddContactDialogOpen(false);
    setContactSearchInput('');
  };

  const handleConfirmAddContact = async (contactId: string) => {
    if (!conversationId) return;
    await addContactMutation.mutateAsync({
      conversationId,
      contactId,
    });
    setIsAddContactDialogOpen(false);
    setContactSearchInput('');
  };

  const handleRemoveContact = async (contactId: string) => {
    if (!conversationId) return;
    await removeContactMutation.mutateAsync({
      conversationId,
      contactId,
    });
  };

  // Create contact maps for MessagesCard (derived state - should be in container)
  const { contactColorMap, contactMap } = useMemo(() => {
    if (!conversation) {
      return {
        contactColorMap: new Map<string, string>(),
        contactMap: new Map<string, { name: string; company: string | null }>(),
      };
    }

    const colorMap = new Map<string, string>();
    const nameMap = new Map<string, { name: string; company: string | null }>();
    
    conversation.contacts.forEach((contact) => {
      colorMap.set(contact.id, getContactColor(contact.id));
      nameMap.set(contact.id, { name: contact.name, company: contact.company });
    });

    return {
      contactColorMap: colorMap,
      contactMap: nameMap,
    };
  }, [conversation]);

  return (
    <>
    <ConversationDetailView
      conversation={conversation ?? null}
      isLoading={isLoading}
      error={error ? 'Failed to load conversation. Please try again.' : null}
      config={CONVERSATION_DETAIL_CONFIG}
      editMessageDialogConfig={EDIT_MESSAGE_DIALOG_CONFIG}
      editValues={edit.values}
      editErrors={edit.errors}
      isEditingMetadata={edit.isEditingMetadata}
      isEditingNotes={edit.isEditingNotes}
      isSaving={updateMutation.isPending}
      onBack={handleBack}
      onViewContact={handleViewContact}
      onViewOpportunity={handleViewOpportunity}
      onToggleAutoFollowups={handleToggleAutoFollowups}
      onChangeEditField={editActions.handleFieldChange}
      onSaveMetadata={editActions.handleSaveMetadata}
      onSaveNotes={editActions.handleSaveNotes}
      onCancelMetadata={editActions.handleCancelMetadata}
      onCancelNotes={editActions.handleCancelNotes}
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
      contactColorMap={contactColorMap}
      contactMap={contactMap}
      aiMessages={messages}
      isAiLoading={isAiLoading}
      aiError={aiError}
      onSendAiMessage={handleSendMessage}
      onClearAiMessages={clearMessages}
      onUseAiSuggestion={handleUseAiSuggestion}
      onConfirmMessage={handleToggleMessageStatus}
      onEditMessage={handleEditMessage}
      onDeleteMessage={handleOpenDeleteDialog}
      isEditMessageOpen={editMessageDialog.isOpen}
      editMessageValues={editMessageDialog.values}
      editMessageErrors={editMessageDialog.errors}
      isUpdatingMessage={updateMessageMutation.isPending}
      onCloseEditMessage={editMessageDialog.close}
      onChangeEditMessageField={editMessageDialog.changeField}
      onSubmitEditMessage={editMessageDialog.submit}
      onAddContact={handleAddContact}
      onRemoveContact={handleRemoveContact}
      isAddingContact={addContactMutation.isPending}
      isRemovingContact={removeContactMutation.isPending}
      isAddContactDialogOpen={isAddContactDialogOpen}
      onCloseAddContactDialog={handleCloseAddContactDialog}
      onConfirmAddContact={handleConfirmAddContact}
      availableContactsForAdd={contactsData?.contacts || []}
      isLoadingContactsForAdd={isLoadingContactsForAdd}
      contactSearchInput={contactSearchInput}
      onContactSearchInputChange={setContactSearchInput}
    />
    <DeleteMessageDialog
      isOpen={deleteMessageId !== null}
      onClose={handleCloseDeleteDialog}
      onConfirm={handleConfirmDelete}
      isDeleting={isDeleting}
      config={DELETE_MESSAGE_DIALOG_CONFIG}
    />
  </>
  );
}

