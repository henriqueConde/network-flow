import type { ContactListItem } from '../../../../services/contacts.service';
import type { CONTACTS_PAGE_CONFIG } from '../../contacts-page.config';
import type { Category } from '@/features/categories';
import type { Stage } from '@/features/stages';

export type ContactsTableProps = {
  contacts: ContactListItem[];
  totalPages: number;
  page: number;
  isLoading: boolean;
  sortBy: 'name' | 'company' | 'updatedAt' | 'createdAt';
  sortDir: 'asc' | 'desc';
  availableCategories: Category[];
  availableStages: Stage[];
  config: typeof CONTACTS_PAGE_CONFIG;
  onSortChange: (sortBy: 'name' | 'company' | 'updatedAt' | 'createdAt', sortDir: 'asc' | 'desc') => void;
  onPageChange: (page: number) => void;
  onRowClick: (contactId: string) => void;
  onOpenEdit: (contact: ContactListItem) => void;
  onOpenDelete: (contact: ContactListItem) => void;
};



