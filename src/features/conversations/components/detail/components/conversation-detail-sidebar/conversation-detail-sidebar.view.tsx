'use client';

import { Box } from '@mui/material';
import { MetadataCard } from '../metadata-card';
import { SummaryCard } from '../summary-card';
import { AiAssistantCard } from '../ai-assistant-card';
import { NotesCard } from '../notes-card';
import type { ConversationDetailSidebarProps } from './conversation-detail-sidebar.types';
import { styles } from './conversation-detail-sidebar.styles';

export function ConversationDetailSidebar({
  conversation,
  editValues,
  editErrors,
  isEditing,
  isSaving,
  availableStages,
  availableCategories,
  aiAnalysis,
  config,
  onChangeEditField,
  onSave,
  onCancel,
  onRequestAnalysis,
  onRegenerateReply,
}: ConversationDetailSidebarProps) {
  return (
    <Box sx={styles.sidebarColumn()}>
      <MetadataCard
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

      {conversation.summary && <SummaryCard summary={conversation.summary} config={config} />}

      <AiAssistantCard
        aiAnalysis={aiAnalysis}
        hasExistingSummary={!!conversation.summary}
        config={config}
        onRequestAnalysis={onRequestAnalysis}
        onRegenerateReply={onRegenerateReply}
      />

      <NotesCard
        notes={editValues.notes}
        isEditing={isEditing}
        isSaving={isSaving}
        error={editErrors.notes}
        config={config}
        onChangeNotes={(value) => onChangeEditField('notes', value)}
        onSave={onSave}
        onCancel={onCancel}
      />
    </Box>
  );
}

