import { useState, useMemo, useCallback } from 'react';

export type TaskCompletionFilter = 'all' | 'open' | 'completed';
export type TaskDueDateFilter = 'all' | 'today' | 'overdue' | 'upcoming';
export type TaskPriorityFilter = 'all' | 'low' | 'medium' | 'high';

type FiltersState = {
  completion: TaskCompletionFilter;
  dueDate: TaskDueDateFilter;
  priority: TaskPriorityFilter;
};

const DEFAULT_FILTERS: FiltersState = {
  completion: 'all',
  dueDate: 'all',
  priority: 'all',
};

export function useTasksFilters() {
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);

  const setCompletion = useCallback((value: TaskCompletionFilter) => {
    setFilters((prev) => ({ ...prev, completion: value }));
  }, []);

  const setDueDate = useCallback((value: TaskDueDateFilter) => {
    setFilters((prev) => ({ ...prev, dueDate: value }));
  }, []);

  const setPriority = useCallback((value: TaskPriorityFilter) => {
    setFilters((prev) => ({ ...prev, priority: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const hasCustomFilters = useMemo(() => {
    return (
      filters.completion !== DEFAULT_FILTERS.completion ||
      filters.dueDate !== DEFAULT_FILTERS.dueDate ||
      filters.priority !== DEFAULT_FILTERS.priority
    );
  }, [filters.completion, filters.dueDate, filters.priority]);

  return {
    filters,
    setCompletion,
    setDueDate,
    setPriority,
    clearFilters,
    hasCustomFilters,
  };
}

