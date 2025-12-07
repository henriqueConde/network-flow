'use client';

import { Box } from '@mui/material';
import { MetadataCard } from '../metadata-card';
import { SummaryCard } from '../summary-card';
import { NotesCard } from '../notes-card';
import { EmailTrackingCard } from '../email-tracking-card';
import type { ConversationDetailSidebarProps } from './conversation-detail-sidebar.types';
import { styles } from './conversation-detail-sidebar.styles';

export function ConversationDetailSidebar({
  conversation,
  editValues,
  editErrors,
  isEditingMetadata,
  isEditingNotes,
  isSaving,
  availableStages,
  availableCategories,
  config,
  onChangeEditField,
  onSaveMetadata,
  onSaveNotes,
  onCancelMetadata,
  onCancelNotes,
}: ConversationDetailSidebarProps) {
  return (
    <Box sx={styles.sidebarColumn()}>
      <MetadataCard
        editValues={editValues}
        editErrors={editErrors}
        isEditing={isEditingMetadata}
        isSaving={isSaving}
        availableStages={availableStages}
        availableCategories={availableCategories}
        config={config}
        onChangeEditField={onChangeEditField}
        onSave={onSaveMetadata}
        onCancel={onCancelMetadata}
      />

      {conversation.summary && <SummaryCard summary={conversation.summary} config={config} />}

      <EmailTrackingCard
        conversation={conversation}
        editValues={{
          strategyIds: editValues.strategyIds,
          responseReceived: editValues.responseReceived,
          responseReceivedAt: editValues.responseReceivedAt,
          emailSentAt: editValues.emailSentAt,
          loomVideoUrl: editValues.loomVideoUrl,
          loomSent: editValues.loomSent,
          emailFollowUpDates: editValues.emailFollowUpDates,
          emailStatus: editValues.emailStatus,
          followUp1Date: editValues.followUp1Date,
          followUp2Date: editValues.followUp2Date,
          followUp3Date: editValues.followUp3Date,
        }}
        editErrors={editErrors}
        isEditing={isEditingMetadata}
        isSaving={isSaving}
        config={config}
        onChangeEditField={onChangeEditField}
        onSave={onSaveMetadata}
        onCancel={onCancelMetadata}
      />

      <NotesCard
        notes={editValues.notes}
        isEditing={isEditingNotes}
        isSaving={isSaving}
        error={editErrors.notes}
        config={config}
        onChangeNotes={(value) => onChangeEditField('notes', value)}
        onSave={onSaveNotes}
        onCancel={onCancelNotes}
      />
    </Box>
  );
}

