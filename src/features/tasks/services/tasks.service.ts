import { client } from '@/shared/services/http/client';
import { z } from 'zod';
import { prioritySchema } from '@/shared/types';

/**
 * Task DTO from API.
 */
const TaskDto = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  dueAt: z.string().datetime().nullable(),
  completedAt: z.string().datetime().nullable(),
  priority: prioritySchema.nullable(),
  conversationId: z.string().uuid().nullable(),
  opportunityId: z.string().uuid().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Task = z.infer<typeof TaskDto>;

/**
 * Task list response DTO.
 */
const TasksListResponseDto = z.array(TaskDto);

/**
 * Create task request payload.
 */
export type CreateTaskPayload = {
  title: string;
  description?: string;
  dueAt?: string;
  priority?: 'low' | 'medium' | 'high';
  conversationId?: string;
  opportunityId?: string;
};

/**
 * Update task request payload.
 */
export type UpdateTaskPayload = {
  title?: string;
  description?: string | null;
  dueAt?: string | null;
  priority?: 'low' | 'medium' | 'high' | null;
  conversationId?: string | null;
  opportunityId?: string | null;
};

/**
 * List tasks with optional filters.
 */
export async function listTasks(params?: {
  completed?: boolean;
  dueDate?: 'today' | 'overdue' | 'upcoming' | 'all';
  priority?: 'low' | 'medium' | 'high';
}): Promise<Task[]> {
  const searchParams = new URLSearchParams();
  if (params?.completed !== undefined) {
    searchParams.append('completed', String(params.completed));
  }
  if (params?.dueDate) {
    searchParams.append('dueDate', params.dueDate);
  }
  if (params?.priority) {
    searchParams.append('priority', params.priority);
  }

  const url = `/api/tasks${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
  const res = await client.get(url);
  return TasksListResponseDto.parse(res.data);
}

/**
 * Get a single task by ID.
 */
export async function getTask(id: string): Promise<Task> {
  const res = await client.get(`/api/tasks/${id}`);
  return TaskDto.parse(res.data);
}

/**
 * Create a new task.
 */
export async function createTask(payload: CreateTaskPayload): Promise<{ id: string }> {
  const res = await client.post('/api/tasks', payload);
  return z.object({ id: z.string().uuid() }).parse(res.data);
}

/**
 * Update an existing task.
 */
export async function updateTask(id: string, payload: UpdateTaskPayload): Promise<Task> {
  const res = await client.patch(`/api/tasks/${id}`, payload);
  return TaskDto.parse(res.data);
}

/**
 * Mark a task as completed.
 */
export async function completeTask(id: string): Promise<Task> {
  const res = await client.patch(`/api/tasks/${id}/complete`);
  return TaskDto.parse(res.data);
}

/**
 * Mark a task as not completed.
 */
export async function uncompleteTask(id: string): Promise<Task> {
  const res = await client.patch(`/api/tasks/${id}/uncomplete`);
  return TaskDto.parse(res.data);
}

/**
 * Delete a task.
 */
export async function deleteTask(id: string): Promise<void> {
  await client.delete(`/api/tasks/${id}`);
}



