'use client';

import { Box } from '@mui/material';
import { OutOfSyncBanner } from '../out-of-sync-banner';
import { MessagesCard } from '../messages-card';
import { ConversationDetailSidebar } from '../conversation-detail-sidebar';
import type { ConversationDetailContentProps } from './conversation-detail-content.types';
import { styles } from './conversation-detail-content.styles';

export function ConversationDetailContent({
  conversation,
  editValues,
  editErrors,
  isEditingMetadata,
  isEditingNotes,
  isSaving,
  availableStages,
  availableCategories,
  config,
  onPasteNewMessages,
  onOpenAddReply,
  onChangeEditField,
  onSaveMetadata,
  onSaveNotes,
  onCancelMetadata,
  onCancelNotes,
  onConfirmMessage,
  onEditMessage,
  onDeleteMessage,
}: ConversationDetailContentProps) {
  return (
    <Box sx={styles.scrollableContent()}>
      {conversation.isOutOfSync && conversation.latestEmailEvent && (
        <OutOfSyncBanner
          snippet={conversation.latestEmailEvent.snippet}
          config={config}
          onPasteNewMessages={onPasteNewMessages}
        />
      )}

      <Box sx={styles.contentGrid()}>
        {/* Main column: Messages */}
        <Box sx={styles.mainColumn()}>
          <MessagesCard 
            messages={conversation.messages} 
            config={config} 
            onOpenAddReply={onOpenAddReply}
            onConfirmMessage={onConfirmMessage}
            onEditMessage={onEditMessage}
            onDeleteMessage={onDeleteMessage}
          />
        </Box>

        {/* Sidebar: Metadata, Summary, Notes */}
        <ConversationDetailSidebar
          conversation={conversation}
          editValues={editValues}
          editErrors={editErrors}
          isEditingMetadata={isEditingMetadata}
          isEditingNotes={isEditingNotes}
          isSaving={isSaving}
          availableStages={availableStages}
          availableCategories={availableCategories}
          config={config}
          onChangeEditField={onChangeEditField}
          onSaveMetadata={onSaveMetadata}
          onSaveNotes={onSaveNotes}
          onCancelMetadata={onCancelMetadata}
          onCancelNotes={onCancelNotes}
        />
      </Box>
    </Box>
  );
}

