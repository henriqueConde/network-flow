import { useQuery } from '@tanstack/react-query';
import { getAnalytics } from './analytics.service';
import { analyticsKeys } from './analytics.keys';

/**
 * Query hook for fetching analytics data.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useAnalytics(params?: { startDate?: string; endDate?: string }) {
  return useQuery({
    queryKey: analyticsKeys.analytics(params),
    queryFn: () => getAnalytics(params),
    staleTime: 5 * 60_000, // 5 minutes
    refetchOnWindowFocus: false,
  });
}

