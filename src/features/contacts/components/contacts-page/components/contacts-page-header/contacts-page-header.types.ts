import type { CONTACTS_PAGE_CONFIG } from '../../contacts-page.config';

export type ContactsPageHeaderProps = {
  config: typeof CONTACTS_PAGE_CONFIG;
  onOpenCreate: () => void;
  onStartImport: () => void;
  isImporting: boolean;
  showImportButton: boolean;
};



