import { useMemo } from 'react';
import type { TodayAction, NewMessage, OverdueItem } from '../today-page.types';
import { TODAY_PAGE_CONFIG } from '../today-page.config';

/**
 * Hook for sorting and limiting Today page data.
 * Handles all sorting logic and applies display limits.
 */
export function useTodaySorting(
  actions: TodayAction[],
  messages: NewMessage[],
  overdueItems: OverdueItem[],
) {
  // Sort actions by priority (high > medium > low) and due date
  const sortedActions = useMemo(() => {
    const priorityOrder: Record<'high' | 'medium' | 'low', number> = {
      high: 3,
      medium: 2,
      low: 1,
    };

    return [...actions].sort((a, b) => {
      const aPriority = a.priority ?? 'low'; // Treat null as low priority
      const bPriority = b.priority ?? 'low'; // Treat null as low priority
      const priorityDiff = priorityOrder[bPriority] - priorityOrder[aPriority];
      if (priorityDiff !== 0) return priorityDiff;
      return a.dueAt.getTime() - b.dueAt.getTime();
    });
  }, [actions]);

  // Limit actions to max shown
  const prioritizedActions = useMemo(
    () => sortedActions.slice(0, TODAY_PAGE_CONFIG.ui.maxActionsToShow),
    [sortedActions],
  );

  // Sort messages by received time (newest first)
  const sortedMessages = useMemo(
    () => [...messages].sort((a, b) => b.receivedAt.getTime() - a.receivedAt.getTime()),
    [messages],
  );

  // Sort overdue items by days overdue (most overdue first)
  const sortedOverdueItems = useMemo(
    () => [...overdueItems].sort((a, b) => b.daysOverdue - a.daysOverdue),
    [overdueItems],
  );

  return {
    prioritizedActions,
    sortedMessages,
    sortedOverdueItems,
  };
}

