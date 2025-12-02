import type { CONVERSATION_DETAIL_CONFIG } from '../conversation-detail.config';

export type ErrorViewProps = {
  error: string | null;
  isNotFound?: boolean;
  config: typeof CONVERSATION_DETAIL_CONFIG;
  onBack: () => void;
};



