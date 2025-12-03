import { useMemo } from 'react';

/**
 * Hook for aggregating loading and error states from multiple queries.
 * Pure derived state hook - receives query states as parameters.
 */
export function useTodayLoadingError(
  isMetricsLoading: boolean,
  isActionsLoading: boolean,
  isOverdueLoading: boolean,
  metricsError: Error | null,
  actionsError: Error | null,
  overdueError: Error | null,
) {
  const isLoading = useMemo(
    () => isMetricsLoading || isActionsLoading || isOverdueLoading,
    [isMetricsLoading, isActionsLoading, isOverdueLoading],
  );

  const error = useMemo(
    () =>
      metricsError || actionsError || overdueError
        ? 'Failed to load today\'s data. Please try again.'
        : null,
    [metricsError, actionsError, overdueError],
  );

  return {
    isLoading,
    error,
  };
}

