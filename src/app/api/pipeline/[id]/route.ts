import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { HttpError, UnauthorizedError, NotFoundError } from '@/backend/core/errors/http-errors';
import { moveOpportunity } from '@/backend/features/pipeline';
import {
  moveOpportunityBody,
  moveOpportunityResponseDto,
} from '@/backend/features/pipeline/http/pipeline.schemas';

/**
 * PATCH /api/pipeline/[id]
 * Move an opportunity to a different stage.
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

    const { id: opportunityId } = await params;
    const json = await req.json();
    const body = moveOpportunityBody.parse(json);

    const result = await moveOpportunity({
      userId: user.id,
      opportunityId,
      body,
    });

    if (!result) {
      throw new NotFoundError('Opportunity or stage not found');
    }

    return NextResponse.json(moveOpportunityResponseDto.parse(result));
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/pipeline] Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}



