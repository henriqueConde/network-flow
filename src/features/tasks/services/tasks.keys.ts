export const tasksKeys = {
  all: ['tasks'] as const,
  lists: () => [...tasksKeys.all, 'list'] as const,
  list: (params?: { completed?: boolean; dueDate?: string; priority?: string }) =>
    [...tasksKeys.lists(), params] as const,
  details: () => [...tasksKeys.all, 'detail'] as const,
  detail: (id: string) => [...tasksKeys.details(), id] as const,
};



