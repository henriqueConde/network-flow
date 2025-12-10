import type { CONVERSATION_DETAIL_CONFIG } from '../../conversation-detail.config';

export type ContactsCardProps = {
  contacts: Array<{
    id: string;
    name: string;
    company: string | null;
  }>;
  config: typeof CONVERSATION_DETAIL_CONFIG;
  onAddContact?: () => void;
  onRemoveContact?: (contactId: string) => void;
  isAddingContact?: boolean;
  isRemovingContact?: boolean;
};


