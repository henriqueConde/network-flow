import type { CONVERSATION_DETAIL_CONFIG } from '../conversation-detail.config';

export type OutOfSyncBannerProps = {
  snippet: string | null;
  config: typeof CONVERSATION_DETAIL_CONFIG;
  onPasteNewMessages: () => void;
};


