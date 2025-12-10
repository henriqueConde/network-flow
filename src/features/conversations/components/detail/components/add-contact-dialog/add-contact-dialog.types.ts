import type { CONVERSATION_DETAIL_CONFIG } from '../../conversation-detail.config';

export type AddContactDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (contactId: string) => void;
  contacts: Array<{ id: string; name: string; company?: string | null }>;
  existingContactIds: string[];
  isLoading: boolean;
  config: typeof CONVERSATION_DETAIL_CONFIG;
  searchInput?: string;
  onSearchInputChange?: (value: string) => void;
};

