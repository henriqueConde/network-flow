'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  useSignInPasswordMutation,
  useSyncServerSessionMutation,
} from '@/features/auth/services/auth.mutations';
import { useAuthFormState } from './use-auth-form-state.state';
import { AUTH_ROUTES } from '@/features/auth/constants/auth.constants';
import { LOGIN_FORM_CONFIG } from '../login-form.config';
import type { LoginFormValues } from '../login-form.schema';

export interface UseLoginFormActionsReturn {
  handleSubmit: (values: LoginFormValues) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Action hook that handles login form submission with validation, error handling, and navigation.
 */
export function useLoginFormActions(nextPath?: string): UseLoginFormActionsReturn {
  const router = useRouter();
  const signInPasswordMutation = useSignInPasswordMutation();
  const syncServerSessionMutation = useSyncServerSessionMutation();
  const { error, setError, clearMessages } = useAuthFormState();

  const handleSubmit = useCallback(
    async (values: LoginFormValues) => {
      clearMessages();
      try {
        const data = await signInPasswordMutation.mutateAsync({
          email: values.email,
          password: values.password,
        });

        // Ensure server-side Supabase cookies are in sync before navigating
        const accessToken = data?.session?.access_token;
        const refreshToken = data?.session?.refresh_token;

        if (accessToken && refreshToken) {
          await syncServerSessionMutation.mutateAsync({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
        }

        // Honor the desired next path when provided, otherwise go to HOME.
        const target =
          nextPath && nextPath.startsWith('/') && !nextPath.startsWith('//')
            ? nextPath
            : AUTH_ROUTES.HOME;

        router.replace(target);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : LOGIN_FORM_CONFIG.messages.error.loginFailed;
        setError(errorMessage);
      }
    },
    [signInPasswordMutation, syncServerSessionMutation, nextPath, router, setError, clearMessages],
  );

  return {
    handleSubmit,
    isLoading: signInPasswordMutation.isPending,
    error,
  };
}

