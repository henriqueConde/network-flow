import { client } from '@/shared/services/http/client';
import { z } from 'zod';
import { conversationChannelSchema, prioritySchema } from '@/shared/types';
import type {
  TodayPageMetrics,
  TodayAction,
  NewMessage,
  OverdueItem,
} from '../components/today-page/today-page.types';
import {
  toTodayAction,
  toNewMessage,
  toOverdueItem,
} from './today.mappers';

/**
 * Response schemas matching backend DTOs
 */
const todayMetricsResponseSchema = z.object({
  activeOpportunities: z.number(),
  interviewsInProgress: z.number(),
  overdueFollowUps: z.number(),
});

const todayActionResponseSchema = z.object({
  id: z.string(),
  type: z.enum(['reply', 'follow_up', 'outreach', 'task']),
  title: z.string(),
  description: z.string().optional(),
  opportunityId: z.string(),
  conversationId: z.string().optional(),
  contactName: z.string(),
  contactCompany: z.string().optional(),
  dueAt: z.string().datetime(),
  priority: prioritySchema.nullable(),
  category: z.string().optional(),
  stage: z.string().optional(),
  source: z.enum(['derived', 'task']).optional(),
  taskId: z.string().optional(),
  completed: z.boolean().optional().default(false),
});

const newMessageResponseSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  contactName: z.string(),
  contactCompany: z.string().optional(),
  snippet: z.string(),
  receivedAt: z.string().datetime(),
  channel: conversationChannelSchema,
  isOutOfSync: z.boolean(),
});

const overdueItemResponseSchema = z.object({
  id: z.string(),
  opportunityId: z.string(),
  conversationId: z.string().optional(),
  contactName: z.string(),
  contactCompany: z.string().optional(),
  actionType: z.string(),
  dueDate: z.string().datetime(),
  daysOverdue: z.number(),
  messagePreview: z.string().optional(),
});

/**
 * Service functions for Today page data.
 * Calls API endpoints following the service layer pattern.
 * Maps DTOs (with ISO string dates) to domain types (with Date objects).
 */
export async function getTodayMetrics(): Promise<TodayPageMetrics> {
  const res = await client.get('/api/today', { params: { type: 'metrics' } });
  return todayMetricsResponseSchema.parse(res.data);
}

export async function getTodayActions(): Promise<TodayAction[]> {
  const res = await client.get('/api/today', { params: { type: 'actions' } });
  const dtos = z.array(todayActionResponseSchema).parse(res.data);
  return dtos.map(toTodayAction);
}

export async function getNewMessages(): Promise<NewMessage[]> {
  const res = await client.get('/api/today', { params: { type: 'messages' } });
  const dtos = z.array(newMessageResponseSchema).parse(res.data);
  return dtos.map(toNewMessage);
}

export async function getPendingMessages(): Promise<OverdueItem[]> {
  const res = await client.get('/api/today', { params: { type: 'pending-messages' } });
  const dtos = z.array(overdueItemResponseSchema).parse(res.data);
  return dtos.map(toOverdueItem);
}

export async function getOverdueFollowups(): Promise<OverdueItem[]> {
  const res = await client.get('/api/today', { params: { type: 'overdue-followups' } });
  const dtos = z.array(overdueItemResponseSchema).parse(res.data);
  return dtos.map(toOverdueItem);
}

export async function getOverdueItems(): Promise<OverdueItem[]> {
  const res = await client.get('/api/today', { params: { type: 'overdue' } });
  const dtos = z.array(overdueItemResponseSchema).parse(res.data);
  return dtos.map(toOverdueItem);
}
