import type { ConversationInboxItem } from '../../../../services/conversations.service';

export interface ConversationTableRowProps {
  conversation: ConversationInboxItem;
  onRowClick: (conversationId: string) => void;
  onOpenDelete: (conversationId: string, contactName: string) => void;
}

