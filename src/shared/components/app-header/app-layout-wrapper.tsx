'use client';

import { useAuthContext } from '@/features/auth/context/AuthContext';
import { usePathname } from 'next/navigation';
import { AppHeaderContainer } from './app-header.container';
import { DesktopOnlyCheckContainer } from '../desktop-only-check/desktop-only-check.container';
import { Box } from '@mui/material';

const PUBLIC_PAGES = ['/login', '/signup', '/auth/callback'];

export function AppLayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const pathname = usePathname();

  // Don't show header on public pages or while loading auth state
  const shouldShowHeader = isAuthenticated && !PUBLIC_PAGES.includes(pathname) && !isLoading;

  return (
    <>
      <DesktopOnlyCheckContainer />
      {shouldShowHeader && <AppHeaderContainer />}
      <Box component="main" sx={{ minHeight: '100vh' }}>
        {children}
      </Box>
    </>
  );
}






