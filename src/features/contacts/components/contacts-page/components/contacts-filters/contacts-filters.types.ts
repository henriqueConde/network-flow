import type { CONTACTS_PAGE_CONFIG } from '../../contacts-page.config';
import type { Category } from '@/features/categories';
import type { Stage } from '@/features/stages';

export type ContactsFiltersProps = {
  search: string;
  company: string;
  categoryId: string | null;
  stageId: string | null;
  primaryPlatform: string | null;
  warmOrCold: 'warm' | 'cold' | null;
  connectionStatus: 'not_connected' | 'request_sent' | 'connected' | null;
  contactType: string;
  availableCategories: Category[];
  availableStages: Stage[];
  config: typeof CONTACTS_PAGE_CONFIG;
  onSearchChange: (value: string) => void;
  onCompanyChange: (value: string) => void;
  onCategoryChange: (value: string | null) => void;
  onStageChange: (value: string | null) => void;
  onPlatformChange: (value: string | null) => void;
  onWarmOrColdChange: (value: 'warm' | 'cold' | null) => void;
  onConnectionStatusChange: (value: 'not_connected' | 'request_sent' | 'connected' | null) => void;
  onContactTypeChange: (value: string) => void;
};

