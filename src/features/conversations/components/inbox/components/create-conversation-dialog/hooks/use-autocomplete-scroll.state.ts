import { useCallback, useRef, useEffect } from 'react';

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
  // Guard to avoid firing multiple load-more requests for a single "bottom reach"
  const hasPendingLoadMoreRef = useRef(false);

  // When loading finishes, allow another load-more on the next bottom reach
  useEffect(() => {
    if (!isLoading) {
      hasPendingLoadMoreRef.current = false;
    }
  }, [isLoading]);

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
        !isLoading &&
        !hasPendingLoadMoreRef.current
      ) {
        hasPendingLoadMoreRef.current = true;
        onLoadMore();
      }
    },
    [hasMore, isLoading, onLoadMore],
  );

  return {
    handleScroll,
  };
}

