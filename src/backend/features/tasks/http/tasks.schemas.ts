import { z } from 'zod';
import { prioritySchema } from '@/shared/types';

/**
 * Request schemas for task operations
 */

export const createTaskBody = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  dueAt: z.string().datetime().optional(),
  priority: prioritySchema.optional(),
  conversationId: z.string().uuid().optional(),
  opportunityId: z.string().uuid().optional(),
});

export type CreateTaskBody = z.infer<typeof createTaskBody>;

export const updateTaskBody = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional().nullable(),
  dueAt: z.string().datetime().optional().nullable(),
  priority: prioritySchema.nullable().optional(),
  conversationId: z.string().uuid().optional().nullable(),
  opportunityId: z.string().uuid().optional().nullable(),
});

export type UpdateTaskBody = z.infer<typeof updateTaskBody>;

export const listTasksQuery = z.object({
  completed: z.coerce.boolean().optional(),
  dueDate: z.enum(['today', 'overdue', 'upcoming', 'all']).optional().default('all'),
  priority: prioritySchema.optional(),
});

export type ListTasksQuery = z.infer<typeof listTasksQuery>;

/**
 * Response DTOs for tasks
 */

export const taskDto = z.object({
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

export type TaskDto = z.infer<typeof taskDto>;

export const tasksListDto = z.array(taskDto);

export const createTaskResponseDto = z.object({
  id: z.string().uuid(),
});

export type CreateTaskResponseDto = z.infer<typeof createTaskResponseDto>;

export const updateTaskResponseDto = z.object({
  id: z.string().uuid(),
  success: z.boolean(),
});

export type UpdateTaskResponseDto = z.infer<typeof updateTaskResponseDto>;


