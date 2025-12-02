import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { HttpError, UnauthorizedError } from '@/backend/core/errors/http-errors';
import { listContacts, createContact } from '@/backend/features/contacts';
import {
  contactsListDto,
  listContactsQuery,
  createContactBody,
  createContactResponseDto,
} from '@/backend/features/contacts/http/contacts.schemas';

/**
 * GET /api/contacts
 * List contacts for the Contacts Directory.
 */
export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw new UnauthorizedError();
    }

    const { searchParams } = new URL(req.url);
    const rawQuery = Object.fromEntries(searchParams.entries());
    const query = listContactsQuery.parse(rawQuery);

    const result = await listContacts({
      userId: user.id,
      search: query.search,
      company: query.company,
      categoryId: query.categoryId,
      stageId: query.stageId,
      primaryPlatform: query.primaryPlatform,
      page: query.page,
      pageSize: query.pageSize,
      sortBy: query.sortBy,
      sortDir: query.sortDir,
    });

    return NextResponse.json(contactsListDto.parse(result));
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/contacts] Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

/**
 * POST /api/contacts
 * Create a new contact.
 */
export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw new UnauthorizedError();
    }

    const json = await req.json();
    const body = createContactBody.parse(json);

    const result = await createContact({
      userId: user.id,
      body,
    });

    return NextResponse.json(createContactResponseDto.parse(result), { status: 201 });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/contacts] Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

