'use client';

import { useParams, useRouter } from 'next/navigation';
import { useOpportunityDetail } from '../../services/opportunities.queries';
import { OpportunityDetailView } from './opportunity-detail.view';
import { useCreateConversation } from '@/features/conversations/services/conversations.mutations';
import { useCreateConversationDialog } from '@/features/conversations/components/inbox/hooks/use-create-conversation-dialog.state';
import { CreateConversationDialog } from '@/features/conversations/components/inbox/components/create-conversation-dialog';
import { CREATE_CONVERSATION_DIALOG_CONFIG } from '@/features/conversations/components/inbox/components/create-conversation-dialog/create-conversation-dialog.config';
import { useContactsList } from '@/features/contacts/services/contacts.queries';
import { useOpportunitiesList } from '@/features/opportunities/services/opportunities.queries';
import { useDebounce } from '@/shared/hooks';

export function OpportunityDetailContainer() {
  const params = useParams();
  const router = useRouter();
  const opportunityId = params?.id as string;

  const { data: opportunity, isLoading, error } = useOpportunityDetail(opportunityId);

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

  // Fetch contacts for autocomplete (only when dialog is open)
  const { data: contactsData, isLoading: isSearchingContacts } = useContactsList({
    search: debouncedContactSearch.trim() || undefined,
    page: 1,
    pageSize: 20,
    sortBy: 'name',
    sortDir: 'asc',
    enabled: createDialog.isOpen,
  });

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
        onBack={handleBack}
        onConversationClick={handleConversationClick}
        onInterviewClick={handleInterviewClick}
        onOpenCreateConversation={handleOpenCreateConversation}
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
        contacts={contactsData?.contacts || []}
        isSearchingContacts={isSearchingContacts}
        opportunitySearchInput={createDialog.opportunitySearchInput}
        onOpportunitySearchChange={createDialog.handleOpportunitySearchChange}
        onOpportunitySelect={createDialog.handleOpportunitySelect}
        opportunities={opportunitiesData?.items || []}
        isSearchingOpportunities={isSearchingOpportunities}
      />
    </>
  );
}

