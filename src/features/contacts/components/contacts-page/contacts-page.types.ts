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
  primaryPlatform: string | null;
  warmOrCold: 'warm' | 'cold' | null;
  connectionStatus: 'not_connected' | 'request_sent' | 'connected' | null;
  contactType: string;
  sortBy: 'name' | 'company' | 'updatedAt' | 'createdAt';
  sortDir: 'asc' | 'desc';
  availableCategories: Category[];
  availableStages: Stage[];
  strategies: Array<{ id: string; title: string; description: string }>;
  companies: Array<{ id: string; name: string }>;
  formatDateForInput: (dateStr: string | null | undefined) => string;
  onDateChange: (field: keyof ContactFormValues, value: string) => void;
  config: typeof CONTACTS_PAGE_CONFIG;
  onSearchChange: (value: string) => void;
  onCompanyChange: (value: string) => void;
  onPlatformChange: (value: string | null) => void;
  onWarmOrColdChange: (value: 'warm' | 'cold' | null) => void;
  onConnectionStatusChange: (value: 'not_connected' | 'request_sent' | 'connected' | null) => void;
  onContactTypeChange: (value: string) => void;
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
  showImportButton: boolean;
}

