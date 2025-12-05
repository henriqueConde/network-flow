import type { ContactDetail } from '../../../../services/contacts.service';
import type { CONTACT_DETAIL_CONFIG } from '../../contact-detail-page.config';

export type ConversationsCardProps = {
  conversations: ContactDetail['conversations'];
  config: typeof CONTACT_DETAIL_CONFIG;
  onGoToConversation: (conversationId: string) => void;
  onStartConversation: () => void;
};

