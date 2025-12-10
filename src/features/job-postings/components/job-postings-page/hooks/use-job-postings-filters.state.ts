import { useState } from 'react';
import { useListQueryControls } from '@/shared/hooks';

/**
 * UI state hook for Job Postings Directory filters, pagination, and sorting.
 */
export function useJobPostingsFilters() {
  const [source, setSource] = useState<'linkedin_post' | 'linkedin_job' | 'other' | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [outreachDone, setOutreachDone] = useState<boolean | null>(null);

  const {
    search,
    page,
    pageSize,
    sortBy,
    sortDir,
    setSearch,
    setPage,
    setSort,
  } = useListQueryControls<'jobTitle' | 'postedAt' | 'updatedAt' | 'createdAt'>({
    initialSearch: '',
    initialPage: 1,
    initialPageSize: 20,
    initialSortBy: 'postedAt',
    initialSortDir: 'desc',
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleSourceChange = (value: 'linkedin_post' | 'linkedin_job' | 'other' | null) => {
    setSource(value);
    setPage(1);
  };

  const handleCompanyIdChange = (value: string | null) => {
    setCompanyId(value);
    setPage(1);
  };

  const handleOutreachDoneChange = (value: boolean | null) => {
    setOutreachDone(value);
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  const handleSortChange = (
    nextSortBy: 'jobTitle' | 'postedAt' | 'updatedAt' | 'createdAt',
    nextSortDir: 'asc' | 'desc',
  ) => {
    setSort(nextSortBy, nextSortDir);
  };

  return {
    search,
    source,
    companyId,
    outreachDone,
    page,
    pageSize,
    sortBy,
    sortDir,
    handleSearchChange,
    handleSourceChange,
    handleCompanyIdChange,
    handleOutreachDoneChange,
    handlePageChange,
    handleSortChange,
  };
}


