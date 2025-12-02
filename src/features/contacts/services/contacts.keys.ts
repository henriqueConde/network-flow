export const contactsKeys = {
  all: ['contacts'] as const,
  lists: () => [...contactsKeys.all, 'list'] as const,
  list: (params: {
    search?: string;
    company?: string;
    categoryId?: string;
    stageId?: string;
    primaryPlatform?: string;
    page: number;
    sortBy: string;
    sortDir: string;
  }) => [...contactsKeys.lists(), params] as const,
  details: () => [...contactsKeys.all, 'detail'] as const,
  detail: (id: string) => [...contactsKeys.details(), id] as const,
};



