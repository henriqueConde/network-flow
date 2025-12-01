import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  signInWithPassword,
  signUp,
  signOut,
  signOutServer,
  signInWithGoogle,
  exchangeCodeForSession,
  syncServerSession,
  checkUserExists,
} from './auth.service';
import { authKeys } from './auth.keys';

/**
 * Mutation hook for password-based sign-in.
 */
export function useSignInPasswordMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signInWithPassword(email, password),
    onSuccess: (data) => {
      if (data?.user) {
        queryClient.setQueryData(authKeys.user(), {
          id: data.user.id,
          email: data.user.email ?? undefined,
        });
      }
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
  });
}

/**
 * Mutation hook for checking if a user exists by email.
 */
export function useCheckUserExistsMutation() {
  return useMutation({
    mutationFn: (email: string) => checkUserExists(email),
  });
}

/**
 * Mutation hook for user sign-up.
 */
export function useSignUpMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      signUp(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
  });
}

/**
 * Mutation hook for client-side sign-out.
 */
export function useSignOutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      queryClient.setQueryData(authKeys.user(), null);
      queryClient.invalidateQueries({ queryKey: authKeys.user(), refetchType: 'active' });
    },
  });
}

/**
 * Mutation hook for server-side sign-out.
 */
export function useSignOutServerMutation() {
  return useMutation({
    mutationFn: () => signOutServer(),
    onError: () => {
      // Silently handle errors - sign-out should be idempotent
    },
  });
}

/**
 * Mutation hook for Google OAuth sign-in.
 */
export function useSignInWithGoogleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (options?: { redirectTo?: string }) => signInWithGoogle(options),
    onSuccess: (data) => {
      if (data?.url) {
        window.location.href = data.url;
      }
    },
    onError: (error) => {
      console.error('[useSignInWithGoogleMutation] Error:', error);
    },
  });
}

/**
 * Mutation hook for exchanging OAuth code for session.
 */
export function useExchangeCodeForSessionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) => exchangeCodeForSession(code),
    onSuccess: (data) => {
      if (data?.data?.user) {
        queryClient.setQueryData(authKeys.user(), {
          id: data.data.user.id,
          email: data.data.user.email ?? undefined,
        });
        queryClient.invalidateQueries({ queryKey: authKeys.user() });
      }
    },
  });
}

/**
 * Mutation hook for syncing session to server cookies.
 */
export function useSyncServerSessionMutation() {
  return useMutation({
    mutationFn: (params: { access_token: string; refresh_token: string }) =>
      syncServerSession(params.access_token, params.refresh_token),
    onError: () => {
      // Silently handle errors
    },
  });
}

