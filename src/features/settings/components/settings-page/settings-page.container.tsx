'use client';

import { SettingsPageView } from './settings-page.view';
import { useSyncStatus } from '../../services/settings.queries';
import { SETTINGS_PAGE_CONFIG } from './settings-page.config';

export function SettingsPageContainer() {
  const { data: syncStatus, isLoading, error } = useSyncStatus();

  return (
    <SettingsPageView
      syncStatus={syncStatus || null}
      isLoading={isLoading}
      error={error ? 'Failed to load settings. Please try again.' : null}
      config={SETTINGS_PAGE_CONFIG}
    />
  );
}



