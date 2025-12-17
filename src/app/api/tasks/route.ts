import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { HttpError, UnauthorizedError } from '@/backend/core/errors/http-errors';
import {
  createTask,
  listTasks,
} from '@/backend/features/tasks';
import {
  createTaskBody,
  createTaskResponseDto,
  listTasksQuery,
  tasksListDto,
} from '@/backend/features/tasks/http/tasks.schemas';

/**
 * GET /api/tasks
 * List tasks for the user with optional filters.
 */
export async function GET(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw new UnauthorizedError();
    }

    const { searchParams } = new URL(req.url);
    const rawQuery = Object.fromEntries(searchParams.entries());
    const query = listTasksQuery.parse(rawQuery);

    const result = await listTasks({
      userId: user.id,
      query: {
        completed: query.completed,
        dueDate: query.dueDate,
        // Cast nullable priority from query params to undefined to satisfy listTasks input type
        priority: query.priority ?? undefined,
      },
    });

    return NextResponse.json(tasksListDto.parse(result));
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/tasks] GET Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

/**
 * POST /api/tasks
 * Create a new task.
 */
export async function POST(req: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      throw new UnauthorizedError();
    }

    const json = await req.json();
    const body = createTaskBody.parse(json);

    const result = await createTask({
      userId: user.id,
      body: {
        title: body.title,
        description: body.description,
        dueAt: body.dueAt,
        // Normalize nullable priority to undefined for downstream types
        priority: body.priority ?? undefined,
        conversationId: body.conversationId,
        opportunityId: body.opportunityId,
      },
    });

    return NextResponse.json(createTaskResponseDto.parse(result), { status: 201 });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/tasks] POST Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}


