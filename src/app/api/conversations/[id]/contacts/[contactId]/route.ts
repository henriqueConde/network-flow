import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { HttpError, UnauthorizedError, NotFoundError } from '@/backend/core/errors/http-errors';
import {
  removeContactFromConversation,
} from '@/backend/features/conversations';
import {
  conversationDetailDto,
} from '@/backend/features/conversations/http/conversations.schemas';

/**
 * DELETE /api/conversations/[id]/contacts/[contactId]
 * Remove a contact from a conversation.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; contactId: string }> },
) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw new UnauthorizedError();
    }

    const { id, contactId } = await params;

    const result = await removeContactFromConversation({
      userId: user.id,
      conversationId: id,
      contactId,
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
    console.error('[api/conversations/[id]/contacts/[contactId]] DELETE Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}


