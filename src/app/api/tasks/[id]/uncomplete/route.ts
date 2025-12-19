import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { HttpError, UnauthorizedError, NotFoundError } from '@/backend/core/errors/http-errors';
import {
  uncompleteTask,
} from '@/backend/features/tasks';
import {
  taskDto,
} from '@/backend/features/tasks/http/tasks.schemas';

/**
 * PATCH /api/tasks/[id]/uncomplete
 * Mark a task as not completed.
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
    const result = await uncompleteTask({
      userId: user.id,
      taskId: id,
    });

    if (!result) {
      throw new NotFoundError('Task not found');
    }

    return NextResponse.json(taskDto.parse(result));
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/tasks/[id]/uncomplete] PATCH Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}



