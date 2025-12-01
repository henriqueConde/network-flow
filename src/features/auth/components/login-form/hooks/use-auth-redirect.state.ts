'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AUTH_ROUTES } from '@/features/auth/constants/auth.constants';

/**
 * Hook that redirects authenticated users away from auth pages.
 */
export function useAuthRedirect(isAuthenticated: boolean, nextPath?: string) {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      const target =
        nextPath && nextPath.startsWith('/') && !nextPath.startsWith('//')
          ? nextPath
          : AUTH_ROUTES.HOME;
      router.replace(target);
    }
  }, [isAuthenticated, nextPath, router]);
}

