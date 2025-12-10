import type { CompanyListItem } from '../../services/companies.service';
import type { COMPANIES_PAGE_CONFIG } from './companies-page.config';
import type { CompanyFormValues } from './companies-page.schema';

export interface CompaniesPageViewProps {
  companies: CompanyListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  search: string;
  industry: string;
  fundingRound: string | null;
  hasRelevantRole: boolean | null;
  applied: boolean | null;
  sortBy: 'name' | 'fundingDate' | 'updatedAt' | 'createdAt';
  sortDir: 'asc' | 'desc';
  config: typeof COMPANIES_PAGE_CONFIG;
  onSearchChange: (value: string) => void;
  onIndustryChange: (value: string) => void;
  onFundingRoundChange: (value: string | null) => void;
  onHasRelevantRoleChange: (value: boolean | null) => void;
  onAppliedChange: (value: boolean | null) => void;
  onPageChange: (page: number) => void;
  onSortChange: (sortBy: 'name' | 'fundingDate' | 'updatedAt' | 'createdAt', sortDir: 'asc' | 'desc') => void;
  onRowClick: (companyId: string) => void;
  // Create/Edit dialog
  isDialogOpen: boolean;
  isEditing: boolean;
  dialogValues: CompanyFormValues;
  dialogErrors: Partial<Record<keyof CompanyFormValues, string>>;
  onOpenCreate: () => void;
  onOpenEdit: (company: CompanyListItem) => void;
  onCloseDialog: () => void;
  onChangeDialogField: (field: keyof CompanyFormValues, value: CompanyFormValues[keyof CompanyFormValues]) => void;
  onSubmitDialog: () => void;
  isSubmitting: boolean;
  // Delete dialog
  isDeleteDialogOpen: boolean;
  deleteCompanyName: string;
  onOpenDelete: (company: CompanyListItem) => void;
  onCloseDeleteDialog: () => void;
  onConfirmDelete: () => void;
  isDeleting: boolean;
}


