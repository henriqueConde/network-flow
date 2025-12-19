import { makeTasksRepo } from '../infra/tasks.repo';
import {
  createTaskBody,
  updateTaskBody,
  listTasksQuery,
  taskDto,
  tasksListDto,
  createTaskResponseDto,
  updateTaskResponseDto,
} from '../http/tasks.schemas';

/**
 * Use case: Create a new task
 */
export async function createTask(input: {
  userId: string;
  body: {
    title: string;
    description?: string;
    dueAt?: string;
    priority?: 'low' | 'medium' | 'high';
    conversationId?: string;
    opportunityId?: string;
  };
}) {
  const repo = makeTasksRepo();

  const task = await repo.createTask({
    userId: input.userId,
    title: input.body.title,
    description: input.body.description ?? null,
    dueAt: input.body.dueAt ? new Date(input.body.dueAt) : null,
    priority: input.body.priority ?? null,
    conversationId: input.body.conversationId ?? null,
    opportunityId: input.body.opportunityId ?? null,
  });

  return createTaskResponseDto.parse({ id: task.id });
}

/**
 * Use case: Get a task by ID
 */
export async function getTaskById(input: {
  userId: string;
  taskId: string;
}) {
  const repo = makeTasksRepo();
  const task = await repo.getTaskById({
    userId: input.userId,
    taskId: input.taskId,
  });

  if (!task) {
    return null;
  }

  return taskDto.parse({
    id: task.id,
    userId: task.userId,
    title: task.title,
    description: task.description,
    dueAt: task.dueAt?.toISOString() ?? null,
    completedAt: task.completedAt?.toISOString() ?? null,
    priority: task.priority as 'low' | 'medium' | 'high' | null,
    conversationId: task.conversationId,
    opportunityId: task.opportunityId,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
  });
}

/**
 * Use case: List tasks with filters
 */
export async function listTasks(input: {
  userId: string;
  query: {
    completed?: boolean;
    dueDate?: 'today' | 'overdue' | 'upcoming' | 'all';
    priority?: 'low' | 'medium' | 'high';
  };
}) {
  const repo = makeTasksRepo();
  const tasks = await repo.listTasks({
    userId: input.userId,
    completed: input.query.completed,
    dueDate: input.query.dueDate ?? 'all',
    priority: input.query.priority,
  });

  const tasksDto = tasks.map((task) => ({
    id: task.id,
    userId: task.userId,
    title: task.title,
    description: task.description,
    dueAt: task.dueAt?.toISOString() ?? null,
    completedAt: task.completedAt?.toISOString() ?? null,
    priority: task.priority as 'low' | 'medium' | 'high' | null,
    conversationId: task.conversationId,
    opportunityId: task.opportunityId,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
  }));

  return tasksListDto.parse(tasksDto);
}

/**
 * Use case: Update a task
 */
export async function updateTask(input: {
  userId: string;
  taskId: string;
  body: {
    title?: string;
    description?: string | null;
    dueAt?: string | null;
    priority?: 'low' | 'medium' | 'high' | null;
    conversationId?: string | null;
    opportunityId?: string | null;
  };
}) {
  const repo = makeTasksRepo();

  const updated = await repo.updateTask({
    userId: input.userId,
    taskId: input.taskId,
    title: input.body.title,
    description: input.body.description,
    dueAt: input.body.dueAt ? new Date(input.body.dueAt) : null,
    priority: input.body.priority,
    conversationId: input.body.conversationId,
    opportunityId: input.body.opportunityId,
  });

  if (!updated) {
    return null;
  }

  return updateTaskResponseDto.parse({
    id: updated.id,
    success: true,
  });
}

/**
 * Use case: Mark task as completed
 */
export async function completeTask(input: {
  userId: string;
  taskId: string;
}) {
  const repo = makeTasksRepo();
  const task = await repo.completeTask({
    userId: input.userId,
    taskId: input.taskId,
  });

  if (!task) {
    return null;
  }

  return taskDto.parse({
    id: task.id,
    userId: task.userId,
    title: task.title,
    description: task.description,
    dueAt: task.dueAt?.toISOString() ?? null,
    completedAt: task.completedAt?.toISOString() ?? null,
    priority: task.priority as 'low' | 'medium' | 'high' | null,
    conversationId: task.conversationId,
    opportunityId: task.opportunityId,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
  });
}

/**
 * Use case: Mark task as not completed
 */
export async function uncompleteTask(input: {
  userId: string;
  taskId: string;
}) {
  const repo = makeTasksRepo();
  const task = await repo.uncompleteTask({
    userId: input.userId,
    taskId: input.taskId,
  });

  if (!task) {
    return null;
  }

  return taskDto.parse({
    id: task.id,
    userId: task.userId,
    title: task.title,
    description: task.description,
    dueAt: task.dueAt?.toISOString() ?? null,
    completedAt: task.completedAt?.toISOString() ?? null,
    priority: task.priority as 'low' | 'medium' | 'high' | null,
    conversationId: task.conversationId,
    opportunityId: task.opportunityId,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
  });
}

/**
 * Use case: Delete a task
 */
export async function deleteTask(input: {
  userId: string;
  taskId: string;
}) {
  const repo = makeTasksRepo();
  const deleted = await repo.deleteTask({
    userId: input.userId,
    taskId: input.taskId,
  });

  return deleted;
}

/**
 * Use case: Get today's tasks (for today page)
 */
export async function getTodayTasks(userId: string) {
  const repo = makeTasksRepo();
  const tasks = await repo.getTodayTasks(userId);

  return tasks.map((task) => ({
    id: task.id,
    userId: task.userId,
    title: task.title,
    description: task.description,
    dueAt: task.dueAt?.toISOString() ?? null,
    completedAt: task.completedAt?.toISOString() ?? null,
    priority: task.priority as 'low' | 'medium' | 'high' | null,
    conversationId: task.conversationId,
    opportunityId: task.opportunityId,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
  }));
}



