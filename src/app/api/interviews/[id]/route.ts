import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { HttpError, UnauthorizedError, NotFoundError } from '@/backend/core/errors/http-errors';
import { getConversationById, updateConversation } from '@/backend/features/conversations';
import {
  conversationDetailDto,
  updateConversationBody,
} from '@/backend/features/conversations/http/conversations.schemas';
import { prisma } from '@/backend/core/db/prisma';
import { z } from 'zod';

/**
 * GET /api/interviews/[id]
 * Get interview detail with related conversations and contacts.
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

    // Verify this is an interview (conversation with Interviewing stage)
    const interviewingStage = await prisma.stage.findFirst({
      where: {
        userId: user.id,
        name: 'Interviewing',
      },
    });

    if (!interviewingStage) {
      throw new NotFoundError('Interviewing stage not found');
    }

    // Get the conversation
    const conversation = await getConversationById({
      userId: user.id,
      conversationId: id,
    });

    if (!conversation) {
      throw new NotFoundError('Interview not found');
    }

    // Verify it's in the Interviewing stage
    if (conversation.stageId !== interviewingStage.id) {
      throw new NotFoundError('This conversation is not an interview');
    }

    // Get related conversations (other conversations with the same contact)
    const relatedConversations = await prisma.conversation.findMany({
      where: {
        userId: user.id,
        contactId: conversation.contactId,
        id: { not: id },
      },
      include: {
        contact: true,
        category: true,
        stage: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 10,
    });

    // Get full contact information
    const contact = await prisma.contact.findUnique({
      where: { id: conversation.contactId },
      select: { 
        company: true,
        headlineOrRole: true,
        profileLinks: true,
      },
    });

    let relatedContacts: any[] = [];
    if (contact?.company) {
      relatedContacts = await prisma.contact.findMany({
        where: {
          userId: user.id,
          company: contact.company,
          id: { not: conversation.contactId },
        },
        take: 10,
      });
    }

    // Format response
    const interviewDetail = {
      ...conversation,
      contactHeadlineOrRole: contact?.headlineOrRole ?? null,
      contactProfileLinks: contact?.profileLinks ?? null,
      relatedConversations: relatedConversations.map((conv) => ({
        id: conv.id,
        contactName: conv.contact.name,
        contactCompany: conv.contact.company,
        channel: conv.channel,
        category: conv.category?.name ?? null,
        stage: conv.stage?.name ?? null,
        lastMessageAt: conv.lastMessageAt?.toISOString() ?? null,
        lastMessageSnippet: conv.lastMessageSnippet,
      })),
      relatedContacts: relatedContacts.map((c) => ({
        id: c.id,
        name: c.name,
        headlineOrRole: c.headlineOrRole,
        company: c.company,
        category: null,
        stage: null,
      })),
    };

    return NextResponse.json(interviewDetail);
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/interviews/[id]] Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

/**
 * PATCH /api/interviews/[id]
 * Update interview notes and metadata.
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

    // Verify this is an interview
    const interviewingStage = await prisma.stage.findFirst({
      where: {
        userId: user.id,
        name: 'Interviewing',
      },
    });

    if (!interviewingStage) {
      throw new NotFoundError('Interviewing stage not found');
    }

    const conversation = await getConversationById({
      userId: user.id,
      conversationId: id,
    });

    if (!conversation || conversation.stageId !== interviewingStage.id) {
      throw new NotFoundError('Interview not found');
    }

    const result = await updateConversation({
      userId: user.id,
      conversationId: id,
      body,
    });

    if (!result) {
      throw new NotFoundError('Interview not found');
    }

    return NextResponse.json(conversationDetailDto.parse(result));
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/interviews/[id]] PATCH Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

