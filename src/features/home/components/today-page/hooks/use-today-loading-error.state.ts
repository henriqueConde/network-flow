import { useMemo } from 'react';

/**
 * Hook for aggregating loading and error states from multiple queries.
 * Pure derived state hook - receives query states as parameters.
 */
export function useTodayLoadingError(
  isMetricsLoading: boolean,
  isActionsLoading: boolean,
  isMessagesLoading: boolean,
  isOverdueLoading: boolean,
  metricsError: Error | null,
  actionsError: Error | null,
  messagesError: Error | null,
  overdueError: Error | null,
) {
  const isLoading = useMemo(
    () => isMetricsLoading || isActionsLoading || isMessagesLoading || isOverdueLoading,
    [isMetricsLoading, isActionsLoading, isMessagesLoading, isOverdueLoading],
  );

  const error = useMemo(
    () =>
      metricsError || actionsError || messagesError || overdueError
        ? 'Failed to load today\'s data. Please try again.'
        : null,
    [metricsError, actionsError, messagesError, overdueError],
  );

  return {
    isLoading,
    error,
  };
}

