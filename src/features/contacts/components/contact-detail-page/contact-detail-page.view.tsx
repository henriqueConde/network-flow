'use client';

import { Box } from '@mui/material';
import type { ContactDetailViewProps } from './contact-detail-page.types';
import { styles } from './contact-detail-page.styles';
import {
  LoadingView,
  ErrorView,
  ContactDetailHeader,
  ContactDetailContent,
} from './components';

export function ContactDetailPageView({
  contact,
  isLoading,
  error,
  config,
  availableCategories,
  availableStages,
  editValues,
  editErrors,
  isEditing,
  isSaving,
  onBack,
  onStartEdit,
  onChangeEditField,
  onSave,
  onCancel,
  onGoToConversation,
  onStartConversation,
}: ContactDetailViewProps) {
  if (isLoading) {
    return <LoadingView />;
  }

  if (error || !contact) {
    return <ErrorView error={error || 'Contact not found'} isNotFound={!contact} config={config} onBack={onBack} />;
  }

  return (
    <Box sx={styles.container()}>
      <ContactDetailHeader
        contactName={contact.name}
        contactCompany={contact.company}
        isEditing={isEditing}
        isSaving={isSaving}
        editValues={{
          name: editValues.name,
          company: editValues.company,
        }}
        editErrors={{
          name: editErrors.name,
          company: editErrors.company,
        }}
        config={config}
        onBack={onBack}
        onStartEdit={onStartEdit}
        onChangeEditField={(field, value) => onChangeEditField(field as 'name' | 'company', value)}
        onSave={onSave}
        onCancel={onCancel}
      />

      <ContactDetailContent
        contact={contact}
        editValues={editValues}
        editErrors={editErrors}
        isEditing={isEditing}
        isSaving={isSaving}
        availableCategories={availableCategories}
        availableStages={availableStages}
        config={config}
        onChangeEditField={onChangeEditField}
        onGoToConversation={onGoToConversation}
        onStartConversation={onStartConversation}
      />
    </Box>
  );
}

