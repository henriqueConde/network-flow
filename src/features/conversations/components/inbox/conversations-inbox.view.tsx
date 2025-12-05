'use client';

import { Box, CircularProgress, Alert, Pagination } from '@mui/material';
import type { ConversationsInboxViewProps } from './conversations-inbox.types';
import { styles } from './conversations-inbox.styles';
import {
  ConversationsInboxHeader,
  ConversationsInboxFilters,
  ConversationsTable,
  CreateConversationDialog,
  DeleteConversationDialog,
} from './components';

export function ConversationsInboxView({
  conversations,
  isLoading,
  error,
  search,
  page,
  sortBy,
  sortDir,
  status,
  categoryId,
  stageId,
  availableCategories,
  availableStages,
  config,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onStageChange,
  onPageChange,
  onSortChange,
  onRowClick,
  onOpenCreate,
  isCreateOpen,
  onCloseCreate,
  onSubmitCreate,
  createValues,
  createErrors,
  onChangeCreateField,
  isCreating,
  createDialogConfig,
  contactSearchInput,
  onContactSearchChange,
  onContactSelect,
  contacts,
  isSearchingContacts,
  opportunitySearchInput,
  onOpportunitySearchChange,
  onOpportunitySelect,
  opportunities,
  isSearchingOpportunities,
  onOpenDelete,
  isDeleteDialogOpen,
  deleteConversationContactName,
  onCloseDeleteDialog,
  onConfirmDelete,
  isDeleting,
}: ConversationsInboxViewProps) {
  return (
    <Box sx={styles.container()}>
      <ConversationsInboxHeader config={config} onOpenCreate={onOpenCreate} />

      <ConversationsInboxFilters
        search={search}
        status={status}
        categoryId={categoryId}
        stageId={stageId}
        availableCategories={availableCategories}
        availableStages={availableStages}
        config={config}
        onSearchChange={onSearchChange}
        onStatusChange={onStatusChange}
        onCategoryChange={onCategoryChange}
        onStageChange={onStageChange}
      />

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && !isLoading && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!isLoading && !error && (
        <Box sx={styles.tableCard()}>
          <ConversationsTable
            conversations={conversations}
            sortBy={sortBy}
            sortDir={sortDir}
            config={config}
            onSortChange={onSortChange}
            onRowClick={onRowClick}
            onOpenDelete={onOpenDelete}
          />
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Pagination
          page={page}
          onChange={(_, value) => onPageChange(value)}
          count={page + 1}
          color="primary"
        />
      </Box>

      <CreateConversationDialog
        isOpen={isCreateOpen}
        onClose={onCloseCreate}
        values={createValues}
        errors={createErrors}
        onChangeField={onChangeCreateField}
        onSubmit={onSubmitCreate}
        isCreating={isCreating}
        config={createDialogConfig}
        contactSearchInput={contactSearchInput}
        onContactSearchChange={onContactSearchChange}
        onContactSelect={onContactSelect}
        contacts={contacts}
        isSearchingContacts={isSearchingContacts}
        opportunitySearchInput={opportunitySearchInput}
        onOpportunitySearchChange={onOpportunitySearchChange}
        onOpportunitySelect={onOpportunitySelect}
        opportunities={opportunities}
        isSearchingOpportunities={isSearchingOpportunities}
      />

      <DeleteConversationDialog
        isOpen={isDeleteDialogOpen}
        onClose={onCloseDeleteDialog}
        contactName={deleteConversationContactName}
        onConfirm={onConfirmDelete}
        isDeleting={isDeleting}
      />
    </Box>
  );
}


