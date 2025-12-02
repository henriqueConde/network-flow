import type { ConversationDetail } from '../../../../services/conversations.service';
import type { CONVERSATION_DETAIL_CONFIG } from '../../conversation-detail.config';
import type { ChatMessage } from '../ai-assistant-card/ai-assistant-card.types';

export type AddReplyDialogProps = {
  isOpen: boolean;
  values: { body: string; sender: 'user' | 'contact'; sentAt: string };
  errors: Partial<Record<'body' | 'sender' | 'sentAt', string>>;
  isAddingReply: boolean;
  conversation: ConversationDetail | null;
  config: typeof CONVERSATION_DETAIL_CONFIG;
  onClose: () => void;
  onChangeField: (field: 'body' | 'sender' | 'sentAt', value: string | 'user' | 'contact') => void;
  onSubmit: () => void;
  // AI Assistant props
  aiMessages: ChatMessage[];
  isAiLoading: boolean;
  aiError?: string;
  onSendAiMessage: (message: string) => void;
  onClearAiMessages: () => void;
  onUseAiSuggestion?: (suggestion: string) => void;
};

