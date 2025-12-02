import type { ConversationInboxItem } from '../../services/conversations.service';
import type { CONVERSATIONS_INBOX_CONFIG } from './conversations-inbox.config';
import type { CreateConversationFormValues } from './conversations-inbox.schema';
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
  config: typeof CONVERSATIONS_INBOX_CONFIG;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ConversationsInboxFilterStatus) => void;
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
}


