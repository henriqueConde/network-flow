export const companiesKeys = {
  all: ['companies'] as const,
  lists: () => [...companiesKeys.all, 'list'] as const,
  list: (params: {
    search?: string;
    industry?: string;
    fundingRound?: string;
    hasRelevantRole?: boolean;
    applied?: boolean;
    page: number;
    sortBy: string;
    sortDir: string;
  }) => [...companiesKeys.lists(), params] as const,
  details: () => [...companiesKeys.all, 'detail'] as const,
  detail: (id: string) => [...companiesKeys.details(), id] as const,
};



