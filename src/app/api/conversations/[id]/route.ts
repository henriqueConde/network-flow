import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { HttpError, UnauthorizedError, NotFoundError } from '@/backend/core/errors/http-errors';
import {
  getConversationById,
  updateConversation,
  addMessage,
  deleteConversation,
} from '@/backend/features/conversations';
import {
  conversationDetailDto,
  updateConversationBody,
  addMessageBody,
} from '@/backend/features/conversations/http/conversations.schemas';

/**
 * GET /api/conversations/[id]
 * Get a single conversation with full detail (messages, metadata, etc.).
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw new UnauthorizedError();
    }

    const { id } = await params;
    const result = await getConversationById({
      userId: user.id,
      conversationId: id,
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
    console.error('[api/conversations/[id]] Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

/**
 * PATCH /api/conversations/[id]
 * Update a conversation's metadata (category, stage, next action, notes, etc.).
 */
export async function PATCH(
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
    const body = updateConversationBody.parse(json);

    const result = await updateConversation({
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
    console.error('[api/conversations/[id]] Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/conversations/[id]
 * Delete a conversation.
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw new UnauthorizedError();
    }

    const { id } = await params;
    const result = await deleteConversation({
      userId: user.id,
      conversationId: id,
    });

    if (!result) {
      throw new NotFoundError('Conversation not found');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/conversations/[id]] DELETE Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
