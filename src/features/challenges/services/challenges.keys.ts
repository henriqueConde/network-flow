export const challengesKeys = {
  all: ['challenges'] as const,
  lists: () => [...challengesKeys.all, 'list'] as const,
  list: (params: {
    search?: string;
    active?: boolean;
    page: number;
    sortBy: string;
    sortDir: string;
  }) => [...challengesKeys.lists(), params] as const,
  details: () => [...challengesKeys.all, 'detail'] as const,
  detail: (id: string) => [...challengesKeys.details(), id] as const,
};


