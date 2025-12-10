import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { HttpError, UnauthorizedError } from '@/backend/core/errors/http-errors';
import { listCompanies, createCompany } from '@/backend/features/companies';
import {
  companiesListDto,
  listCompaniesQuery,
  createCompanyBody,
  companyResponseDto,
} from '@/backend/features/companies/http/companies.schemas';

/**
 * GET /api/companies
 * List companies for the Companies Directory.
 */
export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw new UnauthorizedError();
    }

    const { searchParams } = new URL(req.url);
    const rawQuery = Object.fromEntries(searchParams.entries());
    const query = listCompaniesQuery.parse(rawQuery);

    const result = await listCompanies({
      userId: user.id,
      search: query.search,
      industry: query.industry,
      fundingRound: query.fundingRound,
      hasRelevantRole: query.hasRelevantRole,
      applied: query.applied,
      page: query.page,
      pageSize: query.pageSize,
      sortBy: query.sortBy,
      sortDir: query.sortDir,
    });

    return NextResponse.json(companiesListDto.parse(result));
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/companies] Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

/**
 * POST /api/companies
 * Create a new company.
 */
export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw new UnauthorizedError();
    }

    const json = await req.json();
    const body = createCompanyBody.parse(json);

    const result = await createCompany({
      userId: user.id,
      ...body,
    });

    return NextResponse.json(companyResponseDto.parse(result), { status: 201 });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/companies] Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}


