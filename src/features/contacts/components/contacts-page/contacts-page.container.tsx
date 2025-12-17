'use client';

import { useRouter } from 'next/navigation';
import { ContactsPageView } from './contacts-page.view';
import { useContactsList } from '../../services/contacts.queries';
import { useCreateContact, useUpdateContact, useDeleteContact } from '../../services/contacts.mutations';
import { CONTACTS_PAGE_CONFIG } from './contacts-page.config';
import { useContactsFilters } from './hooks/use-contacts-filters.state';
import { useContactDialog } from './hooks/use-contact-dialog.state';
import { useDeleteContactDialog } from './hooks/use-delete-contact-dialog.state';
import { useLinkedInImport } from './hooks/use-linkedin-import.state';
import { useCategories } from '@/features/categories';
import { useStages } from '@/features/stages';
import { useAuthContext } from '@/features/auth';
import type { ContactListItem } from '../../services/contacts.service';

export function ContactsPageContainer() {
  const router = useRouter();
  const { email } = useAuthContext();
  const isAdmin = email === 'henriquepenaconde@gmail.com';

  // UI state hooks (no I/O)
  const {
    search,
    company,
    primaryPlatform,
    warmOrCold,
    connectionStatus,
    contactType,
    page,
    pageSize,
    sortBy,
    sortDir,
    handleSearchChange,
    handleCompanyChange,
    handlePlatformChange,
    handleWarmOrColdChange,
    handleConnectionStatusChange,
    handleContactTypeChange,
    handlePageChange,
    handleSortChange,
  } = useContactsFilters();

  const { data: categories = [] } = useCategories();
  const { data: stages = [] } = useStages();

  // Mutations
  const createMutation = useCreateContact();
  const updateMutation = useUpdateContact();
  const deleteMutation = useDeleteContact();

  // Create/Edit dialog
  const contactDialog = useContactDialog(async (values, editingContact) => {
    // Helper to convert empty strings to null for optional fields
    const toNullIfEmpty = (val: string | null | undefined) => (val === '' ? null : val);
    const toNullIfEmptyDate = (val: string | null | undefined) => {
      if (!val || val === '') return null;
      try {
        // Validate it's a valid ISO date string
        new Date(val);
        return val;
      } catch {
        return null;
      }
    };

    const basePayload = {
      name: values.name,
      headlineOrRole: toNullIfEmpty(values.headlineOrRole) || null,
      company: toNullIfEmpty(values.company) || null,
      companyId: values.companyId || null,
      primaryPlatform: toNullIfEmpty(values.primaryPlatform) || null,
      tags: values.tags || [],
      email: toNullIfEmpty(values.email) || null,
      warmOrCold: values.warmOrCold || null,
      commonGround: toNullIfEmpty(values.commonGround) || null,
      firstMessageDate: toNullIfEmptyDate(values.firstMessageDate) || null,
      referralGiven: values.referralGiven || false,
      referralGivenAt: toNullIfEmptyDate(values.referralGivenAt) || null,
      referralDetails: toNullIfEmpty(values.referralDetails) || null,
      connectionRequestSentAt: toNullIfEmptyDate(values.connectionRequestSentAt) || null,
      connectionAcceptedAt: toNullIfEmptyDate(values.connectionAcceptedAt) || null,
      connectionStatus: values.connectionStatus || null,
      dmSentAt: toNullIfEmptyDate(values.dmSentAt) || null,
      lastFollowUpAt: toNullIfEmptyDate(values.lastFollowUpAt) || null,
      contactType: toNullIfEmpty(values.contactType) || null,
      strategyIds: values.strategyIds || [],
    };

    // Explicitly check if we're editing or creating
    if (editingContact && editingContact.id) {
      // Edit existing contact - use PATCH
      await updateMutation.mutateAsync({
        id: editingContact.id,
        payload: basePayload,
      });
    } else {
      // Create new contact - use POST
      await createMutation.mutateAsync(basePayload);
    }
    contactDialog.close();
  });

  // Delete dialog
  const deleteDialog = useDeleteContactDialog();

  // LinkedIn import
  const linkedInImport = useLinkedInImport();

  const handleConfirmDelete = async () => {
    if (deleteDialog.contactId) {
      await deleteMutation.mutateAsync(deleteDialog.contactId);
      deleteDialog.close();
    }
  };

  // Data fetching
  const {
    data,
    isLoading,
    error,
  } = useContactsList({
    search: search || undefined,
    company: company || undefined,
    primaryPlatform: primaryPlatform || undefined,
    warmOrCold: warmOrCold || undefined,
    connectionStatus: connectionStatus || undefined,
    contactType: contactType || undefined,
    page,
    pageSize,
    sortBy,
    sortDir,
  });

  const handleRowClick = (contactId: string) => {
    // Navigate to the contact detail page
    router.push(`/contacts/${contactId}`);
  };

  const handleOpenCreate = () => {
    contactDialog.open(); // Explicitly call with no arguments for create
  };

  const handleOpenEdit = (contact: ContactListItem) => {
    contactDialog.open(contact);
  };

  const handleOpenDelete = (contact: ContactListItem) => {
    deleteDialog.open(contact.id, contact.name);
  };

  return (
    <ContactsPageView
      contacts={data?.contacts || []}
      total={data?.total || 0}
      page={data?.page || 1}
      pageSize={data?.pageSize || pageSize}
      totalPages={data?.totalPages || 0}
      isLoading={isLoading}
      error={error ? 'Failed to load contacts. Please try again.' : null}
      search={search}
      company={company}
      primaryPlatform={primaryPlatform}
      warmOrCold={warmOrCold}
      connectionStatus={connectionStatus}
      contactType={contactType}
      sortBy={sortBy}
      sortDir={sortDir}
      availableCategories={categories}
      availableStages={stages}
      config={CONTACTS_PAGE_CONFIG}
      onSearchChange={handleSearchChange}
      onCompanyChange={handleCompanyChange}
      onPlatformChange={handlePlatformChange}
      onWarmOrColdChange={handleWarmOrColdChange}
      onConnectionStatusChange={handleConnectionStatusChange}
      onContactTypeChange={handleContactTypeChange}
      onPageChange={handlePageChange}
      onSortChange={handleSortChange}
      onRowClick={handleRowClick}
      isDialogOpen={contactDialog.isOpen}
      isEditing={!!contactDialog.editingContact}
      dialogValues={contactDialog.values}
      dialogErrors={contactDialog.errors}
      onOpenCreate={handleOpenCreate}
      onOpenEdit={handleOpenEdit}
      onCloseDialog={contactDialog.close}
      onChangeDialogField={contactDialog.changeField}
      onSubmitDialog={contactDialog.submit}
      isSubmitting={createMutation.isPending || updateMutation.isPending}
      isDeleteDialogOpen={deleteDialog.isOpen}
      deleteContactName={deleteDialog.contactName}
      onOpenDelete={handleOpenDelete}
      onCloseDeleteDialog={deleteDialog.close}
      onConfirmDelete={handleConfirmDelete}
      isDeleting={deleteMutation.isPending}
      isImportDialogOpen={linkedInImport.isOpen}
      importProgress={linkedInImport.progress}
      importError={linkedInImport.error}
      onStartImport={linkedInImport.startImport}
      onCloseImportDialog={linkedInImport.close}
      isImporting={linkedInImport.isImporting}
      showImportButton={isAdmin}
    />
  );
}
