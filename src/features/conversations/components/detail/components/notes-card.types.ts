import type { CONVERSATION_DETAIL_CONFIG } from '../conversation-detail.config';

export type NotesCardProps = {
  notes: string | null;
  isEditing: boolean;
  isSaving: boolean;
  error?: string;
  config: typeof CONVERSATION_DETAIL_CONFIG;
  onChangeNotes: (value: string | null) => void;
  onSave: () => void;
  onCancel: () => void;
};






