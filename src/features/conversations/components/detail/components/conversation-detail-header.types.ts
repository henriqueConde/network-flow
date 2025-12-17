import type { CONVERSATION_DETAIL_CONFIG } from '../conversation-detail.config';

export type ConversationDetailHeaderProps = {
  contactName: string;
  contactCompany: string | null;
  isOutOfSync: boolean;
  config: typeof CONVERSATION_DETAIL_CONFIG;
  onBack: () => void;
};





