import { useQuery } from '@tanstack/react-query';
import { listCompanies, getCompanyDetail } from './companies.service';
import { companiesKeys } from './companies.keys';

/**
 * Query hook for fetching companies list (directory).
 */
export function useCompaniesList(params: {
  search?: string;
  industry?: string;
  fundingRound?: string;
  hasRelevantRole?: boolean;
  applied?: boolean;
  page: number;
  pageSize: number;
  sortBy: 'name' | 'fundingDate' | 'updatedAt' | 'createdAt';
  sortDir: 'asc' | 'desc';
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: companiesKeys.list(params),
    queryFn: () => listCompanies(params),
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    enabled: params.enabled !== false,
  });
}

/**
 * Query hook for fetching a single company detail.
 */
export function useCompanyDetail(id: string) {
  return useQuery({
    queryKey: companiesKeys.detail(id),
    queryFn: () => getCompanyDetail(id),
    enabled: !!id,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });
}

