import type { ConversationInboxItem } from '../../../../services/conversations.service';
import type { CONVERSATIONS_INBOX_CONFIG } from '../../conversations-inbox.config';

export interface ConversationsTableProps {
  conversations: ConversationInboxItem[];
  sortBy: 'updatedAt' | 'lastMessageAt' | 'priority';
  sortDir: 'asc' | 'desc';
  config: typeof CONVERSATIONS_INBOX_CONFIG;
  onSortChange: (sortBy: 'updatedAt' | 'lastMessageAt' | 'priority', sortDir: 'asc' | 'desc') => void;
  onRowClick: (conversationId: string) => void;
  onOpenDelete: (conversationId: string, contactName: string) => void;
}

