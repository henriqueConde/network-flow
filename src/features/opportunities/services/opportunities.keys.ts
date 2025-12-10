export const opportunitiesKeys = {
  all: ['opportunities'] as const,
  lists: () => [...opportunitiesKeys.all, 'list'] as const,
  list: (params: { search?: string; categoryId?: string; stageId?: string; page: number; sortBy: string; sortDir: string }) =>
    [...opportunitiesKeys.lists(), params] as const,
  details: () => [...opportunitiesKeys.all, 'detail'] as const,
  detail: (id: string) => [...opportunitiesKeys.details(), id] as const,
};


