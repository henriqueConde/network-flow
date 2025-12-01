import { supabaseServer } from '@/backend/core/db/supabase-server';
import { headers } from 'next/headers';

/**
 * Gets the current user session from Supabase.
 * Supports both cookie-based sessions (browser) and Bearer token (API clients).
 */
export async function getSessionUser() {
  // Check for Bearer token first (for API clients)
  const headersList = await headers();
  const authHeader = headersList.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const supabase = await supabaseServer();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);
    if (user && !error) {
      return user;
    }
  }

  // Fall back to cookie-based session
  const supabase = await supabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session?.user ?? null;
}

