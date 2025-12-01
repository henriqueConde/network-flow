import type { ReactNode } from 'react';
import { Providers } from '@/shared/config/providers';
import { AuthProvider } from '@/features/auth/context/AuthContext';

export const metadata = {
  title: 'Next.js Template',
  description: 'Full-stack Next.js application template',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
      </body>
    </html>
  );
}

