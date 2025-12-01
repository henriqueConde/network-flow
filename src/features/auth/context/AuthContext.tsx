'use client';

import { createContext, useContext, useMemo } from 'react';
import { useAuthQuery } from '@/features/auth/services/auth.queries';
import { useAuthListener } from './hooks/use-auth-listener';
import { useAuthActions } from './hooks/use-auth-actions.state';

type AuthContextValue = {
  isLoading: boolean;
  isAuthenticated: boolean;
  email?: string | null;
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading, fetchStatus } = useAuthQuery();
  const authActions = useAuthActions();

  // Set up auth state listener
  useAuthListener();

  const isActuallyLoading = isLoading && fetchStatus === 'fetching' && user === undefined;

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoading: isActuallyLoading,
      isAuthenticated: !!user,
      email: user?.email ?? null,
      ...authActions,
    }),
    [isActuallyLoading, user, authActions],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}

