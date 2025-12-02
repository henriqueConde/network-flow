export const conversationsKeys = {
  all: ['conversations'] as const,
  lists: () => [...conversationsKeys.all, 'list'] as const,
  list: (params: { search?: string; status?: string; page: number; sortBy: string; sortDir: string }) =>
    [...conversationsKeys.lists(), params] as const,
  details: () => [...conversationsKeys.all, 'detail'] as const,
  detail: (id: string) => [...conversationsKeys.details(), id] as const,
};


