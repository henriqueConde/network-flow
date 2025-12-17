import { useQuery } from '@tanstack/react-query';
import { listScheduledFollowups } from './followups.service';
import { followupsKeys } from './followups.keys';

/**
 * Query hook for fetching scheduled follow-ups.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useScheduledFollowups() {
  return useQuery({
    queryKey: followupsKeys.list(),
    queryFn: () => listScheduledFollowups(),
    staleTime: 60_000, // 1 minute
  });
}



