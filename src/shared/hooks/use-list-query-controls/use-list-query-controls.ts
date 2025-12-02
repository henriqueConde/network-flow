import { useState } from 'react';

type SortDirection = 'asc' | 'desc';

export interface UseListQueryControlsOptions<TSortBy extends string> {
  initialSearch?: string;
  initialPage?: number;
  initialPageSize?: number;
  initialSortBy: TSortBy;
  initialSortDir?: SortDirection;
}

export interface UseListQueryControlsResult<TSortBy extends string> {
  search: string;
  page: number;
  pageSize: number;
  sortBy: TSortBy;
  sortDir: SortDirection;
  setSearch: (value: string) => void;
  setPage: (page: number) => void;
  setSort: (sortBy: TSortBy, sortDir: SortDirection) => void;
}

/**
 * Generic UI hook for list/table query state:
 * - search term
 * - page & page size
 * - sort field & direction
 *
 * Pure UI state (no I/O). Reusable across pages.
 */
export function useListQueryControls<TSortBy extends string>(
  options: UseListQueryControlsOptions<TSortBy>,
): UseListQueryControlsResult<TSortBy> {
  const {
    initialSearch = '',
    initialPage = 1,
    initialPageSize = 20,
    initialSortBy,
    initialSortDir = 'desc',
  } = options;

  const [search, setSearchState] = useState(initialSearch);
  const [page, setPageState] = useState(initialPage);
  const [pageSize] = useState(initialPageSize);
  const [sortBy, setSortByState] = useState<TSortBy>(initialSortBy);
  const [sortDir, setSortDirState] = useState<SortDirection>(initialSortDir);

  const setSearch = (value: string) => {
    setSearchState(value);
    setPageState(1);
  };

  const setPage = (nextPage: number) => {
    setPageState(nextPage);
  };

  const setSort = (nextSortBy: TSortBy, nextSortDir: SortDirection) => {
    setSortByState(nextSortBy);
    setSortDirState(nextSortDir);
    setPageState(1);
  };

  return {
    search,
    page,
    pageSize,
    sortBy,
    sortDir,
    setSearch,
    setPage,
    setSort,
  };
}


