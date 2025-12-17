import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createTask,
  updateTask,
  deleteTask,
  completeTask,
  uncompleteTask,
  type CreateTaskPayload,
  type UpdateTaskPayload,
} from './tasks.service';
import { tasksKeys } from './tasks.keys';

/**
 * Mutation hook for creating a new task.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTaskPayload) => createTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tasksKeys.lists() });
      // Invalidate today page to show new task
      queryClient.invalidateQueries({ queryKey: ['today'] });
    },
  });
}

/**
 * Mutation hook for updating a task.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTaskPayload }) =>
      updateTask(id, payload),
    onSuccess: (data) => {
      // Invalidate both the detail and list queries
      queryClient.invalidateQueries({ queryKey: tasksKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: tasksKeys.lists() });
      // Invalidate today page
      queryClient.invalidateQueries({ queryKey: ['today'] });
    },
  });
}

/**
 * Mutation hook for completing a task.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useCompleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => completeTask(id),
    onSuccess: (data) => {
      // Invalidate both the detail and list queries
      queryClient.invalidateQueries({ queryKey: tasksKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: tasksKeys.lists() });
      // Invalidate today page to remove completed task
      queryClient.invalidateQueries({ queryKey: ['today'] });
    },
  });
}

/**
 * Mutation hook for uncompleting a task.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useUncompleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => uncompleteTask(id),
    onSuccess: (data) => {
      // Invalidate both the detail and list queries
      queryClient.invalidateQueries({ queryKey: tasksKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: tasksKeys.lists() });
      // Invalidate today page to show uncompleted task
      queryClient.invalidateQueries({ queryKey: ['today'] });
    },
  });
}

/**
 * Mutation hook for deleting a task.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => {
      // Invalidate tasks list to remove the deleted task
      queryClient.invalidateQueries({ queryKey: tasksKeys.lists() });
      // Invalidate today page
      queryClient.invalidateQueries({ queryKey: ['today'] });
    },
  });
}


