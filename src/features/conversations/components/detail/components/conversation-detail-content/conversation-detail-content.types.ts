import type { ConversationDetail } from '../../../../services/conversations.service';
import type { Stage } from '@/features/stages';
import type { Category } from '@/features/categories';
import type { CONVERSATION_DETAIL_CONFIG } from '../../conversation-detail.config';

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
    strategyIds: string[];
    responseReceived: boolean;
    responseReceivedAt: string | null;
    emailSentAt: string | null;
    loomVideoUrl: string | null;
    loomSent: boolean;
    emailFollowUpDates: string[];
    emailStatus: 'no_reply' | 'replied' | 'call_scheduled' | 'rejected' | 'in_process' | null;
    followUp1Date: string | null;
    followUp2Date: string | null;
    followUp3Date: string | null;
  };
  editErrors: Partial<Record<keyof ConversationDetailContentProps['editValues'], string>>;
  isEditingMetadata: boolean;
  isEditingNotes: boolean;
  isSaving: boolean;
  availableStages: Stage[];
  availableCategories: Category[];
  config: typeof CONVERSATION_DETAIL_CONFIG;
  onPasteNewMessages: () => void;
  onOpenAddReply: () => void;
  onChangeEditField: (
    field: keyof ConversationDetailContentProps['editValues'],
    value: string | string[] | boolean | null,
  ) => void;
  onSaveMetadata: () => void;
  onSaveNotes: () => void;
  onCancelMetadata: () => void;
  onCancelNotes: () => void;
  onConfirmMessage?: (messageId: string) => void;
  onEditMessage?: (messageId: string) => void;
  onDeleteMessage?: (messageId: string) => void;
};

