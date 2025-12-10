export const analyticsKeys = {
  all: ['analytics'] as const,
  analytics: (params?: { startDate?: string; endDate?: string }) =>
    [...analyticsKeys.all, 'data', params] as const,
};


