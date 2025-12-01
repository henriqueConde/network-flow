export const todayKeys = {
  all: ['today'] as const,
  metrics: () => [...todayKeys.all, 'metrics'] as const,
  actions: () => [...todayKeys.all, 'actions'] as const,
  messages: () => [...todayKeys.all, 'messages'] as const,
  overdue: () => [...todayKeys.all, 'overdue'] as const,
  page: () => [...todayKeys.all, 'page'] as const,
} as const;
