import { useState } from 'react';
import { useListQueryControls } from '@/shared/hooks';

/**
 * UI state hook for Contacts Directory filters, pagination, and sorting.
 * Component-level; no data fetching or I/O.
 */
export function useContactsFilters() {
  const [company, setCompany] = useState<string>('');
  const [primaryPlatform, setPrimaryPlatform] = useState<string | null>(null);
  const [warmOrCold, setWarmOrCold] = useState<'warm' | 'cold' | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'not_connected' | 'request_sent' | 'connected' | null>(null);
  const [contactType, setContactType] = useState<string>('');

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

  const handlePlatformChange = (value: string | null) => {
    setPrimaryPlatform(value);
    setPage(1);
  };

  const handleWarmOrColdChange = (value: 'warm' | 'cold' | null) => {
    setWarmOrCold(value);
    setPage(1);
  };

  const handleConnectionStatusChange = (value: 'not_connected' | 'request_sent' | 'connected' | null) => {
    setConnectionStatus(value);
    setPage(1);
  };

  const handleContactTypeChange = (value: string) => {
    setContactType(value);
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
    primaryPlatform,
    warmOrCold,
    connectionStatus,
    contactType,
    page,
    pageSize,
    sortBy,
    sortDir,
    handleSearchChange,
    handleCompanyChange,
    handlePlatformChange,
    handleWarmOrColdChange,
    handleConnectionStatusChange,
    handleContactTypeChange,
    handlePageChange,
    handleSortChange,
  };
}



