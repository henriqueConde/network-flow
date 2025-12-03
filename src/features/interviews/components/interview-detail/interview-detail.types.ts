import type { InterviewDetail } from '../../services/interviews.service';
import type { INTERVIEW_DETAIL_CONFIG } from './interview-detail.config';

export interface InterviewDetailViewProps {
  interview: InterviewDetail | null;
  isLoading: boolean;
  error: string | null;
  config: typeof INTERVIEW_DETAIL_CONFIG;
  notes: string;
  isEditingNotes: boolean;
  isSavingNotes: boolean;
  onBack: () => void;
  onNotesChange: (notes: string) => void;
  onStartEditNotes: () => void;
  onSaveNotes: () => void;
  onCancelEditNotes: () => void;
  onRelatedConversationClick: (conversationId: string) => void;
  onRelatedContactClick: (contactId: string) => void;
}

