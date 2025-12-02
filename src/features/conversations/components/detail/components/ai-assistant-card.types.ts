import type { CONVERSATION_DETAIL_CONFIG } from '../conversation-detail.config';

export type AiAssistantCardProps = {
  aiAnalysis?: {
    summary?: string;
    suggestedReply?: string;
    suggestedNextAction?: string;
    suggestedNextActionDueAt?: string;
    isLoading?: boolean;
    error?: string;
  };
  hasExistingSummary: boolean;
  config: typeof CONVERSATION_DETAIL_CONFIG;
  onRequestAnalysis?: () => void;
  onRegenerateReply?: () => void;
};

