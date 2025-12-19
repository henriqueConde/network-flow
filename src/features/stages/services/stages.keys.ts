export const stagesKeys = {
  all: ['stages'] as const,
  lists: () => [...stagesKeys.all, 'list'] as const,
  list: () => [...stagesKeys.lists()] as const,
};






