export const interviewsKeys = {
  all: ['interviews'] as const,
  lists: () => [...interviewsKeys.all, 'list'] as const,
  list: (params: { search?: string; status?: string; page: number; sortBy: string; sortDir: string }) =>
    [...interviewsKeys.lists(), params] as const,
  details: () => [...interviewsKeys.all, 'detail'] as const,
  detail: (id: string) => [...interviewsKeys.details(), id] as const,
};

