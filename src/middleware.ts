// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

/**
 * Auth-enforcing middleware for protected routes.
 * - For API routes: returns 401 if no session
 * - For app routes: redirects to /login?next=... if no session
 * - Public routes: /api/health, /api/auth/*, /login, /signup, /auth/callback
 */
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Skip public endpoints
  const publicPaths = [
    '/api/health',
    '/api/auth/sync',
    '/api/auth/signout',
    '/api/auth/signup',
    '/api/auth/callback',
    '/api/auth/check-user',
  ];

  // Skip public pages
  const publicPages = ['/auth/callback', '/login', '/signup'];

  if (publicPages.includes(pathname)) {
    return NextResponse.next();
  }

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  res.headers.set('x-middleware-ran', 'yes');

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Check for Bearer token in Authorization header (for API testing)
  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    // If Bearer token is present, let the route handler validate it
    return res;
  }

  // If envs are missing, do a cookie-based fallback
  if (!url || !anon) {
    const hasAccess = !!req.cookies.get('sb-access-token')?.value;
    const hasRefresh = !!req.cookies.get('sb-refresh-token')?.value;
    if (!hasAccess && !hasRefresh) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/login';
      loginUrl.searchParams.set('next', req.nextUrl.pathname + req.nextUrl.search);
      return NextResponse.redirect(loginUrl);
    }
    return res;
  }

  // Normal path: use Supabase to validate/refresh cookie session
  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll() {
        return req.cookies.getAll().map(({ name, value }) => ({ name, value }));
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          res.cookies.set(name, value, options);
        });
      },
    },
  });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/login';
      loginUrl.searchParams.set('next', req.nextUrl.pathname + req.nextUrl.search);
      return NextResponse.redirect(loginUrl);
    }
  } catch (error) {
    // If Supabase throws, treat it as an invalid/expired session
    console.error('[middleware] Supabase getSession error, clearing sb-* cookies', error);

    const hasAccess = !!req.cookies.get('sb-access-token')?.value;
    const hasRefresh = !!req.cookies.get('sb-refresh-token')?.value;

    if (!hasAccess && !hasRefresh) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/login';
      loginUrl.searchParams.set('next', req.nextUrl.pathname + req.nextUrl.search);
      return NextResponse.redirect(loginUrl);
    }

    // Clear the cookies proactively
    res.cookies.set('sb-access-token', '', { maxAge: 0, path: '/' });
    res.cookies.set('sb-refresh-token', '', { maxAge: 0, path: '/' });

    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.searchParams.set('next', req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(loginUrl);
  }

  return res;
}

/**
 * IMPORTANT:
 * - Ensure this file sits at project root (same level as `app/`), not under `src/`.
 * - Restart dev server after creating/updating middleware.
 */
export const config = {
  matcher: [
    // Protect API routes except public endpoints
    '/api/:path*',
    // Protect app routes
    '/',
  ],
};

