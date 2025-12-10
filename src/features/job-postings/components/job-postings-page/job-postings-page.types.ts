import type { JobPostingListItem } from '../../services/job-postings.service';
import type { JOB_POSTINGS_PAGE_CONFIG } from './job-postings-page.config';
import type { JobPostingFormValues } from './job-postings-page.schema';

export interface JobPostingsPageViewProps {
  jobPostings: JobPostingListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  search: string;
  source: 'linkedin_post' | 'linkedin_job' | 'other' | null;
  companyId: string | null;
  outreachDone: boolean | null;
  sortBy: 'jobTitle' | 'postedAt' | 'updatedAt' | 'createdAt';
  sortDir: 'asc' | 'desc';
  config: typeof JOB_POSTINGS_PAGE_CONFIG;
  onSearchChange: (value: string) => void;
  onSourceChange: (value: 'linkedin_post' | 'linkedin_job' | 'other' | null) => void;
  onCompanyIdChange: (value: string | null) => void;
  onOutreachDoneChange: (value: boolean | null) => void;
  onPageChange: (page: number) => void;
  onSortChange: (sortBy: 'jobTitle' | 'postedAt' | 'updatedAt' | 'createdAt', sortDir: 'asc' | 'desc') => void;
  onRowClick: (jobPostingId: string) => void;
  // Create/Edit dialog
  isDialogOpen: boolean;
  isEditing: boolean;
  dialogValues: JobPostingFormValues;
  dialogErrors: Partial<Record<keyof JobPostingFormValues, string>>;
  onOpenCreate: () => void;
  onOpenEdit: (jobPosting: JobPostingListItem) => void;
  onCloseDialog: () => void;
  onChangeDialogField: (field: keyof JobPostingFormValues, value: JobPostingFormValues[keyof JobPostingFormValues]) => void;
  onSubmitDialog: () => void;
  isSubmitting: boolean;
  // Delete dialog
  isDeleteDialogOpen: boolean;
  deleteJobPostingTitle: string;
  onOpenDelete: (jobPosting: JobPostingListItem) => void;
  onCloseDeleteDialog: () => void;
  onConfirmDelete: () => void;
  isDeleting: boolean;
}


