'use client';

import { useAuthContext } from '@/features/auth/context/AuthContext';
import { HomePageView } from './home-page.view';

export function HomePageContainer() {
  const { signOut, email } = useAuthContext();

  return <HomePageView onSignOut={signOut} userEmail={email} />;
}

