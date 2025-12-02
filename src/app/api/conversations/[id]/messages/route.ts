import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { HttpError, UnauthorizedError, NotFoundError } from '@/backend/core/errors/http-errors';
import { addMessage } from '@/backend/features/conversations';
import {
  conversationDetailDto,
  addMessageBody,
} from '@/backend/features/conversations/http/conversations.schemas';

/**
 * POST /api/conversations/[id]/messages
 * Add a message (reply) to a conversation.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw new UnauthorizedError();
    }

    const { id } = await params;
    const json = await req.json();
    const body = addMessageBody.parse(json);

    const result = await addMessage({
      userId: user.id,
      conversationId: id,
      body,
    });

    if (!result) {
      throw new NotFoundError('Conversation not found');
    }

    return NextResponse.json(conversationDetailDto.parse(result));
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/conversations/[id]/messages] Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

