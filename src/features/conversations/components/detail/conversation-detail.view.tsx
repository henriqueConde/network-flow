'use client';

import { Box } from '@mui/material';
import type { ConversationDetailViewProps } from './conversation-detail.types';
import { styles } from './conversation-detail.styles';
import {
  LoadingView,
  ErrorView,
  ConversationDetailHeader,
  ConversationDetailContent,
  AddReplyDialog,
  EditMessageDialog,
  AddContactDialog,
} from './components';

export function ConversationDetailView({
  conversation,
  isLoading,
  error,
  config,
  editMessageDialogConfig,
  editValues,
  editErrors,
  isEditingMetadata,
  isEditingNotes,
  isSaving,
  onBack,
  onViewContact,
  onViewOpportunity,
  onToggleAutoFollowups,
  onChangeEditField,
  onSaveMetadata,
  onSaveNotes,
  onCancelMetadata,
  onCancelNotes,
  onPasteNewMessages,
  isAddReplyOpen,
  addReplyValues,
  addReplyErrors,
  isAddingReply,
  onOpenAddReply,
  onCloseAddReply,
  onChangeAddReplyField,
  onSubmitAddReply,
  availableStages,
  availableCategories,
  aiMessages,
  isAiLoading,
  aiError,
  onSendAiMessage,
  onClearAiMessages,
  onUseAiSuggestion,
  onConfirmMessage,
  onEditMessage,
  onDeleteMessage,
  isEditMessageOpen,
  editMessageValues,
  editMessageErrors,
  isUpdatingMessage,
  onCloseEditMessage,
  onChangeEditMessageField,
  onSubmitEditMessage,
  onAddContact,
  onRemoveContact,
  isAddingContact,
  isRemovingContact,
  isAddContactDialogOpen,
  onCloseAddContactDialog,
  onConfirmAddContact,
  availableContactsForAdd,
  isLoadingContactsForAdd,
  contactSearchInput,
  onContactSearchInputChange,
}: ConversationDetailViewProps) {
  if (isLoading) {
    return <LoadingView />;
  }

  if (error || !conversation) {
    return <ErrorView error={error} isNotFound={!conversation} config={config} onBack={onBack} />;
  }

  return (
    <Box sx={styles.container()}>
      <ConversationDetailHeader
        contactId={conversation.contactId}
        contactName={conversation.contactName}
        contactCompany={conversation.contactCompany}
        opportunityId={conversation.opportunityId}
        opportunityTitle={conversation.opportunityTitle}
        isOutOfSync={conversation.isOutOfSync}
        config={config}
        onBack={onBack}
        onViewContact={onViewContact}
        onViewOpportunity={onViewOpportunity}
        autoFollowupsEnabled={conversation.autoFollowupsEnabled}
        onToggleAutoFollowups={onToggleAutoFollowups}
      />

      <ConversationDetailContent
        conversation={conversation}
        editValues={editValues}
        editErrors={editErrors}
        isEditingMetadata={isEditingMetadata}
        isEditingNotes={isEditingNotes}
        isSaving={isSaving}
        availableStages={availableStages}
        availableCategories={availableCategories}
        config={config}
        onPasteNewMessages={onPasteNewMessages}
        onOpenAddReply={onOpenAddReply}
        onChangeEditField={onChangeEditField}
        onSaveMetadata={onSaveMetadata}
        onSaveNotes={onSaveNotes}
        onCancelMetadata={onCancelMetadata}
        onCancelNotes={onCancelNotes}
        onConfirmMessage={onConfirmMessage}
        onEditMessage={onEditMessage}
        onDeleteMessage={onDeleteMessage}
        onAddContact={onAddContact}
        onRemoveContact={onRemoveContact}
        isAddingContact={isAddingContact}
        isRemovingContact={isRemovingContact}
      />

      <AddReplyDialog
        isOpen={isAddReplyOpen}
        values={addReplyValues}
        errors={addReplyErrors}
        isAddingReply={isAddingReply}
        conversation={conversation}
        config={config}
        onClose={onCloseAddReply}
        onChangeField={onChangeAddReplyField}
        onSubmit={onSubmitAddReply}
        aiMessages={aiMessages}
        isAiLoading={isAiLoading}
        aiError={aiError}
        onSendAiMessage={onSendAiMessage}
        onClearAiMessages={onClearAiMessages}
        onUseAiSuggestion={onUseAiSuggestion}
      />

      <EditMessageDialog
        isOpen={isEditMessageOpen}
        values={editMessageValues}
        errors={editMessageErrors}
        isUpdating={isUpdatingMessage}
        config={editMessageDialogConfig}
        onClose={onCloseEditMessage}
        onChangeField={onChangeEditMessageField}
        onSubmit={onSubmitEditMessage}
      />

      {isAddContactDialogOpen && onCloseAddContactDialog && onConfirmAddContact && (
        <AddContactDialog
          isOpen={isAddContactDialogOpen}
          onClose={onCloseAddContactDialog}
          onConfirm={onConfirmAddContact}
          contacts={availableContactsForAdd || []}
          existingContactIds={conversation.contacts?.map(c => c.id) || []}
          isLoading={isLoadingContactsForAdd || false}
          config={config}
          searchInput={contactSearchInput}
          onSearchInputChange={onContactSearchInputChange}
        />
      )}
    </Box>
  );
}
