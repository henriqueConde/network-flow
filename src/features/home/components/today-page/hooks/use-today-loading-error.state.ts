import { useMemo } from 'react';

/**
 * Hook for aggregating loading and error states from multiple queries.
 * Pure derived state hook - receives query states as parameters.
 */
export function useTodayLoadingError(
  isMetricsLoading: boolean,
  isActionsLoading: boolean,
  isOverdueLoading: boolean,
  isFollowupsLoading: boolean,
  metricsError: Error | null,
  actionsError: Error | null,
  overdueError: Error | null,
  followupsError: Error | null,
) {
  const isLoading = useMemo(
    () => isMetricsLoading || isActionsLoading || isOverdueLoading || isFollowupsLoading,
    [isMetricsLoading, isActionsLoading, isOverdueLoading, isFollowupsLoading],
  );

  const error = useMemo(
    () =>
      metricsError || actionsError || overdueError || followupsError
        ? 'Failed to load today\'s data. Please try again.'
        : null,
    [metricsError, actionsError, overdueError, followupsError],
  );

  return {
    isLoading,
    error,
  };
}

