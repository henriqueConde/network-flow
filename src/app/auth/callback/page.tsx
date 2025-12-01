'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useExchangeCodeForSessionMutation, useSyncServerSessionMutation } from '@/features/auth/services/auth.mutations';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const exchangeCodeMutation = useExchangeCodeForSessionMutation();
  const syncSessionMutation = useSyncServerSessionMutation();

  useEffect(() => {
    const code = searchParams.get('code');
    const next = searchParams.get('next') || '/';

    if (!code) {
      router.replace('/login?error=no_code');
      return;
    }

    const handleCallback = async () => {
      try {
        const result = await exchangeCodeMutation.mutateAsync(code);

        if (result?.data?.session) {
          // Sync session to server cookies
          await syncSessionMutation.mutateAsync({
            access_token: result.data.session.access_token,
            refresh_token: result.data.session.refresh_token,
          });

          // Redirect to the originally requested page or home
          router.replace(next);
        } else {
          router.replace('/login?error=authentication_failed');
        }
      } catch (error) {
        console.error('[auth/callback] Error:', error);
        router.replace('/login?error=authentication_failed');
      }
    };

    handleCallback();
  }, [searchParams, router, exchangeCodeMutation, syncSessionMutation]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
        Completing authentication...
      </Typography>
    </Box>
  );
}

