'use client';

import { useCallback } from 'react';
import { useSignInWithGoogleMutation } from '@/features/auth/services/auth.mutations';
import { useAuthFormState } from './use-auth-form-state.state';

export interface UseGoogleSignInReturn {
  handleGoogleSignIn: () => void;
  isGoogleLoading: boolean;
  googleError: string | null;
}

/**
 * Hook that handles Google OAuth sign-in.
 */
export function useGoogleSignIn(): UseGoogleSignInReturn {
  const googleSignInMutation = useSignInWithGoogleMutation();
  const { error: googleError, setError } = useAuthFormState();

  const handleGoogleSignIn = useCallback(() => {
    setError(null);
    googleSignInMutation.mutate(undefined, {
      onError: (error) => {
        const errorMessage = error instanceof Error ? error.message : 'Google sign-in failed';
        setError(errorMessage);
      },
    });
  }, [googleSignInMutation, setError]);

  return {
    handleGoogleSignIn,
    isGoogleLoading: googleSignInMutation.isPending,
    googleError,
  };
}

