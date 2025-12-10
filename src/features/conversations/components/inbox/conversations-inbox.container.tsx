'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ConversationsInboxView } from './conversations-inbox.view';
import { useConversationsInbox } from '../../services/conversations.queries';
import { useCreateConversation, useDeleteConversation } from '../../services/conversations.mutations';
import { CONVERSATIONS_INBOX_CONFIG } from './conversations-inbox.config';
import { useConversationsFilters } from './hooks/use-conversations-filters.state';
import { useCreateConversationDialog } from './hooks/use-create-conversation-dialog.state';
import { useDeleteConversationDialog } from './hooks/use-delete-conversation-dialog.state';
import { useContactsPagination } from './hooks/use-contacts-pagination.state';
import { useCategories } from '@/features/categories';
import { useStages } from '@/features/stages';
import { useChallengesList } from '@/features/challenges/services/challenges.queries';
import { useContactsList } from '@/features/contacts/services/contacts.queries';
import { useOpportunitiesList } from '@/features/opportunities/services/opportunities.queries';
import { useDebounce } from '@/shared/hooks';
import { CREATE_CONVERSATION_DIALOG_CONFIG } from './components/create-conversation-dialog/create-conversation-dialog.config';
import { useContactOptions } from './components/create-conversation-dialog/hooks/use-contact-options.state';
import { useAutocompleteScroll } from './components/create-conversation-dialog/hooks/use-autocomplete-scroll.state';

export function ConversationsInboxContainer() {
  const router = useRouter();

  // UI state hooks (no I/O)
  const {
    search,
    status,
    categoryId,
    stageId,
    emailStatus,
    page,
    pageSize,
    sortBy,
    sortDir,
    handleSearchChange,
    handleStatusChange,
    handleCategoryChange,
    handleStageChange,
    handleEmailStatusChange,
    handlePageChange,
    handleSortChange,
  } = useConversationsFilters();

  const { data: categories = [] } = useCategories();
  const { data: stages = [] } = useStages();

  const createMutation = useCreateConversation();
  const deleteMutation = useDeleteConversation();

  const createDialog = useCreateConversationDialog(async (values) => {
    await createMutation.mutateAsync({
      contactId: values.contactId,
      contactIds: values.contactIds,
      contactName: values.contactName,
      contactCompany: values.contactCompany || undefined,
      opportunityId: values.opportunityId,
      challengeId: values.challengeId,
      channel: values.channel,
      pastedText: values.pastedText,
      priority: 'medium',
      firstMessageSender: values.firstMessageSender,
      firstMessageContactId: values.firstMessageContactId,
      categoryId: values.categoryId,
      stageId: values.stageId,
    });
    // Close the dialog after successful creation
    createDialog.close();
  });

  // Fetch challenges for dropdown
  // Always fetch so they're available immediately when dialog opens
  const { data: challengesData, refetch: refetchChallenges } = useChallengesList({
    page: 1,
    pageSize: 100, // Maximum allowed by API
    sortBy: 'name',
    sortDir: 'asc',
    enabled: true, // Always fetch so dropdown is populated
  });
  const availableChallenges = challengesData?.challenges || [];

  // Refetch challenges when dialog opens to ensure fresh data
  useEffect(() => {
    if (createDialog.isOpen) {
      refetchChallenges();
    }
  }, [createDialog.isOpen, refetchChallenges]);

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
  // Explicitly set enabled to true/false to ensure query runs
  const { data: contactsData, isLoading: isSearchingContacts, error: contactsError } = useContactsList({
    search: debouncedContactSearch.trim() || undefined,
    page: contactPage,
    pageSize: CONTACTS_PAGE_SIZE,
    sortBy: 'name',
    sortDir: 'asc',
    enabled: createDialog.isOpen === true, // Explicit boolean
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

  // Debug: log contacts data
  useEffect(() => {
    if (createDialog.isOpen) {
      console.log('=== Create Dialog Debug ===');
      console.log('Dialog is open:', createDialog.isOpen);
      console.log('Contacts data:', contactsData);
      console.log('Contacts data contacts array:', contactsData?.contacts);
      console.log('Contacts data length:', contactsData?.contacts?.length);
      console.log('Accumulated contacts:', finalAccumulatedContacts);
      console.log('Accumulated contacts length:', finalAccumulatedContacts?.length);
      console.log('Contact page:', contactPage);
      console.log('Is searching contacts:', isSearchingContacts);
      console.log('All contact options:', allOptions);
      console.log('All contact options length:', allOptions?.length);
      console.log('===========================');
    }
  }, [createDialog.isOpen, contactsData, finalAccumulatedContacts, contactPage, isSearchingContacts, allOptions]);

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
    enabled: createDialog.isOpen,
  });

  // Delete dialog
  const deleteDialog = useDeleteConversationDialog();

  const handleConfirmDelete = async () => {
    if (deleteDialog.conversationId) {
      await deleteMutation.mutateAsync(deleteDialog.conversationId);
      deleteDialog.close();
    }
  };

  // Data fetching
  const { data = [], isLoading, error } = useConversationsInbox({
    search: search || undefined,
    status,
    categoryId: categoryId || undefined,
    stageId: stageId || undefined,
    emailStatus: emailStatus || undefined,
    page,
    pageSize,
    sortBy,
    sortDir,
  });

  const handleRowClick = (conversationId: string) => {
    router.push(`/conversations/${conversationId}`);
  };

  const handleCloseCreate = () => {
    if (createMutation.isPending) return;
    createDialog.close();
  };

  return (
    <ConversationsInboxView
      conversations={data}
      isLoading={isLoading}
      error={error ? 'Failed to load conversations. Please try again.' : null}
      search={search}
      page={page}
      sortBy={sortBy}
      sortDir={sortDir}
      status={status}
      config={CONVERSATIONS_INBOX_CONFIG}
      onSearchChange={handleSearchChange}
      onStatusChange={handleStatusChange}
      categoryId={categoryId}
      stageId={stageId}
      emailStatus={emailStatus}
      availableCategories={categories}
      availableStages={stages}
      availableChallenges={availableChallenges}
      onCategoryChange={handleCategoryChange}
      onStageChange={handleStageChange}
      onEmailStatusChange={handleEmailStatusChange}
      onPageChange={handlePageChange}
      onSortChange={handleSortChange}
      onRowClick={handleRowClick}
      isCreateOpen={createDialog.isOpen}
      onOpenCreate={createDialog.open}
      onCloseCreate={handleCloseCreate}
      createValues={createDialog.values}
      createErrors={createDialog.errors}
      onChangeCreateField={createDialog.changeField}
      onSubmitCreate={createDialog.submit}
      isCreating={createMutation.isPending}
      createDialogConfig={CREATE_CONVERSATION_DIALOG_CONFIG}
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
      onOpenDelete={deleteDialog.open}
      isDeleteDialogOpen={deleteDialog.isOpen}
      deleteConversationContactName={deleteDialog.contactName}
      onCloseDeleteDialog={deleteDialog.close}
      onConfirmDelete={handleConfirmDelete}
      isDeleting={deleteMutation.isPending}
    />
  );
}
