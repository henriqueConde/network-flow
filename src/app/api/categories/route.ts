import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { HttpError, UnauthorizedError } from '@/backend/core/errors/http-errors';
import { listCategories, ensureDefaultCategories } from '@/backend/features/categories';
import {
  categoriesListDto,
  listCategoriesQuery,
} from '@/backend/features/categories/http/categories.schemas';

/**
 * GET /api/categories
 * Get all categories for the current user.
 * Optionally ensures default categories exist if none are found.
 */
export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw new UnauthorizedError();
    }

    const { searchParams } = new URL(req.url);
    const rawQuery = Object.fromEntries(searchParams.entries());
    const query = listCategoriesQuery.parse(rawQuery);

    let result;
    if (query.ensureDefaults) {
      result = await ensureDefaultCategories(user.id);
    } else {
      result = await listCategories(user.id);
    }

    return NextResponse.json(categoriesListDto.parse(result));
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/categories] Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

