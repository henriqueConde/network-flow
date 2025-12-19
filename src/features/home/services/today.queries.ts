import { useQuery } from '@tanstack/react-query';
import {
  getTodayMetrics,
  getTodayActions,
  getNewMessages,
  getPendingMessages,
  getOverdueFollowups,
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
 * Query hook for fetching pending messages.
 * Defined in services layer for reusability and separation of concerns.
 */
export function usePendingMessages() {
  return useQuery({
    queryKey: ['today', 'pending-messages'],
    queryFn: () => getPendingMessages(),
    staleTime: 60_000, // 1 minute
    refetchOnWindowFocus: true,
  });
}

/**
 * Query hook for fetching overdue follow-ups.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useOverdueFollowups() {
  return useQuery({
    queryKey: ['today', 'overdue-followups'],
    queryFn: () => getOverdueFollowups(),
    staleTime: 60_000, // 1 minute
    refetchOnWindowFocus: true,
  });
}

/**
 * Query hook for fetching overdue items (deprecated - kept for backward compatibility).
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
