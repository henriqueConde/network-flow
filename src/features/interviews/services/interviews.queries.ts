import { useQuery } from '@tanstack/react-query';
import { listInterviews, getInterviewDetail } from './interviews.service';
import { interviewsKeys } from './interviews.keys';

/**
 * Query hook for fetching interviews list.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useInterviewsList(params: {
  search?: string;
  status?: 'all' | 'needs_attention' | 'waiting_on_them';
  categoryId?: string;
  page: number;
  pageSize: number;
  sortBy: 'updatedAt' | 'lastMessageAt' | 'priority';
  sortDir: 'asc' | 'desc';
}) {
  return useQuery({
    queryKey: interviewsKeys.list(params),
    queryFn: () => listInterviews(params),
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });
}

/**
 * Query hook for fetching a single interview detail.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useInterviewDetail(id: string) {
  return useQuery({
    queryKey: interviewsKeys.detail(id),
    queryFn: () => getInterviewDetail(id),
    enabled: !!id,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });
}

