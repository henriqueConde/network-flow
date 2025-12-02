import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Hook for Today page navigation handlers.
 * Handles all navigation logic for actions, messages, and overdue items.
 */
export function useTodayNavigation() {
  const router = useRouter();

  const handleActionClick = useCallback(
    (actionId: string, conversationId?: string) => {
      if (conversationId) {
        router.push(`/conversations/${conversationId}`);
      }
    },
    [router],
  );

  const handleMessageClick = useCallback(
    (messageId: string, conversationId: string) => {
      router.push(`/conversations/${conversationId}`);
    },
    [router],
  );

  const handleOverdueClick = useCallback(
    (itemId: string, conversationId: string) => {
      router.push(`/conversations/${conversationId}`);
    },
    [router],
  );

  return {
    handleActionClick,
    handleMessageClick,
    handleOverdueClick,
  };
}

