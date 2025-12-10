import { useQuery } from '@tanstack/react-query';
import { listChallenges, getChallengeDetail } from './challenges.service';
import { challengesKeys } from './challenges.keys';

/**
 * Query hook for fetching challenges list (directory).
 */
export function useChallengesList(params: {
  search?: string;
  active?: boolean;
  page: number;
  pageSize: number;
  sortBy: 'name' | 'startDate' | 'endDate' | 'updatedAt' | 'createdAt';
  sortDir: 'asc' | 'desc';
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: challengesKeys.list(params),
    queryFn: () => listChallenges(params),
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    enabled: params.enabled !== false,
  });
}

/**
 * Query hook for fetching a single challenge detail.
 */
export function useChallengeDetail(id: string) {
  return useQuery({
    queryKey: challengesKeys.detail(id),
    queryFn: () => getChallengeDetail(id),
    enabled: !!id,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });
}


