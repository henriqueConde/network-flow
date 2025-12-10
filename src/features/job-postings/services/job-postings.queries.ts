import { useQuery } from '@tanstack/react-query';
import { listJobPostings, getJobPostingDetail } from './job-postings.service';
import { jobPostingsKeys } from './job-postings.keys';

/**
 * Query hook for fetching job postings list (directory).
 */
export function useJobPostingsList(params: {
  search?: string;
  source?: 'linkedin_post' | 'linkedin_job' | 'other';
  companyId?: string;
  outreachDone?: boolean;
  page: number;
  pageSize: number;
  sortBy: 'jobTitle' | 'postedAt' | 'updatedAt' | 'createdAt';
  sortDir: 'asc' | 'desc';
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: jobPostingsKeys.list(params),
    queryFn: () => listJobPostings(params),
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    enabled: params.enabled !== false,
  });
}

/**
 * Query hook for fetching a single job posting detail.
 */
export function useJobPostingDetail(id: string) {
  return useQuery({
    queryKey: jobPostingsKeys.detail(id),
    queryFn: () => getJobPostingDetail(id),
    enabled: !!id,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });
}


