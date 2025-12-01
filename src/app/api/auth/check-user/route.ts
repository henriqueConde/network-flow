import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/backend/core/db/prisma';

/**
 * Check if a user exists by email.
 * Returns { exists: boolean }
 * 
 * Note: This checks the Prisma database, not Supabase Auth directly.
 * For a more accurate check, you may want to use Supabase Admin API
 * (requires service role key, should only be used in Edge Functions/cron).
 */
export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
    }

    // Check if user exists in Prisma database
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    return NextResponse.json({ exists: !!user });
  } catch (error) {
    // On error, assume user doesn't exist to allow signup attempt
    console.error('[auth/check-user] Error:', error);
    return NextResponse.json({ exists: false });
  }
}

