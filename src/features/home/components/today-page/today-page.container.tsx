'use client';

import { useRouter } from 'next/navigation';
import {
  useTodayMetrics,
  useTodayActions,
  useNewMessages,
  useOverdueItems,
} from '../../services/today.queries';
import { TodayPageView } from './today-page.view';
import { TODAY_PAGE_CONFIG } from './today-page.config';
import type {
  TodayPageMetrics,
  TodayAction,
  NewMessage,
  OverdueItem,
} from './today-page.types';

export function TodayPageContainer() {
  const router = useRouter();

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

  // Determine loading and error states
  const isLoading = isMetricsLoading || isActionsLoading || isMessagesLoading || isOverdueLoading;
  const error = metricsError || actionsError || messagesError || overdueError
    ? 'Failed to load today\'s data. Please try again.'
    : null;

  // Calculate overdue count for metrics
  const metricsWithOverdue: TodayPageMetrics = {
    ...metrics,
    overdueFollowUps: overdueItems.length,
  };

  // Sort actions by priority (high > medium > low) and due date
  const sortedActions: TodayAction[] = [...actions].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return a.dueAt.getTime() - b.dueAt.getTime();
  });

  // Limit actions to max shown
  const prioritizedActions = sortedActions.slice(0, TODAY_PAGE_CONFIG.ui.maxActionsToShow);

  // Sort messages by received time (newest first)
  const sortedMessages: NewMessage[] = [...messages].sort(
    (a, b) => b.receivedAt.getTime() - a.receivedAt.getTime()
  );

  // Sort overdue items by days overdue (most overdue first)
  const sortedOverdueItems: OverdueItem[] = [...overdueItems].sort(
    (a, b) => b.daysOverdue - a.daysOverdue
  );

  // Navigation handlers
  const handleActionClick = (actionId: string, conversationId?: string) => {
    // TODO: Navigate to conversation detail page
    if (conversationId) {
      router.push(`/conversations/${conversationId}`);
    }
  };

  const handleMessageClick = (messageId: string, conversationId: string) => {
    // TODO: Navigate to conversation detail page
    router.push(`/conversations/${conversationId}`);
  };

  const handleOverdueClick = (itemId: string, conversationId: string) => {
    // TODO: Navigate to conversation detail page
    router.push(`/conversations/${conversationId}`);
  };

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
