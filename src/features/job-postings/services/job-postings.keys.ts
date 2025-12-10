export const jobPostingsKeys = {
  all: ['job-postings'] as const,
  lists: () => [...jobPostingsKeys.all, 'list'] as const,
  list: (params: {
    search?: string;
    source?: string;
    companyId?: string;
    outreachDone?: boolean;
    page: number;
    sortBy: string;
    sortDir: string;
  }) => [...jobPostingsKeys.lists(), params] as const,
  details: () => [...jobPostingsKeys.all, 'detail'] as const,
  detail: (id: string) => [...jobPostingsKeys.details(), id] as const,
};


