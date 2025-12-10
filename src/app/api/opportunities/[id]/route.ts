import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { HttpError, UnauthorizedError, NotFoundError } from '@/backend/core/errors/http-errors';
import {
  getOpportunityById,
  updateOpportunity,
  moveOpportunityToStage,
  deleteOpportunity,
} from '@/backend/features/opportunities';
import {
  opportunityDetailDto,
  updateOpportunityBody,
  updateOpportunityResponseDto,
  moveOpportunityBody,
  moveOpportunityResponseDto,
} from '@/backend/features/opportunities/http/opportunities.schemas';

/**
 * GET /api/opportunities/[id]
 * Get a single opportunity with full detail (conversations, metadata, etc.).
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
    const result = await getOpportunityById({
      userId: user.id,
      opportunityId: id,
    });

    if (!result) {
      throw new NotFoundError('Opportunity not found');
    }

    return NextResponse.json(opportunityDetailDto.parse(result));
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/opportunities/[id]] GET Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

/**
 * PATCH /api/opportunities/[id]
 * Update an opportunity's metadata (category, stage, next action, notes, etc.).
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
    const body = updateOpportunityBody.parse(json);

    const result = await updateOpportunity({
      userId: user.id,
      opportunityId: id,
      title: body.title,
      categoryId: body.categoryId,
      stageId: body.stageId,
      challengeId: body.challengeId,
      nextActionType: body.nextActionType,
      nextActionDueAt: body.nextActionDueAt,
      priority: body.priority,
      summary: body.summary,
      notes: body.notes,
      autoFollowupsEnabled: body.autoFollowupsEnabled,
      strategyIds: body.strategyIds,
      proofOfWorkType: body.proofOfWorkType,
      issuesFound: body.issuesFound,
      projectDetails: body.projectDetails,
      loomVideoUrl: body.loomVideoUrl,
      githubRepoUrl: body.githubRepoUrl,
      liveDemoUrl: body.liveDemoUrl,
      sharedChannels: body.sharedChannels,
      teamResponses: body.teamResponses,
    });

    if (!result) {
      throw new NotFoundError('Opportunity not found');
    }

    return NextResponse.json(updateOpportunityResponseDto.parse(result));
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/opportunities/[id]] PATCH Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/opportunities/[id]
 * Delete an opportunity and all associated conversations.
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
    const result = await deleteOpportunity({
      userId: user.id,
      opportunityId: id,
    });

    if (!result) {
      throw new NotFoundError('Opportunity not found');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/opportunities/[id]] DELETE Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

