import { NextRequest, NextResponse } from 'next/server';
import { signupBodySchema } from '@/backend/features/auth/http/auth.schemas';
import { signUp } from '@/backend/features/auth';
import { HttpError } from '@/backend/core/errors/http-errors';

/**
 * Server-side signup endpoint (thin controller).
 * Delegates to auth use-case.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = signupBodySchema.parse(body);
    const result = await signUp(input);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json(
        { error: error.message, code: error.status },
        { status: error.status },
      );
    }

    // Handle Supabase Auth errors
    if (error && typeof error === 'object' && 'message' in error) {
      const authError = error as { message: string | unknown; status?: number };
      let errorMessage: string;

      if (typeof authError.message === 'string') {
        errorMessage = authError.message;
      } else if (typeof authError.message === 'object' && authError.message !== null) {
        errorMessage = JSON.stringify(authError.message);
      } else {
        errorMessage = authError.toString() || 'Authentication failed';
      }

      const errorMessageLower = errorMessage.toLowerCase();

      // Check if the error indicates user already exists
      const isUserExistsError =
        errorMessageLower.includes('user already registered') ||
        errorMessageLower.includes('already registered') ||
        errorMessageLower.includes('email already exists') ||
        errorMessageLower.includes('user already exists');

      if (isUserExistsError) {
        return NextResponse.json(
          { error: 'User already exists', code: 'USER_EXISTS' },
          { status: 400 },
        );
      }

      // Handle timeout errors specifically
      if (authError.status === 504 || errorMessageLower.includes('timeout')) {
        return NextResponse.json(
          {
            error: 'Authentication service is temporarily unavailable. Please try again in a moment.',
            code: 'SERVICE_TIMEOUT',
          },
          { status: 503 },
        );
      }

      // Handle email sending errors
      if (authError.status === 500 && errorMessageLower.includes('email')) {
        console.warn('[auth/signup] Email sending failed but user may have been created:', authError);
        return NextResponse.json(
          {
            error: 'User may have been created, but email confirmation failed. Please try logging in.',
            code: 'EMAIL_ERROR',
          },
          { status: 500 },
        );
      }

      return NextResponse.json(
        {
          error: errorMessage,
          code: authError.status || 'AUTH_ERROR',
        },
        { status: 400 },
      );
    }

    // Handle Zod validation errors
    if (error && typeof error === 'object' && 'issues' in error) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    console.error('[auth/signup] Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

