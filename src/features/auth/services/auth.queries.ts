import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from './auth.service';
import { authKeys } from './auth.keys';

/**
 * Query hook for fetching the current authenticated user.
 */
export function useAuthQuery() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: getCurrentUser,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });
}

