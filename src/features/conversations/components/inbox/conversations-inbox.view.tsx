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
  emailStatus,
  availableCategories,
  availableStages,
  availableChallenges,
  config,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onStageChange,
  onEmailStatusChange,
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
  onContactsSelect,
  contacts,
  contactOptions,
  allContactOptions,
  contactSearchInputTrimmed,
  onContactScroll,
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
        emailStatus={emailStatus}
        availableCategories={availableCategories}
        availableStages={availableStages}
        config={config}
        onSearchChange={onSearchChange}
        onStatusChange={onStatusChange}
        onCategoryChange={onCategoryChange}
        onStageChange={onStageChange}
        onEmailStatusChange={onEmailStatusChange}
      />

      {isLoading && (
        <Box sx={styles.loadingState()}>
          <CircularProgress />
        </Box>
      )}

      {error && !isLoading && (
        <Box sx={styles.errorState()}>
          <Alert severity="error">{error}</Alert>
        </Box>
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

      <Box sx={styles.paginationContainer()}>
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
        onContactsSelect={onContactsSelect}
        contacts={contacts}
        contactOptions={contactOptions}
        allContactOptions={allContactOptions}
        contactSearchInputTrimmed={contactSearchInputTrimmed}
        onContactScroll={onContactScroll}
        isSearchingContacts={isSearchingContacts}
        opportunitySearchInput={opportunitySearchInput}
        onOpportunitySearchChange={onOpportunitySearchChange}
        onOpportunitySelect={onOpportunitySelect}
        opportunities={opportunities}
        isSearchingOpportunities={isSearchingOpportunities}
        availableCategories={availableCategories}
        availableStages={availableStages}
        availableChallenges={availableChallenges}
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


