import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { HttpError, UnauthorizedError } from '@/backend/core/errors/http-errors';
import { getAnalytics } from '@/backend/features/analytics';
import { getAnalyticsQuery, analyticsDto } from '@/backend/features/analytics/http/analytics.schemas';

/**
 * GET /api/analytics
 * Get analytics data for the current user.
 */
export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw new UnauthorizedError();
    }

    const { searchParams } = new URL(req.url);
    const rawQuery = Object.fromEntries(searchParams.entries());
    const query = getAnalyticsQuery.parse(rawQuery);

    const startDate = query.startDate ? new Date(query.startDate) : undefined;
    const endDate = query.endDate ? new Date(query.endDate) : undefined;

    const result = await getAnalytics(user.id, { startDate, endDate });

    return NextResponse.json(analyticsDto.parse(result));
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/analytics] Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

