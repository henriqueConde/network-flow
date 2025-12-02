import type { ConversationDetail } from '../../../services/conversations.service';
import type { Stage } from '@/features/stages';
import type { Category } from '@/features/categories';
import type { CONVERSATION_DETAIL_CONFIG } from '../conversation-detail.config';

export type ConversationDetailContentProps = {
  conversation: ConversationDetail;
  editValues: {
    categoryId: string | null;
    stageId: string | null;
    nextActionType: string | null;
    nextActionDueAt: string | null;
    priority: 'low' | 'medium' | 'high' | null;
    notes: string | null;
    originalUrl: string | null;
  };
  editErrors: Partial<Record<keyof ConversationDetailContentProps['editValues'], string>>;
  isEditing: boolean;
  isSaving: boolean;
  availableStages: Stage[];
  availableCategories: Category[];
  aiAnalysis?: {
    summary?: string;
    suggestedReply?: string;
    suggestedNextAction?: string;
    suggestedNextActionDueAt?: string;
    isLoading?: boolean;
    error?: string;
  };
  config: typeof CONVERSATION_DETAIL_CONFIG;
  onPasteNewMessages: () => void;
  onOpenAddReply: () => void;
  onChangeEditField: (
    field: keyof ConversationDetailContentProps['editValues'],
    value: string | null,
  ) => void;
  onSave: () => void;
  onCancel: () => void;
  onRequestAnalysis?: () => void;
  onRegenerateReply?: () => void;
};


