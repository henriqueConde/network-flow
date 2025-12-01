import { useQuery } from '@tanstack/react-query';
import {
  getTodayMetrics,
  getTodayActions,
  getNewMessages,
  getOverdueItems,
} from './today.service';
import { todayKeys } from './today.keys';

/**
 * Query hook for fetching Today page metrics.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useTodayMetrics() {
  return useQuery({
    queryKey: todayKeys.metrics(),
    queryFn: () => getTodayMetrics(),
    staleTime: 60_000, // 1 minute
    refetchOnWindowFocus: true,
  });
}

/**
 * Query hook for fetching prioritized actions for today.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useTodayActions() {
  return useQuery({
    queryKey: todayKeys.actions(),
    queryFn: () => getTodayActions(),
    staleTime: 30_000, // 30 seconds
    refetchOnWindowFocus: true,
  });
}

/**
 * Query hook for fetching new messages.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useNewMessages() {
  return useQuery({
    queryKey: todayKeys.messages(),
    queryFn: () => getNewMessages(),
    staleTime: 30_000, // 30 seconds
    refetchOnWindowFocus: true,
  });
}

/**
 * Query hook for fetching overdue items.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useOverdueItems() {
  return useQuery({
    queryKey: todayKeys.overdue(),
    queryFn: () => getOverdueItems(),
    staleTime: 60_000, // 1 minute
    refetchOnWindowFocus: true,
  });
}
