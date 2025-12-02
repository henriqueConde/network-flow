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
} from './components';

export function ConversationDetailView({
  conversation,
  isLoading,
  error,
  config,
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
  aiAnalysis,
  onRequestAnalysis,
  onRegenerateReply,
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
        aiAnalysis={aiAnalysis}
        config={config}
        onPasteNewMessages={onPasteNewMessages}
        onOpenAddReply={onOpenAddReply}
        onChangeEditField={onChangeEditField}
        onSave={onSave}
        onCancel={onCancel}
        onRequestAnalysis={onRequestAnalysis}
        onRegenerateReply={onRegenerateReply}
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
      />
    </Box>
  );
}
