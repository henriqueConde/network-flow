import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSyncStatus, type UpdateSyncStatusPayload } from './settings.service';
import { settingsKeys } from './settings.keys';

/**
 * Mutation hook for updating sync status.
 */
export function useUpdateSyncStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateSyncStatusPayload) => updateSyncStatus(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: settingsKeys.syncStatus() });
    },
  });
}

