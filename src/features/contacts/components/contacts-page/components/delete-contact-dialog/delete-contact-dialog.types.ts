import type { CONTACTS_PAGE_CONFIG } from '../../contacts-page.config';

export type DeleteContactDialogProps = {
  isOpen: boolean;
  contactName: string;
  isDeleting: boolean;
  config: typeof CONTACTS_PAGE_CONFIG;
  onClose: () => void;
  onConfirm: () => void;
};


