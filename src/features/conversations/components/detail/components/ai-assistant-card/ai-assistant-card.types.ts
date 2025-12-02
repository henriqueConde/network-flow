import type { CONVERSATION_DETAIL_CONFIG } from '../../conversation-detail.config';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    summary?: string;
    suggestedReply?: string;
    suggestedNextAction?: string;
    suggestedNextActionDueAt?: string;
  };
};

export type AiAssistantCardProps = {
  messages: ChatMessage[];
  isLoading?: boolean;
  error?: string;
  config: typeof CONVERSATION_DETAIL_CONFIG;
  onSendMessage: (message: string) => void;
  onCopyReply?: (reply: string) => void;
};

