import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Hook for Today page navigation handlers.
 * Handles all navigation logic for actions and overdue items.
 */
export function useTodayNavigation() {
  const router = useRouter();

  const handleActionClick = useCallback(
    (actionId: string, conversationId?: string) => {
      // Special handling for "seek opportunities" action
      if (actionId === 'seek-opportunities') {
        // Navigate to contacts page to add new opportunities
        router.push('/contacts');
        return;
      }
      
      if (conversationId) {
        router.push(`/conversations/${conversationId}`);
      }
    },
    [router],
  );

  const handleOverdueClick = useCallback(
    (itemId: string, conversationId?: string) => {
      if (conversationId) {
        router.push(`/conversations/${conversationId}`);
      }
    },
    [router],
  );

  const handleInterviewsClick = useCallback(() => {
    router.push('/interviews');
  }, [router]);

  return {
    handleActionClick,
    handleOverdueClick,
    handleInterviewsClick,
  };
}

