import type { SyncStatus } from '../../services/settings.service';
import type { SETTINGS_PAGE_CONFIG } from './settings-page.config';

export interface SettingsPageViewProps {
  syncStatus: SyncStatus | null;
  isLoading: boolean;
  error: string | null;
  config: typeof SETTINGS_PAGE_CONFIG;
}

