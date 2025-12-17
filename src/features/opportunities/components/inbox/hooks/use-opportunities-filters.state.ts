'use client';

import { useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export function useOpportunitiesFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [categoryId, setCategoryId] = useState<string | null>(
    searchParams.get('categoryId') || null
  );
  const [stageId, setStageId] = useState<string | null>(
    searchParams.get('stageId') || null
  );
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [pageSize] = useState(20);
  const [sortBy, setSortBy] = useState<'updatedAt' | 'nextActionDueAt' | 'priority'>(
    (searchParams.get('sortBy') as any) || 'updatedAt'
  );
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>(
    (searchParams.get('sortDir') as any) || 'desc'
  );

  const updateUrl = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '' || value === '1') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      router.push(`/opportunities?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value);
      setPage(1);
      updateUrl({ search: value || null, page: '1' });
    },
    [updateUrl]
  );

  const handleCategoryChange = useCallback(
    (value: string | null) => {
      setCategoryId(value);
      setPage(1);
      updateUrl({ categoryId: value, page: '1' });
    },
    [updateUrl]
  );

  const handleStageChange = useCallback(
    (value: string | null) => {
      setStageId(value);
      setPage(1);
      updateUrl({ stageId: value, page: '1' });
    },
    [updateUrl]
  );

  const handlePageChange = useCallback(
    (value: number) => {
      setPage(value);
      updateUrl({ page: value.toString() });
    },
    [updateUrl]
  );

  const handleSortChange = useCallback(
    (newSortBy: 'updatedAt' | 'nextActionDueAt' | 'priority', newSortDir: 'asc' | 'desc') => {
      setSortBy(newSortBy);
      setSortDir(newSortDir);
      updateUrl({ sortBy: newSortBy, sortDir: newSortDir });
    },
    [updateUrl]
  );

  return {
    search,
    categoryId,
    stageId,
    page,
    pageSize,
    sortBy,
    sortDir,
    handleSearchChange,
    handleCategoryChange,
    handleStageChange,
    handlePageChange,
    handleSortChange,
  };
}



