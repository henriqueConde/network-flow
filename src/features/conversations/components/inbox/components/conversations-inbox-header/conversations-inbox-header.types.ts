import type { CONVERSATIONS_INBOX_CONFIG } from '../../conversations-inbox.config';

export interface ConversationsInboxHeaderProps {
  config: typeof CONVERSATIONS_INBOX_CONFIG;
  onOpenCreate: () => void;
}



