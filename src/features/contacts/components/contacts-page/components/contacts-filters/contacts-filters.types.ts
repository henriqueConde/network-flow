import type { CONTACTS_PAGE_CONFIG } from '../../contacts-page.config';

export type ContactsFiltersProps = {
  search: string;
  company: string;
  primaryPlatform: string | null;
  warmOrCold: 'warm' | 'cold' | null;
  connectionStatus: 'not_connected' | 'request_sent' | 'connected' | null;
  contactType: string;
  config: typeof CONTACTS_PAGE_CONFIG;
  onSearchChange: (value: string) => void;
  onCompanyChange: (value: string) => void;
  onPlatformChange: (value: string | null) => void;
  onWarmOrColdChange: (value: 'warm' | 'cold' | null) => void;
  onConnectionStatusChange: (value: 'not_connected' | 'request_sent' | 'connected' | null) => void;
  onContactTypeChange: (value: string) => void;
};

