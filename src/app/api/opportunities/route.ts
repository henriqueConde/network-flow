import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { HttpError, UnauthorizedError } from '@/backend/core/errors/http-errors';
import {
  createOpportunity,
  listOpportunities,
} from '@/backend/features/opportunities';
import {
  opportunityListDto,
  createOpportunityBody,
  createOpportunityResponseDto,
  listOpportunitiesQuery,
} from '@/backend/features/opportunities/http/opportunities.schemas';

/**
 * GET /api/opportunities
 * List opportunities for the user.
 */
export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw new UnauthorizedError();
    }

    const { searchParams } = new URL(req.url);
    const rawQuery = Object.fromEntries(searchParams.entries());
    const query = listOpportunitiesQuery.parse(rawQuery);

    const result = await listOpportunities({
      userId: user.id,
      search: query.search,
      categoryId: query.categoryId,
      stageId: query.stageId,
      proofOfWorkType: query.proofOfWorkType,
      page: query.page,
      pageSize: query.pageSize,
      sortBy: query.sortBy,
      sortDir: query.sortDir,
    });

    return NextResponse.json(opportunityListDto.parse(result));
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/opportunities] Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

/**
 * POST /api/opportunities
 * Create a new opportunity.
 */
export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw new UnauthorizedError();
    }

    const json = await req.json();
    const body = createOpportunityBody.parse(json);

    const result = await createOpportunity({
      userId: user.id,
      contactId: body.contactId,
      title: body.title,
      categoryId: body.categoryId,
      stageId: body.stageId,
      nextActionType: body.nextActionType,
      nextActionDueAt: body.nextActionDueAt,
      priority: body.priority,
      notes: body.notes,
    });

    return NextResponse.json(createOpportunityResponseDto.parse(result), { status: 201 });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/opportunities] POST Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

