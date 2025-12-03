'use client';

import { ContactDetailPageView } from './contact-detail-page.view';
import { CONTACT_DETAIL_CONFIG } from './contact-detail-page.config';
import { useContactDetail } from '../../services/contacts.queries';
import { useUpdateContact } from '../../services/contacts.mutations';
import { useContactEdit } from './hooks/use-contact-edit.state';
import { useContactEditActions } from './hooks/use-contact-edit-actions.state';
import { useContactDetailNavigation } from './hooks/use-contact-navigation.state';
import { useStages } from '@/features/stages';
import { useCategories } from '@/features/categories';

type ContactDetailPageContainerProps = {
  contactId: string;
};

export function ContactDetailPageContainer({ contactId }: ContactDetailPageContainerProps) {
  // Data fetching
  const { data: contact, isLoading, error } = useContactDetail(contactId);
  const { data: stages = [] } = useStages();
  const { data: categories = [] } = useCategories();

  // Mutations
  const updateMutation = useUpdateContact();

  // UI state hooks
  const contactOrNull = contact ?? null;
  const edit = useContactEdit(contactOrNull);
  const editActions = useContactEditActions(contactOrNull, edit, updateMutation);

  // Navigation
  const { handleBack, handleGoToConversation } = useContactDetailNavigation();

  return (
    <ContactDetailPageView
      contact={contactOrNull}
      isLoading={isLoading}
      error={error ? 'Failed to load contact. Please try again.' : null}
      config={CONTACT_DETAIL_CONFIG}
      availableCategories={categories}
      availableStages={stages}
      editValues={edit.values}
      editErrors={edit.errors}
      isEditing={edit.isEditing}
      isSaving={updateMutation.isPending}
      onBack={handleBack}
      onStartEdit={edit.startEditing}
      onChangeEditField={editActions.handleFieldChange}
      onSave={editActions.handleSave}
      onCancel={editActions.handleCancel}
      onGoToConversation={handleGoToConversation}
    />
  );
}

