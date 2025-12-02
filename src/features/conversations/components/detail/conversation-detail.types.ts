import type { ConversationDetail } from '../../services/conversations.service';
import type { CONVERSATION_DETAIL_CONFIG } from './conversation-detail.config';
import type { Stage } from '@/features/stages';
import type { Category } from '@/features/categories';

export type ConversationDetailViewProps = {
  conversation: ConversationDetail | null;
  isLoading: boolean;
  error: string | null;
  config: typeof CONVERSATION_DETAIL_CONFIG;
  // Edit form state
  editValues: {
    categoryId: string | null;
    stageId: string | null;
    nextActionType: string | null;
    nextActionDueAt: string | null;
    priority: 'low' | 'medium' | 'high';
    notes: string | null;
  };
  editErrors: Partial<Record<keyof ConversationDetailViewProps['editValues'], string>>;
  isEditing: boolean;
  isSaving: boolean;
  // Callbacks
  onBack: () => void;
  onChangeEditField: (
    field: keyof ConversationDetailViewProps['editValues'],
    value: string | null,
  ) => void;
  onSave: () => void;
  onCancel: () => void;
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
  // AI Analysis
  aiAnalysis?: {
    summary?: string;
    suggestedReply?: string;
    suggestedNextAction?: string;
    suggestedNextActionDueAt?: string;
    isLoading?: boolean;
    error?: string;
  };
  onRequestAnalysis?: () => void;
  onRegenerateReply?: () => void;
};

