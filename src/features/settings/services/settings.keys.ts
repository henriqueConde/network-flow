export const settingsKeys = {
  all: ['settings'] as const,
  syncStatus: () => [...settingsKeys.all, 'syncStatus'] as const,
};



