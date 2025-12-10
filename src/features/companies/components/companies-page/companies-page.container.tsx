'use client';

import { useRouter } from 'next/navigation';
import { CompaniesPageView } from './companies-page.view';
import { useCompaniesList } from '../../services/companies.queries';
import { useCreateCompany, useUpdateCompany, useDeleteCompany } from '../../services/companies.mutations';
import { COMPANIES_PAGE_CONFIG } from './companies-page.config';
import { useCompaniesFilters } from './hooks/use-companies-filters.state';
import { useCompanyDialog } from './hooks/use-company-dialog.state';
import { useDeleteCompanyDialog } from './hooks/use-delete-company-dialog.state';
import type { CompanyListItem } from '../../services/companies.service';

export function CompaniesPageContainer() {
  const router = useRouter();

  // UI state hooks (no I/O)
  const {
    search,
    industry,
    fundingRound,
    hasRelevantRole,
    applied,
    page,
    pageSize,
    sortBy,
    sortDir,
    handleSearchChange,
    handleIndustryChange,
    handleFundingRoundChange,
    handleHasRelevantRoleChange,
    handleAppliedChange,
    handlePageChange,
    handleSortChange,
  } = useCompaniesFilters();

  // Mutations
  const createMutation = useCreateCompany();
  const updateMutation = useUpdateCompany();
  const deleteMutation = useDeleteCompany();

  // Create/Edit dialog
  const companyDialog = useCompanyDialog(async (values, editingCompany) => {
    if (editingCompany && editingCompany.id) {
      // Edit existing company
      await updateMutation.mutateAsync({
        id: editingCompany.id,
        payload: {
          name: values.name,
          industry: values.industry || undefined,
          fundingRound: values.fundingRound || undefined,
          fundingDate: values.fundingDate || undefined,
          fundingSource: values.fundingSource || undefined,
          careersPageUrl: values.careersPageUrl || undefined,
          hasRelevantRole: values.hasRelevantRole,
          roleTitle: values.roleTitle || undefined,
          applied: values.applied,
          applicationDate: values.applicationDate || undefined,
          notes: values.notes || undefined,
        },
      });
    } else {
      // Create new company
      await createMutation.mutateAsync({
        name: values.name,
        industry: values.industry || undefined,
        fundingRound: values.fundingRound || undefined,
        fundingDate: values.fundingDate || undefined,
        fundingSource: values.fundingSource || undefined,
        careersPageUrl: values.careersPageUrl || undefined,
        hasRelevantRole: values.hasRelevantRole,
        roleTitle: values.roleTitle || undefined,
        applied: values.applied,
        applicationDate: values.applicationDate || undefined,
        notes: values.notes || undefined,
      });
    }
    companyDialog.close();
  });

  // Delete dialog
  const deleteDialog = useDeleteCompanyDialog();

  const handleConfirmDelete = async () => {
    if (deleteDialog.companyId) {
      await deleteMutation.mutateAsync(deleteDialog.companyId);
      deleteDialog.close();
    }
  };

  // Data fetching
  const {
    data,
    isLoading,
    error,
  } = useCompaniesList({
    search: search || undefined,
    industry: industry || undefined,
    fundingRound: fundingRound || undefined,
    hasRelevantRole: hasRelevantRole ?? undefined,
    applied: applied ?? undefined,
    page,
    pageSize,
    sortBy,
    sortDir,
  });

  const handleRowClick = (companyId: string) => {
    router.push(`/companies/${companyId}`);
  };

  const handleOpenCreate = () => {
    companyDialog.open();
  };

  const handleOpenEdit = (company: CompanyListItem) => {
    companyDialog.open(company);
  };

  const handleOpenDelete = (company: CompanyListItem) => {
    deleteDialog.open(company.id, company.name);
  };

  return (
    <CompaniesPageView
      companies={data?.companies || []}
      total={data?.total || 0}
      page={data?.page || 1}
      pageSize={data?.pageSize || pageSize}
      totalPages={data?.totalPages || 0}
      isLoading={isLoading}
      error={error ? 'Failed to load companies. Please try again.' : null}
      search={search}
      industry={industry}
      fundingRound={fundingRound}
      hasRelevantRole={hasRelevantRole}
      applied={applied}
      sortBy={sortBy}
      sortDir={sortDir}
      config={COMPANIES_PAGE_CONFIG}
      onSearchChange={handleSearchChange}
      onIndustryChange={handleIndustryChange}
      onFundingRoundChange={handleFundingRoundChange}
      onHasRelevantRoleChange={handleHasRelevantRoleChange}
      onAppliedChange={handleAppliedChange}
      onPageChange={handlePageChange}
      onSortChange={handleSortChange}
      onRowClick={handleRowClick}
      isDialogOpen={companyDialog.isOpen}
      isEditing={!!companyDialog.editingCompany}
      dialogValues={companyDialog.values}
      dialogErrors={companyDialog.errors}
      onOpenCreate={handleOpenCreate}
      onOpenEdit={handleOpenEdit}
      onCloseDialog={companyDialog.close}
      onChangeDialogField={companyDialog.changeField}
      onSubmitDialog={companyDialog.submit}
      isSubmitting={createMutation.isPending || updateMutation.isPending}
      isDeleteDialogOpen={deleteDialog.isOpen}
      deleteCompanyName={deleteDialog.companyName}
      onOpenDelete={handleOpenDelete}
      onCloseDeleteDialog={deleteDialog.close}
      onConfirmDelete={handleConfirmDelete}
      isDeleting={deleteMutation.isPending}
    />
  );
}


