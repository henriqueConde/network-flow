import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { HttpError, UnauthorizedError } from '@/backend/core/errors/http-errors';
import { listStages, ensureDefaultStages } from '@/backend/features/stages';
import {
  stagesListDto,
  listStagesQuery,
} from '@/backend/features/stages/http/stages.schemas';

/**
 * GET /api/stages
 * Get all stages for the current user.
 * Optionally ensures default stages exist if none are found.
 */
export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw new UnauthorizedError();
    }

    const { searchParams } = new URL(req.url);
    const rawQuery = Object.fromEntries(searchParams.entries());
    const query = listStagesQuery.parse(rawQuery);

    let result;
    if (query.ensureDefaults) {
      result = await ensureDefaultStages(user.id);
    } else {
      result = await listStages(user.id);
    }

    return NextResponse.json(stagesListDto.parse(result));
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/stages] Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

