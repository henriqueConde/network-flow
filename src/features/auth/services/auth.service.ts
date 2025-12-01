// src/features/auth/services/auth.service.ts
import { z } from 'zod';
import { supabaseBrowser } from '@/shared/services/supabase-browser';

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email().optional(),
});

export type User = z.infer<typeof UserSchema>;

/**
 * Client-side: read session from the Supabase browser client.
 * This is the source of truth for the header/UI.
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const supabase = supabaseBrowser();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session?.user) return null;

    try {
      return UserSchema.parse({
        id: session.user.id,
        email: session.user.email ?? undefined,
      });
    } catch {
      return null;
    }
  } catch {
    return null;
  }
}

export async function signInWithPassword(email: string, password: string) {
  const supabase = supabaseBrowser();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data; // { user, session }
}

/**
 * Sign in with Google OAuth.
 * This will redirect the user to Google's authentication page.
 * After authentication, Google will redirect back to the callback URL.
 */
export async function signInWithGoogle(options?: { redirectTo?: string }) {
  const supabase = supabaseBrowser();
  // Redirect to client-side callback page to handle PKCE code exchange
  const redirectTo = options?.redirectTo || `${window.location.origin}/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (error) throw error;
  return data; // { url } - the OAuth URL to redirect to
}

/**
 * Server session synchronization: syncs client session to server cookies.
 * Non-fatal: failures are silently handled.
 */
export async function syncServerSession(
  access_token?: string,
  refresh_token?: string,
): Promise<void> {
  if (!access_token || !refresh_token) return;

  try {
    await fetch('/api/auth/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ access_token, refresh_token }),
    });
  } catch {
    // non-fatal - session sync failure shouldn't break the app
  }
}

/**
 * Check if a user exists by email.
 * Returns true if user exists, false otherwise.
 */
export async function checkUserExists(email: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/auth/check-user?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.exists === true;
  } catch (error) {
    console.error('[checkUserExists] Error checking user existence:', error);
    return false;
  }
}

export async function signUp(email: string, password: string) {
  // Call server-side signup endpoint which handles both Supabase Auth and Prisma user creation
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Signup failed' }));
    throw new Error(error.error || 'Signup failed');
  }

  const data = await response.json();

  // Sync session to client if we got a session back
  if (data.session?.access_token && data.session?.refresh_token) {
    const supabase = supabaseBrowser();
    await supabase.auth.setSession({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    });
  }

  return data;
}

/**
 * Client-side sign-out: clears local storage session.
 */
export async function signOut() {
  const supabase = supabaseBrowser();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Server-side sign-out: clears cookies & revokes session on server.
 * Idempotent: returns success even if no session exists.
 */
export async function signOutServer(): Promise<{ ok: boolean }> {
  const response = await fetch('/api/auth/signout', {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Server sign-out failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Exchange OAuth code for session (PKCE flow).
 */
export async function exchangeCodeForSession(code: string) {
  const supabase = supabaseBrowser();
  const result = await supabase.auth.exchangeCodeForSession(code);

  if (result.error || !result.data?.session) {
    // Wait a moment for Supabase to process the session
    let retries = 3;
    let existingSession = null;

    while (retries > 0 && !existingSession) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        existingSession = session;
        break;
      }
      retries--;
    }

    if (existingSession?.user) {
      return {
        data: { user: existingSession.user, session: existingSession },
        error: null,
      };
    }

    return {
      data: null,
      error: result.error || new Error('Failed to establish session'),
    };
  }

  return result;
}

