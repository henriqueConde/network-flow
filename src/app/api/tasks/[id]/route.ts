import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { HttpError, UnauthorizedError, NotFoundError } from '@/backend/core/errors/http-errors';
import {
  getTaskById,
  updateTask,
  deleteTask,
} from '@/backend/features/tasks';
import {
  taskDto,
  updateTaskBody,
  updateTaskResponseDto,
} from '@/backend/features/tasks/http/tasks.schemas';

/**
 * GET /api/tasks/[id]
 * Get a single task by ID.
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
    const result = await getTaskById({
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
    console.error('[api/tasks/[id]] GET Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

/**
 * PATCH /api/tasks/[id]
 * Update a task's details.
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
    const body = updateTaskBody.parse(json);

    const result = await updateTask({
      userId: user.id,
      taskId: id,
      body: {
        title: body.title,
        description: body.description,
        dueAt: body.dueAt,
        priority: body.priority,
        conversationId: body.conversationId,
        opportunityId: body.opportunityId,
      },
    });

    if (!result) {
      throw new NotFoundError('Task not found');
    }

    return NextResponse.json(updateTaskResponseDto.parse(result));
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/tasks/[id]] PATCH Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

/**
 * DELETE /api/tasks/[id]
 * Delete a task.
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
    const deleted = await deleteTask({
      userId: user.id,
      taskId: id,
    });

    if (!deleted) {
      throw new NotFoundError('Task not found');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof HttpError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    const errorMessage = error instanceof Error ? error.message : error ? String(error) : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    console.error('[api/tasks/[id]] DELETE Unexpected error:', errorMessage, errorStack || '');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}



