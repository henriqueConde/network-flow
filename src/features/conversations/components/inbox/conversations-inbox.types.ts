import type { ConversationInboxItem } from '../../services/conversations.service';
import type { CONVERSATIONS_INBOX_CONFIG } from './conversations-inbox.config';
import type { CreateConversationFormValues } from './conversations-inbox.schema';
import type { Category } from '@/features/categories';
import type { Stage } from '@/features/stages';
import type { CREATE_CONVERSATION_DIALOG_CONFIG } from './components/create-conversation-dialog/create-conversation-dialog.config';
import type { ContactListItem } from '@/features/contacts/services/contacts.service';
export type { CreateConversationFormValues } from './conversations-inbox.schema';

export type ConversationsInboxFilterStatus = 'all' | 'needs_attention' | 'waiting_on_them';

export interface ConversationsInboxViewProps {
  conversations: ConversationInboxItem[];
  isLoading: boolean;
  error: string | null;
  search: string;
  page: number;
  sortBy: 'updatedAt' | 'lastMessageAt' | 'priority';
  sortDir: 'asc' | 'desc';
  status: ConversationsInboxFilterStatus;
  categoryId: string | null;
  stageId: string | null;
  availableCategories: Category[];
  availableStages: Stage[];
  config: typeof CONVERSATIONS_INBOX_CONFIG;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ConversationsInboxFilterStatus) => void;
  onCategoryChange: (value: string | null) => void;
  onStageChange: (value: string | null) => void;
  onPageChange: (page: number) => void;
  onSortChange: (sortBy: 'updatedAt' | 'lastMessageAt' | 'priority', sortDir: 'asc' | 'desc') => void;
  onRowClick: (conversationId: string) => void;

  // Create dialog
  isCreateOpen: boolean;
  onOpenCreate: () => void;
  onCloseCreate: () => void;
  createValues: CreateConversationFormValues;
  createErrors: Partial<Record<keyof CreateConversationFormValues, string>>;
  onChangeCreateField: (
    field: keyof CreateConversationFormValues,
    value: CreateConversationFormValues[keyof CreateConversationFormValues],
  ) => void;
  onSubmitCreate: () => void;
  isCreating: boolean;
  createDialogConfig: typeof CREATE_CONVERSATION_DIALOG_CONFIG;
  contactSearchInput: string;
  onContactSearchChange: (value: string) => void;
  onContactSelect: (contactId: string | null, contactName: string, contactCompany?: string | null) => void;
  contacts: ContactListItem[];
  isSearchingContacts: boolean;
  opportunitySearchInput: string;
  onOpportunitySearchChange: (value: string) => void;
  onOpportunitySelect: (opportunityId: string | null) => void;
  opportunities: import('@/features/opportunities/services/opportunities.service').OpportunityListItem[];
  isSearchingOpportunities: boolean;
  // Delete dialog
  onOpenDelete: (conversationId: string, contactName: string) => void;
  isDeleteDialogOpen: boolean;
  deleteConversationContactName: string;
  onCloseDeleteDialog: () => void;
  onConfirmDelete: () => void;
  isDeleting: boolean;
}


