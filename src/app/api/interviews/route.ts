import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { HttpError, UnauthorizedError } from '@/backend/core/errors/http-errors';
import { listConversations } from '@/backend/features/conversations';
import {
  conversationInboxListDto,
  listConversationsQuery,
} from '@/backend/features/conversations/http/conversations.schemas';
import { prisma } from '@/backend/core/db/prisma';

/**
 * GET /api/interviews
 * List interviews (conversations with "Interviewing" stage).
 */
export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw new UnauthorizedError();
    }

    // Find the "Interviewing" stage for this user
    const interviewingStage = await prisma.stage.findFirst({
      where: {
        userId: user.id,
        name: 'Interviewing',
      },
    });

    if (!interviewingStage) {
      // No "Interviewing" stage exists, return empty list
      return NextResponse.json([]);
    }

    const { searchParams } = new URL(req.url);
    const rawQuery = Object.fromEntries(searchParams.entries());
    const query = listConversationsQuery.parse(rawQuery);

    // Override stageId to only show interviews
    const result = await listConversations({
      userId: user.id,
      search: query.search,
      status: query.status,
      categoryId: query.categoryId,
      stageId: interviewingStage.id, // Force filter by Interviewing stage
      page: query.page,
      pageSize: query.pageSize,
      sortBy: query.sortBy,
      sortDir: query.sortDir,
    });

    return NextResponse.json(conversationInboxListDto.parse(result));
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/interviews] Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
