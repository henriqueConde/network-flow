import { useState } from 'react';
import { useListQueryControls } from '@/shared/hooks';

/**
 * UI state hook for Challenges Directory filters, pagination, and sorting.
 */
export function useChallengesFilters() {
  const [active, setActive] = useState<boolean | null>(null);

  const {
    search,
    page,
    pageSize,
    sortBy,
    sortDir,
    setSearch,
    setPage,
    setSort,
  } = useListQueryControls<'name' | 'startDate' | 'endDate' | 'updatedAt' | 'createdAt'>({
    initialSearch: '',
    initialPage: 1,
    initialPageSize: 20,
    initialSortBy: 'startDate',
    initialSortDir: 'desc',
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleActiveChange = (value: boolean | null) => {
    setActive(value);
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  const handleSortChange = (
    nextSortBy: 'name' | 'startDate' | 'endDate' | 'updatedAt' | 'createdAt',
    nextSortDir: 'asc' | 'desc',
  ) => {
    setSort(nextSortBy, nextSortDir);
  };

  return {
    search,
    active,
    page,
    pageSize,
    sortBy,
    sortDir,
    handleSearchChange,
    handleActiveChange,
    handlePageChange,
    handleSortChange,
  };
}

