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
  isEditing,
  isSaving,
  availableStages,
  availableCategories,
  config,
  onPasteNewMessages,
  onOpenAddReply,
  onChangeEditField,
  onSave,
  onCancel,
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
          <MessagesCard messages={conversation.messages} config={config} onOpenAddReply={onOpenAddReply} />
        </Box>

        {/* Sidebar: Metadata, Summary, Notes */}
        <ConversationDetailSidebar
          conversation={conversation}
          editValues={editValues}
          editErrors={editErrors}
          isEditing={isEditing}
          isSaving={isSaving}
          availableStages={availableStages}
          availableCategories={availableCategories}
          config={config}
          onChangeEditField={onChangeEditField}
          onSave={onSave}
          onCancel={onCancel}
        />
      </Box>
    </Box>
  );
}

