import { useQuery } from '@tanstack/react-query';
import { listOpportunities, getOpportunityDetail } from './opportunities.service';
import { opportunitiesKeys } from './opportunities.keys';

/**
 * Query hook for fetching opportunities list.
 */
export function useOpportunitiesList(params: {
  search?: string;
  categoryId?: string;
  stageId?: string;
  page: number;
  pageSize: number;
  sortBy: 'updatedAt' | 'nextActionDueAt' | 'priority';
  sortDir: 'asc' | 'desc';
}) {
  return useQuery({
    queryKey: opportunitiesKeys.list(params),
    queryFn: () => listOpportunities(params),
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });
}

/**
 * Query hook for fetching a single opportunity detail.
 */
export function useOpportunityDetail(id: string) {
  return useQuery({
    queryKey: opportunitiesKeys.detail(id),
    queryFn: () => getOpportunityDetail(id),
    enabled: !!id,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });
}

