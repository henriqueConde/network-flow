'use client';

import { useRouter } from 'next/navigation';
import { JobPostingsPageView } from './job-postings-page.view';
import { useJobPostingsList } from '../../services/job-postings.queries';
import { useCreateJobPosting, useUpdateJobPosting, useDeleteJobPosting } from '../../services/job-postings.mutations';
import { JOB_POSTINGS_PAGE_CONFIG } from './job-postings-page.config';
import { useJobPostingsFilters } from './hooks/use-job-postings-filters.state';
import { useJobPostingDialog } from './hooks/use-job-posting-dialog.state';
import { useDeleteJobPostingDialog } from './hooks/use-delete-job-posting-dialog.state';
import type { JobPostingListItem } from '../../services/job-postings.service';

export function JobPostingsPageContainer() {
  const router = useRouter();

  const {
    search,
    source,
    companyId,
    outreachDone,
    page,
    pageSize,
    sortBy,
    sortDir,
    handleSearchChange,
    handleSourceChange,
    handleCompanyIdChange,
    handleOutreachDoneChange,
    handlePageChange,
    handleSortChange,
  } = useJobPostingsFilters();

  const createMutation = useCreateJobPosting();
  const updateMutation = useUpdateJobPosting();
  const deleteMutation = useDeleteJobPosting();

  const jobPostingDialog = useJobPostingDialog(async (values, editingJobPosting) => {
    if (editingJobPosting && editingJobPosting.id) {
      await updateMutation.mutateAsync({
        id: editingJobPosting.id,
        payload: {
          companyId: values.companyId || undefined,
          jobTitle: values.jobTitle,
          jobUrl: values.jobUrl,
          postedAt: values.postedAt || undefined,
          applicantsWhenFound: values.applicantsWhenFound || undefined,
          source: values.source,
          outreachDone: values.outreachDone,
          outreachChannels: values.outreachChannels,
          notes: values.notes || undefined,
        },
      });
    } else {
      await createMutation.mutateAsync({
        companyId: values.companyId || undefined,
        jobTitle: values.jobTitle,
        jobUrl: values.jobUrl,
        postedAt: values.postedAt || undefined,
        applicantsWhenFound: values.applicantsWhenFound || undefined,
        source: values.source,
        outreachDone: values.outreachDone,
        outreachChannels: values.outreachChannels,
        notes: values.notes || undefined,
      });
    }
    jobPostingDialog.close();
  });

  const deleteDialog = useDeleteJobPostingDialog();

  const handleConfirmDelete = async () => {
    if (deleteDialog.jobPostingId) {
      await deleteMutation.mutateAsync(deleteDialog.jobPostingId);
      deleteDialog.close();
    }
  };

  const {
    data,
    isLoading,
    error,
  } = useJobPostingsList({
    search: search || undefined,
    source: source || undefined,
    companyId: companyId || undefined,
    outreachDone: outreachDone ?? undefined,
    page,
    pageSize,
    sortBy,
    sortDir,
  });

  const handleRowClick = (jobPostingId: string) => {
    router.push(`/job-postings/${jobPostingId}`);
  };

  const handleOpenCreate = () => {
    jobPostingDialog.open();
  };

  const handleOpenEdit = (jobPosting: JobPostingListItem) => {
    jobPostingDialog.open(jobPosting);
  };

  const handleOpenDelete = (jobPosting: JobPostingListItem) => {
    deleteDialog.open(jobPosting.id, jobPosting.jobTitle);
  };

  return (
    <JobPostingsPageView
      jobPostings={data?.jobPostings || []}
      total={data?.total || 0}
      page={data?.page || 1}
      pageSize={data?.pageSize || pageSize}
      totalPages={data?.totalPages || 0}
      isLoading={isLoading}
      error={error ? 'Failed to load job postings. Please try again.' : null}
      search={search}
      source={source}
      companyId={companyId}
      outreachDone={outreachDone}
      sortBy={sortBy}
      sortDir={sortDir}
      config={JOB_POSTINGS_PAGE_CONFIG}
      onSearchChange={handleSearchChange}
      onSourceChange={handleSourceChange}
      onCompanyIdChange={handleCompanyIdChange}
      onOutreachDoneChange={handleOutreachDoneChange}
      onPageChange={handlePageChange}
      onSortChange={handleSortChange}
      onRowClick={handleRowClick}
      isDialogOpen={jobPostingDialog.isOpen}
      isEditing={!!jobPostingDialog.editingJobPosting}
      dialogValues={jobPostingDialog.values}
      dialogErrors={jobPostingDialog.errors}
      onOpenCreate={handleOpenCreate}
      onOpenEdit={handleOpenEdit}
      onCloseDialog={jobPostingDialog.close}
      onChangeDialogField={jobPostingDialog.changeField}
      onSubmitDialog={jobPostingDialog.submit}
      isSubmitting={createMutation.isPending || updateMutation.isPending}
      isDeleteDialogOpen={deleteDialog.isOpen}
      deleteJobPostingTitle={deleteDialog.jobPostingTitle}
      onOpenDelete={handleOpenDelete}
      onCloseDeleteDialog={deleteDialog.close}
      onConfirmDelete={handleConfirmDelete}
      isDeleting={deleteMutation.isPending}
    />
  );
}



