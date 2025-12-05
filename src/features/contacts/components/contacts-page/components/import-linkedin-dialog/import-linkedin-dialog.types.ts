import type { CONTACTS_PAGE_CONFIG } from '../../contacts-page.config';

export type ImportLinkedInDialogProps = {
  isOpen: boolean;
  importProgress: {
    total: number;
    processed: number;
    created: number;
    skipped: number;
    currentContact?: {
      name: string;
      status: 'processing' | 'created' | 'skipped';
    };
  } | null;
  importError: string | null;
  isImporting: boolean;
  config: typeof CONTACTS_PAGE_CONFIG;
  onClose: () => void;
};

