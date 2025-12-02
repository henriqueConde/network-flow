import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { HttpError, UnauthorizedError } from '@/backend/core/errors/http-errors';
import {
  createConversation,
  listConversations,
} from '@/backend/features/conversations';
import {
  conversationInboxListDto,
  createConversationBody,
  listConversationsQuery,
} from '@/backend/features/conversations/http/conversations.schemas';

/**
 * GET /api/conversations
 * List conversations for the Inbox.
 */
export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw new UnauthorizedError();
    }

    const { searchParams } = new URL(req.url);
    const rawQuery = Object.fromEntries(searchParams.entries());
    const query = listConversationsQuery.parse(rawQuery);

    const result = await listConversations({
      userId: user.id,
      search: query.search,
      status: query.status,
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

    console.error('[api/conversations] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

/**
 * POST /api/conversations
 * Create a new conversation (and contact if needed) from the Inbox.
 */
export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw new UnauthorizedError();
    }

    const json = await req.json();
    const body = createConversationBody.parse(json);

    const result = await createConversation({
      userId: user.id,
      body,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error('[api/conversations] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}


