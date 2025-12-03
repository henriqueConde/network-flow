import { useRouter } from 'next/navigation';

/**
 * UI state hook for contact detail navigation.
 * Component-level hook for navigation handlers (no I/O).
 */
export function useContactDetailNavigation() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/contacts');
  };

  const handleGoToConversation = (conversationId: string) => {
    router.push(`/conversations/${conversationId}`);
  };

  return {
    handleBack,
    handleGoToConversation,
  };
}

