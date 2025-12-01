import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/core/auth/get-session';
import {
  getTodayMetrics,
  getTodayActions,
  getNewMessages,
  getOverdueItems,
} from '@/backend/features/today';
import {
  todayMetricsDto,
  todayActionsDto,
  newMessagesDto,
  overdueItemsDto,
} from '@/backend/features/today/http/today.schemas';
import { HttpError, UnauthorizedError } from '@/backend/core/errors/http-errors';

/**
 * GET /api/today
 * Returns today's metrics, actions, messages, and overdue items.
 * Query params: ?type=metrics|actions|messages|overdue
 */
export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw new UnauthorizedError();
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'all';

    if (type === 'metrics') {
      const result = await getTodayMetrics(user.id);
      return NextResponse.json(todayMetricsDto.parse(result));
    }

    if (type === 'actions') {
      const result = await getTodayActions(user.id);
      return NextResponse.json(todayActionsDto.parse(result));
    }

    if (type === 'messages') {
      const result = await getNewMessages(user.id);
      return NextResponse.json(newMessagesDto.parse(result));
    }

    if (type === 'overdue') {
      const result = await getOverdueItems(user.id);
      return NextResponse.json(overdueItemsDto.parse(result));
    }

    // Return all data
    const [metrics, actions, messages, overdue] = await Promise.all([
      getTodayMetrics(user.id),
      getTodayActions(user.id),
      getNewMessages(user.id),
      getOverdueItems(user.id),
    ]);

    return NextResponse.json({
      metrics: todayMetricsDto.parse(metrics),
      actions: todayActionsDto.parse(actions),
      messages: newMessagesDto.parse(messages),
      overdue: overdueItemsDto.parse(overdue),
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error('[api/today] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

