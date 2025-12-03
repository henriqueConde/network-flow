import { z } from 'zod';
import { conversationChannelSchema, prioritySchema } from '@/shared/types';

/**
 * Response DTOs for Today page data
 */

export const todayMetricsDto = z.object({
  activeOpportunities: z.number(),
  interviewsInProgress: z.number(),
  overdueFollowUps: z.number(),
});

export type TodayMetricsDto = z.infer<typeof todayMetricsDto>;

export const todayActionDto = z.object({
  id: z.string(),
  type: z.enum(['reply', 'follow_up', 'outreach']),
  title: z.string(),
  description: z.string().optional(),
  conversationId: z.string().optional(),
  contactName: z.string(),
  contactCompany: z.string().optional(),
  dueAt: z.string().datetime(), // ISO string
  priority: prioritySchema.nullable(),
  category: z.string().optional(),
  stage: z.string().optional(),
});

export type TodayActionDto = z.infer<typeof todayActionDto>;

export const todayActionsDto = z.array(todayActionDto);

export const newMessageDto = z.object({
  id: z.string(),
  conversationId: z.string(),
  contactName: z.string(),
  contactCompany: z.string().optional(),
  snippet: z.string(),
  receivedAt: z.string().datetime(), // ISO string
  channel: conversationChannelSchema,
  isOutOfSync: z.boolean(),
});

export type NewMessageDto = z.infer<typeof newMessageDto>;

export const newMessagesDto = z.array(newMessageDto);

export const overdueItemDto = z.object({
  id: z.string(),
  conversationId: z.string(),
  contactName: z.string(),
  contactCompany: z.string().optional(),
  actionType: z.string(),
  dueDate: z.string().datetime(), // ISO string
  daysOverdue: z.number(),
  messagePreview: z.string().optional(), // Preview of pending message if applicable
});

export type OverdueItemDto = z.infer<typeof overdueItemDto>;

export const overdueItemsDto = z.array(overdueItemDto);

