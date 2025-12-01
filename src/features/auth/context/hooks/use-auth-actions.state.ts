'use client';

import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useSignInPasswordMutation, useSignUpMutation, useSignOutMutation, useSignOutServerMutation } from '@/features/auth/services/auth.mutations';
import { authKeys } from '@/features/auth/services/auth.keys';
import { syncServerSession } from '@/features/auth/services/auth.service';
import { AUTH_ROUTES } from '@/features/auth/constants/auth.constants';

export function useAuthActions() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const signInPasswordMutation = useSignInPasswordMutation();
  const signUpMutation = useSignUpMutation();
  const signOutMutation = useSignOutMutation();
  const signOutServerMutation = useSignOutServerMutation();

  const signIn = async (email: string) => {
    // OTP sign-in can be implemented here if needed
    throw new Error('OTP sign-in not implemented');
  };

  const signOut = async () => {
    // Sign out from both client and server
    await Promise.all([signOutMutation.mutateAsync(), signOutServerMutation.mutateAsync()]);
    router.push(AUTH_ROUTES.LOGIN);
  };

  const signInWithPassword = async (email: string, password: string) => {
    const { user: signedInUser, session } = await signInPasswordMutation.mutateAsync({
      email,
      password,
    });

    if (signedInUser || session?.user) {
      const u = signedInUser ?? session!.user!;
      queryClient.setQueryData(authKeys.user(), {
        id: u.id,
        email: u.email ?? undefined,
      });
      queryClient.invalidateQueries({ queryKey: authKeys.user(), refetchType: 'active' });
    }

    // Sync server cookies so SSR/middleware see you as logged in
    await syncServerSession(session?.access_token, session?.refresh_token);
  };

  const signUp = async (email: string, password: string) => {
    await signUpMutation.mutateAsync({ email, password });
  };

  return {
    signIn,
    signOut,
    signInWithPassword,
    signUp,
  };
}

