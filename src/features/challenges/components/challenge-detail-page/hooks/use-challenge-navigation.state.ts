import { useRouter } from 'next/navigation';

/**
 * UI state hook for challenge detail navigation.
 * Component-level hook for navigation handlers (no I/O).
 */
export function useChallengeDetailNavigation() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/challenges');
  };

  return {
    handleBack,
  };
}

