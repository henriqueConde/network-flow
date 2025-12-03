'use client';

import { useRouter } from 'next/navigation';
import { ContactDetailPageView } from './contact-detail-page.view';
import { CONTACT_DETAIL_CONFIG } from './contact-detail-page.config';
import { useContactDetail } from '../../services/contacts.queries';
import { useUpdateContact } from '../../services/contacts.mutations';
import { useContactEdit } from './hooks/use-contact-edit.state';
import { useContactEditActions } from './hooks/use-contact-edit-actions.state';
import { useContactDetailNavigation } from './hooks/use-contact-navigation.state';
import { useStages } from '@/features/stages';
import { useCategories } from '@/features/categories';
import { useCreateConversation } from '@/features/conversations/services/conversations.mutations';
import { useStartConversationDialog } from './components/start-conversation-dialog/use-start-conversation-dialog.state';
import { StartConversationDialog } from './components/start-conversation-dialog/start-conversation-dialog.view';
import { START_CONVERSATION_DIALOG_CONFIG } from './components/start-conversation-dialog/start-conversation-dialog.config';
import type { CreateConversationFormValues } from './components/start-conversation-dialog/start-conversation-dialog.schema';
import { contactsKeys } from '../../services/contacts.keys';
import { useQueryClient } from '@tanstack/react-query';

type ContactDetailPageContainerProps = {
  contactId: string;
};

export function ContactDetailPageContainer({ contactId }: ContactDetailPageContainerProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Data fetching
  const { data: contact, isLoading, error } = useContactDetail(contactId);
  const { data: stages = [] } = useStages();
  const { data: categories = [] } = useCategories();

  // Mutations
  const updateMutation = useUpdateContact();
  const createConversationMutation = useCreateConversation();

  // UI state hooks
  const contactOrNull = contact ?? null;
  const edit = useContactEdit(contactOrNull);
  const editActions = useContactEditActions(contactOrNull, edit, updateMutation);

  // Navigation
  const { handleBack, handleGoToConversation } = useContactDetailNavigation();

  // Start conversation dialog
  const startConversationDialog = useStartConversationDialog(async (values: CreateConversationFormValues) => {
    if (!contact) return;

    const result = await createConversationMutation.mutateAsync({
      contactId: contact.id,
      contactName: contact.name,
      contactCompany: contact.company || undefined,
      channel: values.channel,
      pastedText: values.pastedText,
      firstMessageSender: values.firstMessageSender,
      priority: 'medium',
      categoryId: contact.categoryId || undefined,
      stageId: contact.stageId || undefined,
    });

    startConversationDialog.close();
    // Invalidate contact detail to refresh conversations list
    queryClient.invalidateQueries({ queryKey: contactsKeys.detail(contactId) });
    // Redirect to the created conversation
    router.push(`/conversations/${result.id}`);
  });

  const handleStartConversation = () => {
    startConversationDialog.open();
  };

  return (
    <>
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
        onStartConversation={handleStartConversation}
      />
      {contact && (
        <StartConversationDialog
          isOpen={startConversationDialog.isOpen}
          onClose={startConversationDialog.close}
          values={startConversationDialog.values}
          errors={startConversationDialog.errors}
          onChangeField={startConversationDialog.changeField}
          onSubmit={startConversationDialog.submit}
          isCreating={createConversationMutation.isPending}
          contactName={contact.name}
          contactCompany={contact.company}
          config={START_CONVERSATION_DIALOG_CONFIG}
        />
      )}
    </>
  );
}

