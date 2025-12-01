'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSignUpMutation, useCheckUserExistsMutation } from '@/features/auth/services/auth.mutations';
import { useAuthFormState } from '../../login-form/hooks/use-auth-form-state.state';
import { AUTH_ROUTES } from '@/features/auth/constants/auth.constants';
import { SIGNUP_FORM_CONFIG } from '../signup-form.config';
import type { SignupFormValues } from '../signup-form.schema';

export interface UseSignupFormActionsReturn {
  handleSubmit: (values: SignupFormValues) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

/**
 * Action hook that handles signup form submission with validation, error handling, and navigation.
 */
export function useSignupFormActions(nextPath?: string): UseSignupFormActionsReturn {
  const router = useRouter();
  const signUpMutation = useSignUpMutation();
  const checkUserExistsMutation = useCheckUserExistsMutation();
  const { error, successMessage, setError, setSuccessMessage, clearMessages } = useAuthFormState();

  const handleSubmit = useCallback(
    async (values: SignupFormValues) => {
      clearMessages();
      try {
        // Check if user exists before attempting signup
        const userExists = await checkUserExistsMutation.mutateAsync(values.email);

        if (userExists) {
          setError(SIGNUP_FORM_CONFIG.messages.error.userAlreadyExists);
          return;
        }

        // User doesn't exist - proceed with signup
        const result = await signUpMutation.mutateAsync({
          email: values.email,
          password: values.password,
        });

        if (result && !result.error) {
          setSuccessMessage(SIGNUP_FORM_CONFIG.messages.success.signupSuccess);

          const target =
            nextPath && nextPath.startsWith('/') && !nextPath.startsWith('//')
              ? nextPath
              : AUTH_ROUTES.HOME;

          router.replace(target);
        } else {
          const errorMessage = result?.error || SIGNUP_FORM_CONFIG.messages.error.signupFailed;
          setError(errorMessage);
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : SIGNUP_FORM_CONFIG.messages.error.signupFailed;
        setError(errorMessage);
      }
    },
    [signUpMutation, checkUserExistsMutation, nextPath, router, setError, setSuccessMessage, clearMessages],
  );

  return {
    handleSubmit,
    isLoading: signUpMutation.isPending || checkUserExistsMutation.isPending,
    error,
    successMessage,
  };
}

