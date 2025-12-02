'use client';

import {
  useTodayMetrics,
  useTodayActions,
  useNewMessages,
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
    data: messages = [],
    isLoading: isMessagesLoading,
    error: messagesError,
  } = useNewMessages();

  const {
    data: overdueItems = [],
    isLoading: isOverdueLoading,
    error: overdueError,
  } = useOverdueItems();

  // Aggregate loading and error states
  const { isLoading, error } = useTodayLoadingError(
    isMetricsLoading,
    isActionsLoading,
    isMessagesLoading,
    isOverdueLoading,
    metricsError,
    actionsError,
    messagesError,
    overdueError,
  );

  // Aggregate and derive data
  const { metrics: metricsWithOverdue } = useTodayData(metrics, overdueItems);

  // Sort and limit data for display
  const { prioritizedActions, sortedMessages, sortedOverdueItems } = useTodaySorting(
    actions,
    messages,
    overdueItems,
  );

  // Navigation handlers
  const { handleActionClick, handleMessageClick, handleOverdueClick } = useTodayNavigation();

  return (
    <TodayPageView
      metrics={metricsWithOverdue}
      prioritizedActions={prioritizedActions}
      newMessages={sortedMessages}
      overdueItems={sortedOverdueItems}
      isLoading={isLoading}
      error={error}
      config={TODAY_PAGE_CONFIG}
      onActionClick={handleActionClick}
      onMessageClick={handleMessageClick}
      onOverdueClick={handleOverdueClick}
    />
  );
}
