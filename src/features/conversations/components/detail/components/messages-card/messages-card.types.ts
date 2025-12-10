import type { ConversationDetail } from '../../../../services/conversations.service';
import type { CONVERSATION_DETAIL_CONFIG } from '../../conversation-detail.config';

export type MessagesCardProps = {
  messages: ConversationDetail['messages'];
  contacts: ConversationDetail['contacts'];
  config: typeof CONVERSATION_DETAIL_CONFIG;
  onOpenAddReply: () => void;
  onConfirmMessage?: (messageId: string) => void;
  onEditMessage?: (messageId: string) => void;
  onDeleteMessage?: (messageId: string) => void;
};

