import { useState } from 'react';
import type { InterviewsListFilterStatus } from '../interviews-list.types';
import { useListQueryControls } from '@/shared/hooks';

/**
 * UI state hook for Interviews List filters, pagination, and sorting.
 * Component-level; no data fetching or I/O.
 */
export function useInterviewsFilters() {
  const [status, setStatus] = useState<InterviewsListFilterStatus>('all');
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const {
    search,
    page,
    pageSize,
    sortBy,
    sortDir,
    setSearch,
    setPage,
    setSort,
  } = useListQueryControls<'updatedAt' | 'lastMessageAt' | 'priority'>({
    initialSearch: '',
    initialPage: 1,
    initialPageSize: 20,
    initialSortBy: 'updatedAt',
    initialSortDir: 'desc',
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleStatusChange = (value: InterviewsListFilterStatus) => {
    setStatus(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string | null) => {
    setCategoryId(value);
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  const handleSortChange = (
    nextSortBy: 'updatedAt' | 'lastMessageAt' | 'priority',
    nextSortDir: 'asc' | 'desc',
  ) => {
    setSort(nextSortBy, nextSortDir);
  };

  return {
    search,
    status,
    categoryId,
    page,
    pageSize,
    sortBy,
    sortDir,
    handleSearchChange,
    handleStatusChange,
    handleCategoryChange,
    handlePageChange,
    handleSortChange,
  };
}




