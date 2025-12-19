import { useState } from 'react';
import { useListQueryControls } from '@/shared/hooks';

/**
 * UI state hook for Companies Directory filters, pagination, and sorting.
 * Component-level; no data fetching or I/O.
 */
export function useCompaniesFilters() {
  const [industry, setIndustry] = useState<string>('');
  const [fundingRound, setFundingRound] = useState<string | null>(null);
  const [hasRelevantRole, setHasRelevantRole] = useState<boolean | null>(null);
  const [applied, setApplied] = useState<boolean | null>(null);

  const {
    search,
    page,
    pageSize,
    sortBy,
    sortDir,
    setSearch,
    setPage,
    setSort,
  } = useListQueryControls<'name' | 'fundingDate' | 'updatedAt' | 'createdAt'>({
    initialSearch: '',
    initialPage: 1,
    initialPageSize: 20,
    initialSortBy: 'name',
    initialSortDir: 'asc',
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleIndustryChange = (value: string) => {
    setIndustry(value);
    setPage(1);
  };

  const handleFundingRoundChange = (value: string | null) => {
    setFundingRound(value);
    setPage(1);
  };

  const handleHasRelevantRoleChange = (value: boolean | null) => {
    setHasRelevantRole(value);
    setPage(1);
  };

  const handleAppliedChange = (value: boolean | null) => {
    setApplied(value);
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
  };

  const handleSortChange = (
    nextSortBy: 'name' | 'fundingDate' | 'updatedAt' | 'createdAt',
    nextSortDir: 'asc' | 'desc',
  ) => {
    setSort(nextSortBy, nextSortDir);
  };

  return {
    search,
    industry,
    fundingRound,
    hasRelevantRole,
    applied,
    page,
    pageSize,
    sortBy,
    sortDir,
    handleSearchChange,
    handleIndustryChange,
    handleFundingRoundChange,
    handleHasRelevantRoleChange,
    handleAppliedChange,
    handlePageChange,
    handleSortChange,
  };
}




