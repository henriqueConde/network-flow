import { useQuery } from '@tanstack/react-query';
import { listCategories, ensureDefaultCategories } from './categories.service';
import { categoriesKeys } from './categories.keys';

/**
 * Query hook for fetching all categories.
 * Automatically ensures default categories exist if none are found.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useCategories() {
  return useQuery({
    queryKey: categoriesKeys.list(),
    queryFn: async () => {
      const categories = await listCategories();
      // If no categories exist, ensure defaults are created
      if (categories.length === 0) {
        return await ensureDefaultCategories();
      }
      return categories;
    },
    staleTime: 60_000, // Categories don't change often
    refetchOnWindowFocus: false,
  });
}

