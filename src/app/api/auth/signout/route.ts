import { NextResponse } from 'next/server';
import { signOut } from '@/backend/features/auth';

/**
 * Idempotent sign-out endpoint (thin controller).
 * Delegates to auth use-case.
 */
export async function POST() {
  try {
    const result = await signOut();
    return NextResponse.json(result);
  } catch (error) {
    // Still return success for idempotency
    console.error('[auth/signout] Error:', error);
    return NextResponse.json({ ok: true });
  }
}

