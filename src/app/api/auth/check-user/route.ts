import { NextRequest, NextResponse } from 'next/server';
import { signupQuerySchema } from '@/backend/features/auth/http/auth.schemas';
import { checkUserExists } from '@/backend/features/auth';

/**
 * Check if a user exists by email (thin controller).
 * Returns { exists: boolean }
 * Delegates to auth use-case.
 */
export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
    }

    const result = await checkUserExists(email);
    return NextResponse.json(result);
  } catch (error) {
    // On error, assume user doesn't exist to allow signup attempt
    console.error('[auth/check-user] Error:', error);
    return NextResponse.json({ exists: false });
  }
}

