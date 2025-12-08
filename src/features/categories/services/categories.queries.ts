import { useQuery } from '@tanstack/react-query';
import { listCategories, ensureDefaultCategories } from './categories.service';
import { categoriesKeys } from './categories.keys';

/**
 * Query hook for fetching all categories.
 * Automatically ensures default categories exist and migrates old categories.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useCategories() {
  return useQuery({
    queryKey: categoriesKeys.list(),
    queryFn: async () => {
      // Always call ensureDefaultCategories to handle migration of old categories
      // This will delete old default categories and create new ones if needed
      return await ensureDefaultCategories();
    },
    staleTime: 60_000, // Categories don't change often
    refetchOnWindowFocus: false,
  });
}

