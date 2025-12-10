'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useOpportunityDetail } from '../../services/opportunities.queries';
import { useUpdateOpportunity } from '../../services/opportunities.mutations';
import { OpportunityDetailView } from './opportunity-detail.view';
import { useOpportunityEdit } from './hooks/use-opportunity-edit.state';
import { useOpportunityEditActions } from './hooks/use-opportunity-edit-actions.state';
import { useCreateConversation } from '@/features/conversations/services/conversations.mutations';
import { useCreateConversationDialog } from '@/features/conversations/components/inbox/hooks/use-create-conversation-dialog.state';
import { CreateConversationDialog } from '@/features/conversations/components/inbox/components/create-conversation-dialog';
import { CREATE_CONVERSATION_DIALOG_CONFIG } from '@/features/conversations/components/inbox/components/create-conversation-dialog/create-conversation-dialog.config';
import { useContactsList } from '@/features/contacts/services/contacts.queries';
import { useOpportunitiesList } from '@/features/opportunities/services/opportunities.queries';
import { useDebounce } from '@/shared/hooks';
import { useContactsPagination } from '@/features/conversations/components/inbox/hooks/use-contacts-pagination.state';
import { useContactOptions } from '@/features/conversations/components/inbox/components/create-conversation-dialog/hooks/use-contact-options.state';
import { useAutocompleteScroll } from '@/features/conversations/components/inbox/components/create-conversation-dialog/hooks/use-autocomplete-scroll.state';
import { useCategories } from '@/features/categories';
import { useStages } from '@/features/stages';
import { useChallengesList } from '@/features/challenges/services/challenges.queries';

