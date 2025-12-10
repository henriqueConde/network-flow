import type { CONVERSATION_DETAIL_CONFIG } from '../../conversation-detail.config';

export type ConversationDetailHeaderProps = {
  contactId: string;
  contactName: string;
  contactCompany: string | null;
  opportunityId: string | null;
  opportunityTitle: string | null;
  isOutOfSync: boolean;
  config: typeof CONVERSATION_DETAIL_CONFIG;
  onBack: () => void;
  onViewContact: (contactId: string) => void;
  onViewOpportunity: (opportunityId: string) => void;
  autoFollowupsEnabled: boolean;
  onToggleAutoFollowups: (enabled: boolean) => void;
};

