'use client';

import { useAuthContext } from '@/features/auth/context/AuthContext';
import { AppHeaderView } from './app-header.view';
import { APP_HEADER_CONFIG } from './app-header.config';

export function AppHeaderContainer() {
  const { signOut, email } = useAuthContext();

  return (
    <AppHeaderView
      userEmail={email}
      onSignOut={signOut}
      config={APP_HEADER_CONFIG}
    />
  );
}


