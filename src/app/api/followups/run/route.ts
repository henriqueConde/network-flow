import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { HttpError, UnauthorizedError } from '@/backend/core/errors/http-errors';
import { runFollowupsForUser } from '@/backend/features/followups';
import { runFollowupsResponseDto } from '@/backend/features/followups/http/followups.schemas';

/**
 * POST /api/followups/run
 * Trigger automatic follow-ups for the authenticated user.
 *
 * This endpoint is designed to be called from a scheduled job (e.g. cron)
 * or manually from the app (e.g. Today page) to generate follow-up messages.
 */
export async function POST(_req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw new UnauthorizedError();
    }

    const result = await runFollowupsForUser(user.id);

    return NextResponse.json(runFollowupsResponseDto.parse(result));
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/followups/run] Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}





