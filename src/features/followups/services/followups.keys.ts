export const followupsKeys = {
  all: ['followups'] as const,
  lists: () => [...followupsKeys.all, 'list'] as const,
  list: () => [...followupsKeys.lists()] as const,
};


