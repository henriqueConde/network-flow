import { useMemo } from 'react';
import type {
  TodayPageMetrics,
  OverdueItem,
} from '../today-page.types';

/**
 * Hook for deriving Today page metrics.
 * Calculates metrics with overdue count from raw data.
 * Pure derived state hook - receives data as parameters.
 */
export function useTodayData(
  metrics: TodayPageMetrics,
  overdueItems: OverdueItem[],
) {
  // Calculate metrics with overdue count
  const metricsWithOverdue = useMemo(
    (): TodayPageMetrics => ({
      ...metrics,
      overdueFollowUps: overdueItems.length,
    }),
    [metrics, overdueItems.length],
  );

  return {
    metrics: metricsWithOverdue,
  };
}

