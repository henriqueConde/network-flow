import type { ConversationDetail } from '../../../../services/conversations.service';
import type { Stage } from '@/features/stages';
import type { Category } from '@/features/categories';
import type { CONVERSATION_DETAIL_CONFIG } from '../../conversation-detail.config';

export type ConversationDetailSidebarProps = {
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
  editErrors: Partial<Record<keyof ConversationDetailSidebarProps['editValues'], string>>;
  isEditingMetadata: boolean;
  isEditingNotes: boolean;
  isSaving: boolean;
  availableStages: Stage[];
  availableCategories: Category[];
  config: typeof CONVERSATION_DETAIL_CONFIG;
  onChangeEditField: (
    field: keyof ConversationDetailSidebarProps['editValues'],
    value: string | null,
  ) => void;
  onSaveMetadata: () => void;
  onSaveNotes: () => void;
  onCancelMetadata: () => void;
  onCancelNotes: () => void;
};

