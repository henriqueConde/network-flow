'use client';

import {
  useTodayMetrics,
  useTodayActions,
  useOverdueItems,
} from '../../services/today.queries';
import { TodayPageView } from './today-page.view';
import { TODAY_PAGE_CONFIG } from './today-page.config';
import { useTodayLoadingError } from './hooks/use-today-loading-error.state';
import { useTodayData } from './hooks/use-today-data.state';
import { useTodaySorting } from './hooks/use-today-sorting.state';
import { useTodayNavigation } from './hooks/use-today-navigation.state';

export function TodayPageContainer() {
  // Fetch data using service layer queries
  const {
    data: metrics = {
      activeOpportunities: 0,
      interviewsInProgress: 0,
      overdueFollowUps: 0,
    },
    isLoading: isMetricsLoading,
    error: metricsError,
  } = useTodayMetrics();

  const {
    data: actions = [],
    isLoading: isActionsLoading,
    error: actionsError,
  } = useTodayActions();

  const {
    data: overdueItems = [],
    isLoading: isOverdueLoading,
    error: overdueError,
  } = useOverdueItems();

  // Aggregate loading and error states
  const { isLoading, error } = useTodayLoadingError(
    isMetricsLoading,
    isActionsLoading,
    isOverdueLoading,
    metricsError,
    actionsError,
    overdueError,
  );

  // Aggregate and derive data
  const { metrics: metricsWithOverdue } = useTodayData(metrics, overdueItems);

  // Sort and limit data for display
  const { prioritizedActions, sortedOverdueItems } = useTodaySorting(
    actions,
    overdueItems,
  );

  // Navigation handlers
  const { handleActionClick, handleOverdueClick } = useTodayNavigation();

  return (
    <TodayPageView
      metrics={metricsWithOverdue}
      prioritizedActions={prioritizedActions}
      overdueItems={sortedOverdueItems}
      isLoading={isLoading}
      error={error}
      config={TODAY_PAGE_CONFIG}
      onActionClick={handleActionClick}
      onOverdueClick={handleOverdueClick}
    />
  );
}
