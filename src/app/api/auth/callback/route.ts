import { NextRequest, NextResponse } from 'next/server';
import { supabaseServerMutable } from '@/backend/core/db/supabase-server-mutable';
import { ensureUserAfterOAuth } from '@/backend/features/auth';

/**
 * OAuth callback handler for Supabase authentication (thin controller).
 * This route handles the redirect from OAuth providers (e.g., Google) after authentication.
 */
export async function GET(req: NextRequest) {
  try {
    const requestUrl = new URL(req.url);
    const code = requestUrl.searchParams.get('code');
    const next = requestUrl.searchParams.get('next') || '/';

    if (code) {
      const supabase = await supabaseServerMutable();

      // Exchange the code for a session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error('[auth/callback] Error exchanging code for session:', error);
        // Redirect to login with error
        const loginUrl = new URL('/login', requestUrl.origin);
        loginUrl.searchParams.set('error', 'authentication_failed');
        return NextResponse.redirect(loginUrl);
      }

      if (data?.user) {
        // Ensure user exists in Prisma database
        try {
          await ensureUserAfterOAuth({
            userId: data.user.id,
            email: data.user.email || '',
            name:
              data.user.user_metadata?.full_name ||
              data.user.user_metadata?.name ||
              data.user.user_metadata?.display_name ||
              null,
          });
        } catch (userError) {
          // Log but don't fail - user exists in Supabase Auth
          console.error('[auth/callback] Failed to ensure user in Prisma:', userError);
        }

        // Redirect to the originally requested page or home
        const redirectUrl = new URL(next, requestUrl.origin);
        return NextResponse.redirect(redirectUrl);
      }
    }

    // If no code, redirect to login
    const loginUrl = new URL('/login', requestUrl.origin);
    return NextResponse.redirect(loginUrl);
  } catch (error) {
    console.error('[auth/callback] Unexpected error:', error);
    const requestUrl = new URL(req.url);
    const loginUrl = new URL('/login', requestUrl.origin);
    loginUrl.searchParams.set('error', 'unexpected_error');
    return NextResponse.redirect(loginUrl);
  }
}

