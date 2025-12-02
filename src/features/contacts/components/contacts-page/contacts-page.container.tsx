'use client';

import { useRouter } from 'next/navigation';
import { ContactsPageView } from './contacts-page.view';
import { useContactsList } from '../../services/contacts.queries';
import { useCreateContact, useUpdateContact, useDeleteContact } from '../../services/contacts.mutations';
import { CONTACTS_PAGE_CONFIG } from './contacts-page.config';
import { useContactsFilters } from './hooks/use-contacts-filters.state';
import { useContactDialog } from './hooks/use-contact-dialog.state';
import { useDeleteContactDialog } from './hooks/use-delete-contact-dialog.state';
import { useCategories } from '@/features/categories';
import { useStages } from '@/features/stages';
import type { ContactListItem } from '../../services/contacts.service';

export function ContactsPageContainer() {
  const router = useRouter();

  // UI state hooks (no I/O)
  const {
    search,
    company,
    categoryId,
    stageId,
    primaryPlatform,
    page,
    pageSize,
    sortBy,
    sortDir,
    handleSearchChange,
    handleCompanyChange,
    handleCategoryChange,
    handleStageChange,
    handlePlatformChange,
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
    // Explicitly check if we're editing or creating
    if (editingContact && editingContact.id) {
      // Edit existing contact - use PATCH
      await updateMutation.mutateAsync({
        id: editingContact.id,
        payload: {
          name: values.name,
          headlineOrRole: values.headlineOrRole || null,
          company: values.company || null,
          primaryPlatform: values.primaryPlatform || null,
          tags: values.tags || [],
          categoryId: values.categoryId || null,
          stageId: values.stageId || null,
        },
      });
    } else {
      // Create new contact - use POST
      await createMutation.mutateAsync({
        name: values.name,
        headlineOrRole: values.headlineOrRole || null,
        company: values.company || null,
        primaryPlatform: values.primaryPlatform || null,
        tags: values.tags || [],
        categoryId: values.categoryId || null,
        stageId: values.stageId || null,
      });
    }
    contactDialog.close();
  });

  // Delete dialog
  const deleteDialog = useDeleteContactDialog();

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
    categoryId: categoryId || undefined,
    stageId: stageId || undefined,
    primaryPlatform: primaryPlatform || undefined,
    page,
    pageSize,
    sortBy,
    sortDir,
  });

  const handleRowClick = (contactId: string) => {
    // Navigate to the first conversation for this contact, or create a new one
    // For now, we'll navigate to conversations and filter by contact
    router.push(`/conversations?contactId=${contactId}`);
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
      categoryId={categoryId}
      stageId={stageId}
      primaryPlatform={primaryPlatform}
      sortBy={sortBy}
      sortDir={sortDir}
      availableCategories={categories}
      availableStages={stages}
      config={CONTACTS_PAGE_CONFIG}
      onSearchChange={handleSearchChange}
      onCompanyChange={handleCompanyChange}
      onCategoryChange={handleCategoryChange}
      onStageChange={handleStageChange}
      onPlatformChange={handlePlatformChange}
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
    />
  );
}
