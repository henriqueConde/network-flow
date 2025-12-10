import type { ConversationDetail } from '../../../../services/conversations.service';
import type { CONVERSATION_DETAIL_CONFIG } from '../../conversation-detail.config';

export type EmailTrackingCardProps = {
  conversation: ConversationDetail;
  editValues: {
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
  editErrors: Partial<Record<keyof EmailTrackingCardProps['editValues'], string>>;
  isEditing: boolean;
  isSaving: boolean;
  config: typeof CONVERSATION_DETAIL_CONFIG;
  onChangeEditField: (
    field: keyof EmailTrackingCardProps['editValues'],
    value: string | string[] | boolean | null,
  ) => void;
  onSave: () => void;
  onCancel: () => void;
};


