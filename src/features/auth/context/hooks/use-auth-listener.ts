'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabaseBrowser } from '@/shared/services/supabase-browser';
import { authKeys } from '@/features/auth/services/auth.keys';
import { syncServerSession } from '@/features/auth/services/auth.service';

/**
 * Listens to Supabase auth state changes and updates React Query cache.
 */
export function useAuthListener() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const supabase = supabaseBrowser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Update React Query cache
        queryClient.setQueryData(authKeys.user(), {
          id: session.user.id,
          email: session.user.email ?? undefined,
        });

        // Sync session to server cookies
        if (session.access_token && session.refresh_token) {
          await syncServerSession(session.access_token, session.refresh_token);
        }
      } else if (event === 'SIGNED_OUT') {
        // Clear React Query cache
        queryClient.setQueryData(authKeys.user(), null);
      }

      // Invalidate to trigger refetch
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [queryClient]);
}

