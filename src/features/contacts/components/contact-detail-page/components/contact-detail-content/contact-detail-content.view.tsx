'use client';

import { Box } from '@mui/material';
import { BasicInfoCard } from '../basic-info-card';
import { LinkedInInfoCard } from '../linkedin-info-card';
import { ConversationsCard } from '../conversations-card';
import { AdditionalInfoCard } from '../additional-info-card';
import type { ContactDetailContentProps } from './contact-detail-content.types';
import { styles } from './contact-detail-content.styles';

export function ContactDetailContent({
  contact,
  editValues,
  editErrors,
  isEditing,
  isSaving,
  availableCategories,
  availableStages,
  config,
  onChangeEditField,
  onGoToConversation,
  onStartConversation,
}: ContactDetailContentProps) {
  return (
    <Box sx={styles.scrollableContent()}>
      <Box sx={styles.contentGrid()}>
        {/* Main Column */}
        <Box sx={styles.mainColumn()}>
          <BasicInfoCard
            contact={contact}
            editValues={editValues}
            editErrors={editErrors}
            isEditing={isEditing}
            isSaving={isSaving}
            config={config}
            onChangeEditField={onChangeEditField}
          />

          <LinkedInInfoCard
            contact={contact}
            editValues={editValues}
            editErrors={editErrors}
            isEditing={isEditing}
            isSaving={isSaving}
            config={config}
            onChangeEditField={onChangeEditField}
          />

          <ConversationsCard
            conversations={contact.conversations}
            config={config}
            onGoToConversation={onGoToConversation}
            onStartConversation={onStartConversation}
          />
        </Box>

        {/* Sidebar */}
        <Box>
          <AdditionalInfoCard
            contact={contact}
            editValues={editValues}
            editErrors={editErrors}
            isEditing={isEditing}
            isSaving={isSaving}
            availableCategories={availableCategories}
            availableStages={availableStages}
            config={config}
            onChangeEditField={onChangeEditField}
          />
        </Box>
      </Box>
    </Box>
  );
}

