import { QueryClient } from '@tanstack/react-query';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        // Ensure queries don't hang indefinitely
        gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
        staleTime: 0, // Default to consider data stale immediately
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

