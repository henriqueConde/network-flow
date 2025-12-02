import { useRouter, useParams } from 'next/navigation';

/**
 * UI state hook for conversation detail navigation.
 * Component-level hook for routing concerns only (no I/O).
 */
export function useConversationDetailNavigation() {
  const router = useRouter();
  const params = useParams();
  const conversationId = params?.id as string;

  const handleBack = () => {
    router.push('/conversations');
  };

  return {
    conversationId,
    handleBack,
  };
}

