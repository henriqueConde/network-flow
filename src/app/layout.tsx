import type { ReactNode } from 'react';
import { Providers } from '@/shared/config/providers';
import { AuthProvider } from '@/features/auth/context/AuthContext';
import { AppLayoutWrapper } from '@/shared/components/app-header/app-layout-wrapper';

// Force dynamic rendering to ensure middleware runs before any rendering
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Network Flow',
  description: 'AI-powered secretary for your networking and job-hunt pipeline',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthProvider>
            <AppLayoutWrapper>{children}</AppLayoutWrapper>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}

