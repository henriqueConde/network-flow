import { useState } from 'react';
import { useListQueryControls } from '@/shared/hooks';

/**
 * UI state hook for Contacts Directory filters, pagination, and sorting.
 * Component-level; no data fetching or I/O.
 */
export function useContactsFilters() {
  const [company, setCompany] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [stageId, setStageId] = useState<string | null>(null);
  const [primaryPlatform, setPrimaryPlatform] = useState<string | null>(null);

  const {
    search,
    page,
    pageSize,
    sortBy,
    sortDir,
    setSearch,
    setPage,
    setSort,
  } = useListQueryControls<'name' | 'company' | 'updatedAt' | 'createdAt'>({
    initialSearch: '',
    initialPage: 1,
    initialPageSize: 20,
    initialSortBy: 'name',
    initialSortDir: 'asc',
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleCompanyChange = (value: string) => {
    setCompany(value);
    setPage(1);
  };

  const handleCategoryChange = (value: string | null) => {
    setCategoryId(value);
    setPage(1);
  };

  const handleStageChange = (value: string | null) => {
    setStageId(value);
    setPage(1);
  };

  const handlePlatformChange = (value: string | null) => {
    setPrimaryPlatform(value);
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  const handleSortChange = (
    nextSortBy: 'name' | 'company' | 'updatedAt' | 'createdAt',
    nextSortDir: 'asc' | 'desc',
  ) => {
    setSort(nextSortBy, nextSortDir);
  };

  return {
    search,
    company,
    categoryId,
    stageId,
    primaryPlatform,
    page,
    pageSize,
    sortBy,
    sortDir,
    handleSearchChange,
    handleCompanyChange,
    handleCategoryChange,
    handleStageChange,
    handlePlatformChange,
    handlePageChange,
    handleSortChange,
  };
}

