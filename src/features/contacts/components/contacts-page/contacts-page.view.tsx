'use client';

import { Box, Alert } from '@mui/material';
import type { ContactsPageViewProps } from './contacts-page.types';
import { styles } from './contacts-page.styles';
import {
  ContactsPageHeader,
  ContactsFilters,
  ContactsTable,
  CreateEditContactDialog,
  DeleteContactDialog,
  ImportLinkedInDialog,
} from './components';

export function ContactsPageView({
  contacts,
  totalPages,
  page,
  isLoading,
  error,
  search,
  company,
  categoryId,
  stageId,
  primaryPlatform,
  warmOrCold,
  connectionStatus,
  contactType,
  sortBy,
  sortDir,
  availableCategories,
  availableStages,
  config,
  onSearchChange,
  onCompanyChange,
  onCategoryChange,
  onStageChange,
  onPlatformChange,
  onWarmOrColdChange,
  onConnectionStatusChange,
  onContactTypeChange,
  onPageChange,
  onSortChange,
  onRowClick,
  isDialogOpen,
  isEditing,
  dialogValues,
  dialogErrors,
  onOpenCreate,
  onOpenEdit,
  onCloseDialog,
  onChangeDialogField,
  onSubmitDialog,
  isSubmitting,
  isDeleteDialogOpen,
  deleteContactName,
  onOpenDelete,
  onCloseDeleteDialog,
  onConfirmDelete,
  isDeleting,
  isImportDialogOpen,
  importProgress,
  importError,
  onStartImport,
  onCloseImportDialog,
  isImporting,
}: ContactsPageViewProps) {
  return (
    <Box sx={styles.container()}>
      <ContactsPageHeader
        config={config}
        onOpenCreate={onOpenCreate}
        onStartImport={onStartImport}
        isImporting={isImporting}
      />

      <ContactsFilters
        search={search}
        company={company}
        categoryId={categoryId}
        stageId={stageId}
        primaryPlatform={primaryPlatform}
        warmOrCold={warmOrCold}
        connectionStatus={connectionStatus}
        contactType={contactType}
        availableCategories={availableCategories}
        availableStages={availableStages}
        config={config}
        onSearchChange={onSearchChange}
        onCompanyChange={onCompanyChange}
        onCategoryChange={onCategoryChange}
        onStageChange={onStageChange}
        onPlatformChange={onPlatformChange}
        onWarmOrColdChange={onWarmOrColdChange}
        onConnectionStatusChange={onConnectionStatusChange}
        onContactTypeChange={onContactTypeChange}
      />

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2, flexShrink: 0 }}>
          {error}
        </Alert>
      )}

      <ContactsTable
        contacts={contacts}
        totalPages={totalPages}
        page={page}
        isLoading={isLoading}
        sortBy={sortBy}
        sortDir={sortDir}
        availableCategories={availableCategories}
        availableStages={availableStages}
        config={config}
        onSortChange={onSortChange}
        onPageChange={onPageChange}
        onRowClick={onRowClick}
        onOpenEdit={onOpenEdit}
        onOpenDelete={onOpenDelete}
      />

      <CreateEditContactDialog
        isOpen={isDialogOpen}
        isEditing={isEditing}
        values={dialogValues}
        errors={dialogErrors}
        isSubmitting={isSubmitting}
        availableCategories={availableCategories}
        availableStages={availableStages}
        config={config}
        onClose={onCloseDialog}
        onChangeField={onChangeDialogField}
        onSubmit={onSubmitDialog}
      />

      <DeleteContactDialog
        isOpen={isDeleteDialogOpen}
        contactName={deleteContactName}
        isDeleting={isDeleting}
        config={config}
        onClose={onCloseDeleteDialog}
        onConfirm={onConfirmDelete}
      />

      <ImportLinkedInDialog
        isOpen={isImportDialogOpen}
        importProgress={importProgress}
        importError={importError}
        isImporting={isImporting}
        config={config}
        onClose={onCloseImportDialog}
      />
    </Box>
  );
}
