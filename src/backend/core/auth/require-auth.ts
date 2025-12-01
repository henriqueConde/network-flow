import { getSessionUser } from './get-session';
import { redirect } from 'next/navigation';

/**
 * Requires authentication. Redirects to login if not authenticated.
 * Use in Server Components or Route Handlers.
 */
export async function requireAuth() {
  const user = await getSessionUser();
  if (!user) {
    redirect('/login');
  }
  return user;
}

