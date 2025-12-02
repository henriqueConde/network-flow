'use client';

import { useRouter } from 'next/navigation';
import { ConversationsInboxView } from './conversations-inbox.view';
import { useConversationsInbox } from '../../services/conversations.queries';
import { useCreateConversation, useDeleteConversation } from '../../services/conversations.mutations';
import { CONVERSATIONS_INBOX_CONFIG } from './conversations-inbox.config';
import { useConversationsFilters } from './hooks/use-conversations-filters.state';
import { useCreateConversationDialog } from './hooks/use-create-conversation-dialog.state';
import { useDeleteConversationDialog } from './hooks/use-delete-conversation-dialog.state';
import { useCategories } from '@/features/categories';
import { useStages } from '@/features/stages';

export function ConversationsInboxContainer() {
  const router = useRouter();

  // UI state hooks (no I/O)
  const {
    search,
    status,
    categoryId,
    stageId,
    page,
    pageSize,
    sortBy,
    sortDir,
    handleSearchChange,
    handleStatusChange,
    handleCategoryChange,
    handleStageChange,
    handlePageChange,
    handleSortChange,
  } = useConversationsFilters();

  const { data: categories = [] } = useCategories();
  const { data: stages = [] } = useStages();

  const createMutation = useCreateConversation();
  const deleteMutation = useDeleteConversation();

  const createDialog = useCreateConversationDialog(async (values) => {
    await createMutation.mutateAsync({
      contactName: values.contactName,
      contactCompany: values.contactCompany || undefined,
      channel: values.channel,
      pastedText: values.pastedText,
      priority: 'medium',
      firstMessageSender: values.firstMessageSender,
    });
    // Close the dialog after successful creation
    createDialog.close();
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
      availableCategories={categories}
      availableStages={stages}
      onCategoryChange={handleCategoryChange}
      onStageChange={handleStageChange}
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
      onOpenDelete={deleteDialog.open}
      isDeleteDialogOpen={deleteDialog.isOpen}
      deleteConversationContactName={deleteDialog.contactName}
      onCloseDeleteDialog={deleteDialog.close}
      onConfirmDelete={handleConfirmDelete}
      isDeleting={deleteMutation.isPending}
    />
  );
}
