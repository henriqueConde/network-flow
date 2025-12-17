import { useRouter, useParams } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Hook for interview detail page navigation.
 * Handles back navigation and related item navigation.
 */
export function useInterviewDetailNavigation() {
  const router = useRouter();
  const params = useParams();
  const interviewId = params?.id as string | undefined;

  const handleBack = useCallback(() => {
    router.push('/interviews');
  }, [router]);

  const handleRelatedConversationClick = useCallback(
    (conversationId: string) => {
      router.push(`/conversations/${conversationId}`);
    },
    [router],
  );

  const handleRelatedContactClick = useCallback(
    (contactId: string) => {
      router.push(`/contacts/${contactId}`);
    },
    [router],
  );

  return {
    interviewId: interviewId || '',
    handleBack,
    handleRelatedConversationClick,
    handleRelatedContactClick,
  };
}