export function OpportunityDetailContainer() {
  const params = useParams();
  const router = useRouter();
  const opportunityId = params?.id as string;

  const { data: opportunity, isLoading, error } = useOpportunityDetail(opportunityId);
  const { data: categories = [] } = useCategories();
  const { data: stages = [] } = useStages();
  const { data: challengesData } = useChallengesList({
    page: 1,
    pageSize: 100, // Maximum allowed by API
    sortBy: 'name',
    sortDir: 'asc',
  });
  const availableChallenges = challengesData?.challenges || [];

  // Edit state
  const updateMutation = useUpdateOpportunity();
  const opportunityOrNull = opportunity ?? null;
  const edit = useOpportunityEdit(opportunityOrNull);
  const editActions = useOpportunityEditActions(opportunityOrNull, edit, updateMutation);

  const createMutation = useCreateConversation();

  const createDialog = useCreateConversationDialog(async (values) => {
    await createMutation.mutateAsync({
      contactId: values.contactId,
      contactName: values.contactName,
      contactCompany: values.contactCompany || undefined,
      opportunityId: values.opportunityId || opportunityId,
      channel: values.channel,
      pastedText: values.pastedText,
      priority: 'medium',
      firstMessageSender: values.firstMessageSender,
    });
    createDialog.close();
    // React Query will automatically refetch the opportunity detail after invalidation
  });

  // Debounce contact search input for API calls
  const debouncedContactSearch = useDebounce(createDialog.contactSearchInput, 300);
  const debouncedOpportunitySearch = useDebounce(createDialog.opportunitySearchInput, 300);

  // Contact pagination state - manage page externally
  const [contactPage, setContactPage] = useState(1);
  const CONTACTS_PAGE_SIZE = 50;

  // Reset page when dialog opens or search changes
  useEffect(() => {
    if (createDialog.isOpen) {
      setContactPage(1);
    }
  }, [createDialog.isOpen, debouncedContactSearch]);

  // Fetch contacts for autocomplete (only when dialog is open)
  const { data: contactsData, isLoading: isSearchingContacts } = useContactsList({
    search: debouncedContactSearch.trim() || undefined,
    page: contactPage,
    pageSize: CONTACTS_PAGE_SIZE,
    sortBy: 'name',
    sortDir: 'asc',
    enabled: createDialog.isOpen === true,
  });

  // Use the pagination hook to accumulate contacts
  const {
    accumulatedContacts: finalAccumulatedContacts,
    hasMoreContacts: finalHasMoreContacts,
  } = useContactsPagination(
    contactsData,
    contactPage,
    isSearchingContacts,
    createDialog.isOpen,
    debouncedContactSearch,
  );

  // Function to load more contacts
  const finalLoadMoreContacts = () => {
    if (!isSearchingContacts && finalHasMoreContacts) {
      setContactPage((prev) => prev + 1);
    }
  };

  // Contact options hook - handles "New contact" option logic
  const { contactOptions, allOptions, searchInputTrimmed } = useContactOptions(
    finalAccumulatedContacts,
    createDialog.contactSearchInput,
    createDialog.values.contactId,
    CREATE_CONVERSATION_DIALOG_CONFIG.copy.newContactOption,
  );

  // Infinite scroll hook for contacts autocomplete
  const { handleScroll: handleContactScroll } = useAutocompleteScroll(
    finalHasMoreContacts,
    isSearchingContacts,
    finalLoadMoreContacts,
  );

  // Fetch opportunities for autocomplete (only when dialog is open)
  const { data: opportunitiesData, isLoading: isSearchingOpportunities } = useOpportunitiesList({
    search: debouncedOpportunitySearch.trim() || undefined,
    page: 1,
    pageSize: 20,
    sortBy: 'updatedAt',
    sortDir: 'desc',
  });

  const handleBack = () => {
    router.push('/pipeline');
  };

  const handleConversationClick = (conversationId: string) => {
    router.push(`/conversations/${conversationId}`);
  };

  const handleInterviewClick = (conversationId: string) => {
    router.push(`/interviews/${conversationId}`);
  };

  const handleOpenCreateConversation = () => {
    // Pre-populate with opportunity's contact info if available
    if (opportunity) {
      createDialog.open(opportunityId);
      // Set contact info from opportunity
      createDialog.changeField('contactName', opportunity.contactName);
      createDialog.changeField('contactCompany', opportunity.contactCompany || '');
      createDialog.handleContactSearchChange(opportunity.contactName);
    } else {
      createDialog.open(opportunityId);
    }
  };

  const handleContactClick = (contactId: string) => {
    router.push(`/contacts/${contactId}`);
  };

  const handleCloseCreate = () => {
    if (createMutation.isPending) return;
    createDialog.close();
  };

  return (
    <>
      <OpportunityDetailView
        opportunity={opportunity ?? null}
        isLoading={isLoading}
        error={error ? 'Failed to load opportunity. Please try again.' : null}
        availableCategories={categories}
        availableStages={stages}
        availableChallenges={availableChallenges}
        editValues={edit.values}
        editErrors={edit.errors}
        isEditing={edit.isEditing}
        isSaving={updateMutation.isPending}
        onBack={handleBack}
        onStartEdit={edit.startEditing}
        onChangeEditField={editActions.handleFieldChange}
        onSave={editActions.handleSave}
        onCancel={editActions.handleCancel}
        onConversationClick={handleConversationClick}
        onInterviewClick={handleInterviewClick}
        onOpenCreateConversation={handleOpenCreateConversation}
        onContactClick={handleContactClick}
      />
      <CreateConversationDialog
        isOpen={createDialog.isOpen}
        onClose={handleCloseCreate}
        values={createDialog.values}
        errors={createDialog.errors}
        onChangeField={createDialog.changeField}
        onSubmit={createDialog.submit}
        isCreating={createMutation.isPending}
        config={CREATE_CONVERSATION_DIALOG_CONFIG}
        contactSearchInput={createDialog.contactSearchInput}
        onContactSearchChange={createDialog.handleContactSearchChange}
        onContactSelect={createDialog.handleContactSelect}
        onContactsSelect={createDialog.handleContactsSelect}
        contacts={finalAccumulatedContacts}
        contactOptions={contactOptions}
        allContactOptions={allOptions}
        contactSearchInputTrimmed={searchInputTrimmed}
        onContactScroll={handleContactScroll}
        isSearchingContacts={isSearchingContacts}
        opportunitySearchInput={createDialog.opportunitySearchInput}
        onOpportunitySearchChange={createDialog.handleOpportunitySearchChange}
        onOpportunitySelect={createDialog.handleOpportunitySelect}
        opportunities={opportunitiesData?.items || []}
        isSearchingOpportunities={isSearchingOpportunities}
        availableCategories={categories}
        availableStages={stages}
        availableChallenges={availableChallenges}
      />
    </>
  );
}

