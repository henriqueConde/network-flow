import { useQuery } from '@tanstack/react-query';
import { listStages, ensureDefaultStages } from './stages.service';
import { stagesKeys } from './stages.keys';

/**
 * Query hook for fetching all stages.
 * Automatically ensures default stages exist if none are found.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useStages() {
  return useQuery({
    queryKey: stagesKeys.list(),
    queryFn: async () => {
      const stages = await listStages();
      // If no stages exist, ensure defaults are created
      if (stages.length === 0) {
        return await ensureDefaultStages();
      }
      return stages;
    },
    staleTime: 60_000, // Stages don't change often
    refetchOnWindowFocus: false,
  });
}

