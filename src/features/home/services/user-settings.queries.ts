import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserSettings, updateUserSettings } from './user-settings.service';

export const userSettingsKeys = {
  all: ['user-settings'] as const,
  settings: () => [...userSettingsKeys.all, 'settings'] as const,
} as const;

/**
 * Query hook for fetching user settings.
 */
export function useUserSettings() {
  return useQuery({
    queryKey: userSettingsKeys.settings(),
    queryFn: () => getUserSettings(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Mutation hook for updating user settings.
 */
export function useUpdateUserSettings() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { activeOpportunitiesGoal?: number }) => updateUserSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userSettingsKeys.settings() });
    },
  });
}

