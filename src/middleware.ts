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

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Check for Bearer token in Authorization header (for API testing)
    const authHeader = req.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
        // If Bearer token is present, let the route handler validate it
        return NextResponse.next();
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
        // If cookies exist, allow through (will be validated by Supabase client)
        return NextResponse.next();
    }

    // Create response object for cookie handling (only after we know we have Supabase config)
    const res = NextResponse.next();
    res.headers.set('x-middleware-ran', 'yes');

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
            const loginUrl = new URL('/login', req.url);
            loginUrl.searchParams.set('next', pathname);
            // Use 307 (Temporary Redirect) to ensure it's a redirect, not a rewrite
            return NextResponse.redirect(loginUrl, 307);
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
 * - When using src/ directory, middleware should be at src/middleware.ts
 * - Restart dev server after creating/updating middleware.
 */
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files (images, etc.)
         * The middleware logic handles excluding /login, /signup, and /auth/callback
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
    ],
};

