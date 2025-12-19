import { useQuery } from '@tanstack/react-query';
import { listTasks, getTask } from './tasks.service';
import { tasksKeys } from './tasks.keys';

/**
 * Query hook for fetching tasks list.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useTasks(params?: {
  completed?: boolean;
  dueDate?: 'today' | 'overdue' | 'upcoming' | 'all';
  priority?: 'low' | 'medium' | 'high';
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: tasksKeys.list(params),
    queryFn: () => listTasks(params),
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    enabled: params?.enabled !== false,
  });
}

/**
 * Query hook for fetching a single task detail.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useTask(id: string) {
  return useQuery({
    queryKey: tasksKeys.detail(id),
    queryFn: () => getTask(id),
    enabled: !!id,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });
}



