import type { ConversationDetail } from '../../services/conversations.service';
import type { CONVERSATION_DETAIL_CONFIG } from './conversation-detail.config';
import type { EDIT_MESSAGE_DIALOG_CONFIG } from './components/edit-message-dialog/edit-message-dialog.config';
import type { Stage } from '@/features/stages';
import type { Category } from '@/features/categories';
import type { ChatMessage } from './components/ai-assistant-card/ai-assistant-card.types';

export type ConversationDetailViewProps = {
  conversation: ConversationDetail | null;
  isLoading: boolean;
  error: string | null;
  config: typeof CONVERSATION_DETAIL_CONFIG;
  editMessageDialogConfig: typeof EDIT_MESSAGE_DIALOG_CONFIG;
  // Edit form state
  editValues: {
    categoryId: string | null;
    stageId: string | null;
    nextActionType: string | null;
    nextActionDueAt: string | null;
    priority: 'low' | 'medium' | 'high' | null;
    notes: string | null;
    originalUrl: string | null;
  };
  editErrors: Partial<Record<keyof ConversationDetailViewProps['editValues'], string>>;
  isEditingMetadata: boolean;
  isEditingNotes: boolean;
  isSaving: boolean;
  // Callbacks
  onBack: () => void;
  onToggleAutoFollowups: (enabled: boolean) => void;
  onChangeEditField: (
    field: keyof ConversationDetailViewProps['editValues'],
    value: string | null,
  ) => void;
  onSaveMetadata: () => void;
  onSaveNotes: () => void;
  onCancelMetadata: () => void;
  onCancelNotes: () => void;
  onPasteNewMessages: () => void;
  // Add reply dialog
  isAddReplyOpen: boolean;
  addReplyValues: { body: string; sender: 'user' | 'contact'; sentAt: string };
  addReplyErrors: Partial<Record<'body' | 'sender' | 'sentAt', string>>;
  isAddingReply: boolean;
  onOpenAddReply: () => void;
  onCloseAddReply: () => void;
  onChangeAddReplyField: (field: 'body' | 'sender' | 'sentAt', value: string | 'user' | 'contact') => void;
  onSubmitAddReply: () => void;
  availableStages: Stage[];
  availableCategories: Category[];
  // AI Assistant props (passed to Add Reply dialog)
  aiMessages: ChatMessage[];
  isAiLoading: boolean;
  aiError?: string;
  onSendAiMessage: (message: string) => void;
  onClearAiMessages: () => void;
  onUseAiSuggestion: (suggestion: string) => void;
  onConfirmMessage?: (messageId: string) => void;
  onEditMessage?: (messageId: string) => void;
  onDeleteMessage?: (messageId: string) => void;
  // Edit message dialog
  isEditMessageOpen: boolean;
  editMessageValues: { body: string; sentAt: string };
  editMessageErrors: Partial<Record<'body' | 'sentAt', string>>;
  isUpdatingMessage: boolean;
  onCloseEditMessage: () => void;
  onChangeEditMessageField: (field: 'body' | 'sentAt', value: string) => void;
  onSubmitEditMessage: () => void;
};

