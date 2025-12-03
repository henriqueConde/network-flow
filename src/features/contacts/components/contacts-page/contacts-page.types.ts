import type { ContactListItem } from '../../services/contacts.service';
import type { CONTACTS_PAGE_CONFIG } from './contacts-page.config';
import type { Category } from '@/features/categories';
import type { Stage } from '@/features/stages';
import type { ContactFormValues } from './contacts-page.schema';

export interface ContactsPageViewProps {
  contacts: ContactListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  search: string;
  company: string;
  categoryId: string | null;
  stageId: string | null;
  primaryPlatform: string | null;
  sortBy: 'name' | 'company' | 'updatedAt' | 'createdAt';
  sortDir: 'asc' | 'desc';
  availableCategories: Category[];
  availableStages: Stage[];
  config: typeof CONTACTS_PAGE_CONFIG;
  onSearchChange: (value: string) => void;
  onCompanyChange: (value: string) => void;
  onCategoryChange: (value: string | null) => void;
  onStageChange: (value: string | null) => void;
  onPlatformChange: (value: string | null) => void;
  onPageChange: (page: number) => void;
  onSortChange: (sortBy: 'name' | 'company' | 'updatedAt' | 'createdAt', sortDir: 'asc' | 'desc') => void;
  onRowClick: (contactId: string) => void;
  // Create/Edit dialog
  isDialogOpen: boolean;
  isEditing: boolean;
  dialogValues: ContactFormValues;
  dialogErrors: Partial<Record<keyof ContactFormValues, string>>;
  onOpenCreate: () => void;
  onOpenEdit: (contact: ContactListItem) => void;
  onCloseDialog: () => void;
  onChangeDialogField: (field: keyof ContactFormValues, value: ContactFormValues[keyof ContactFormValues]) => void;
  onSubmitDialog: () => void;
  isSubmitting: boolean;
  // Delete dialog
  isDeleteDialogOpen: boolean;
  deleteContactName: string;
  onOpenDelete: (contact: ContactListItem) => void;
  onCloseDeleteDialog: () => void;
  onConfirmDelete: () => void;
  isDeleting: boolean;
  // Import LinkedIn dialog
  isImportDialogOpen: boolean;
  importProgress: {
    total: number;
    processed: number;
    created: number;
    skipped: number;
    currentContact?: {
      name: string;
      status: 'processing' | 'created' | 'skipped';
    };
  } | null;
  importError: string | null;
  onStartImport: () => void;
  onCloseImportDialog: () => void;
  isImporting: boolean;
}

