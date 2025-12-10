'use client';

import { Box } from '@mui/material';
import { MetadataCard } from '../metadata-card';
import { SummaryCard } from '../summary-card';
import { NotesCard } from '../notes-card';
import { ContactsCard } from '../contacts-card';
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
  onAddContact,
  onRemoveContact,
  isAddingContact,
  isRemovingContact,
}: ConversationDetailSidebarProps) {
  return (
    <Box sx={styles.sidebarColumn()}>
      <ContactsCard
        contacts={conversation.contacts || []}
        config={config}
        onAddContact={onAddContact || (() => {})}
        onRemoveContact={onRemoveContact}
        isAddingContact={isAddingContact}
        isRemovingContact={isRemovingContact}
      />

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
