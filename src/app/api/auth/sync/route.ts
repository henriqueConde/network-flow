import { NextResponse } from 'next/server';
import { syncSessionBodySchema } from '@/backend/features/auth/http/auth.schemas';
import { syncSession } from '@/backend/features/auth';
import { HttpError } from '@/backend/core/errors/http-errors';

/**
 * Synchronize auth by setting Supabase cookies on the server (thin controller).
 * Also ensures the user exists in the Prisma users table.
 * Delegates to auth use-case.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = syncSessionBodySchema.parse(body);
    const result = await syncSession({
      accessToken: input.access_token,
      refreshToken: input.refresh_token,
    });
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    // Handle Zod validation errors
    if (error && typeof error === 'object' && 'issues' in error) {
      return NextResponse.json(
        { message: 'access_token and refresh_token are required' },
        { status: 400 },
      );
    }

    // Handle Supabase Auth errors
    if (error && typeof error === 'object' && 'message' in error) {
      const authError = error as { message: string };
      return NextResponse.json({ message: authError.message }, { status: 401 });
    }

    console.error('[auth/sync] Unexpected error:', error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Internal Error' },
      { status: 500 },
    );
  }
}

