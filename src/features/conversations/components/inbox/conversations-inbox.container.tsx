'use client';

import { useRouter } from 'next/navigation';
import { ConversationsInboxView } from './conversations-inbox.view';
import { useConversationsInbox, useCreateConversation } from '../../services/conversations.queries';
import { CONVERSATIONS_INBOX_CONFIG } from './conversations-inbox.config';
import { useConversationsFilters } from './hooks/use-conversations-filters.state';
import { useCreateConversationDialog } from './hooks/use-create-conversation-dialog.state';

export function ConversationsInboxContainer() {
  const router = useRouter();

  // UI state hooks (no I/O)
  const {
    search,
    status,
    page,
    pageSize,
    sortBy,
    sortDir,
    handleSearchChange,
    handleStatusChange,
    handlePageChange,
    handleSortChange,
  } = useConversationsFilters();

  const createMutation = useCreateConversation();

  const createDialog = useCreateConversationDialog(async (values) => {
    await createMutation.mutateAsync({
      contactName: values.contactName,
      contactCompany: values.contactCompany || undefined,
      channel: values.channel,
      pastedText: values.pastedText,
      priority: 'medium',
    });
  });

  // Data fetching
  const { data = [], isLoading, error } = useConversationsInbox({
    search: search || undefined,
    status,
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
    />
  );
}
