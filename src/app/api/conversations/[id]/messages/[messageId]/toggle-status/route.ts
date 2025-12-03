import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { HttpError, UnauthorizedError, NotFoundError } from '@/backend/core/errors/http-errors';
import { toggleMessageStatus } from '@/backend/features/conversations';
import {
  conversationDetailDto,
} from '@/backend/features/conversations/http/conversations.schemas';

/**
 * POST /api/conversations/[id]/messages/[messageId]/toggle-status
 * Toggle message status between pending and confirmed.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; messageId: string }> },
) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw new UnauthorizedError();
    }

    const { id: conversationId, messageId } = await params;

    const result = await toggleMessageStatus({
      userId: user.id,
      messageId,
    });

    if (!result) {
      throw new NotFoundError('Message or conversation not found');
    }

    // Verify the conversation ID matches (extra safety check)
    if (result.id !== conversationId) {
      throw new NotFoundError('Message does not belong to this conversation');
    }

    return NextResponse.json(conversationDetailDto.parse(result));
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/conversations/[id]/messages/[messageId]/toggle-status] Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

