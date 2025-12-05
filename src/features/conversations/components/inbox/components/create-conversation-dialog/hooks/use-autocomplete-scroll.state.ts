import { useCallback } from 'react';

/**
 * UI state hook for autocomplete infinite scroll.
 * Handles scroll detection and triggers load more callback.
 * Component-level hook for event handlers only (no I/O).
 */
export function useAutocompleteScroll(
  hasMore: boolean,
  isLoading: boolean,
  onLoadMore?: () => void,
) {
  const handleScroll = useCallback(
    (event: React.UIEvent<HTMLUListElement>) => {
      if (!onLoadMore) return;

      const listbox = event.currentTarget;
      const scrollTop = listbox.scrollTop;
      const scrollHeight = listbox.scrollHeight;
      const clientHeight = listbox.clientHeight;

      // Load more when user scrolls within 100px of the bottom
      if (
        scrollHeight - scrollTop - clientHeight < 100 &&
        hasMore &&
        !isLoading
      ) {
        onLoadMore();
      }
    },
    [hasMore, isLoading, onLoadMore],
  );

  return {
    handleScroll,
  };
}

