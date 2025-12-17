'use client';

import { useRouter } from 'next/navigation';
import { InterviewsListView } from './interviews-list.view';
import { useInterviewsList } from '../../services/interviews.queries';
import { INTERVIEWS_LIST_CONFIG } from './interviews-list.config';
import { useInterviewsFilters } from './hooks/use-interviews-filters.state';
import { useCategories } from '@/features/categories';

export function InterviewsListContainer() {
  const router = useRouter();

  // UI state hooks (no I/O)
  const {
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
  } = useInterviewsFilters();

  const { data: categories = [] } = useCategories();

  // Data fetching
  const { data = [], isLoading, error } = useInterviewsList({
    search: search || undefined,
    status,
    categoryId: categoryId || undefined,
    page,
    pageSize,
    sortBy,
    sortDir,
  });

  const handleRowClick = (conversationId: string) => {
    router.push(`/interviews/${conversationId}`);
  };

  return (
    <InterviewsListView
      interviews={data}
      isLoading={isLoading}
      error={error ? 'Failed to load interviews. Please try again.' : null}
      search={search}
      page={page}
      sortBy={sortBy}
      sortDir={sortDir}
      status={status}
      categoryId={categoryId}
      availableCategories={categories}
      config={INTERVIEWS_LIST_CONFIG}
      onSearchChange={handleSearchChange}
      onStatusChange={handleStatusChange}
      onCategoryChange={handleCategoryChange}
      onPageChange={handlePageChange}
      onSortChange={handleSortChange}
      onRowClick={handleRowClick}
    />
  );
}



