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
} from './components';

export function ConversationDetailView({
  conversation,
  isLoading,
  error,
  config,
  editMessageDialogConfig,
  editValues,
  editErrors,
  isEditing,
  isSaving,
  onBack,
  onChangeEditField,
  onSave,
  onCancel,
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
        contactName={conversation.contactName}
        contactCompany={conversation.contactCompany}
        isOutOfSync={conversation.isOutOfSync}
        config={config}
        onBack={onBack}
      />

      <ConversationDetailContent
        conversation={conversation}
        editValues={editValues}
        editErrors={editErrors}
        isEditing={isEditing}
        isSaving={isSaving}
        availableStages={availableStages}
        availableCategories={availableCategories}
        config={config}
        onPasteNewMessages={onPasteNewMessages}
        onOpenAddReply={onOpenAddReply}
        onChangeEditField={onChangeEditField}
        onSave={onSave}
        onCancel={onCancel}
        onConfirmMessage={onConfirmMessage}
        onEditMessage={onEditMessage}
        onDeleteMessage={onDeleteMessage}
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
    </Box>
  );
}
