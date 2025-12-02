import { useQuery } from '@tanstack/react-query';
import { getSyncStatus } from './settings.service';
import { settingsKeys } from './settings.keys';

/**
 * Query hook for fetching sync status.
 */
export function useSyncStatus() {
  return useQuery({
    queryKey: settingsKeys.syncStatus(),
    queryFn: () => getSyncStatus(),
    staleTime: 60_000, // 1 minute
    refetchOnWindowFocus: true,
  });
}


