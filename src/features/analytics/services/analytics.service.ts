import { client } from '@/shared/services/http/client';
import { z } from 'zod';
import type { Analytics } from '../components/analytics-page/analytics-page.types';
import { toAnalytics } from './analytics.mappers';

/**
 * Response schema matching backend DTO
 */
export const analyticsResponseSchema = z.object({
  overallMetrics: z.object({
    totalOpportunities: z.number(),
    activeOpportunities: z.number(),
    interviewsInProgress: z.number(),
    offers: z.number(),
    totalConversations: z.number(),
    totalMessages: z.number(),
    averageResponseHours: z.number().nullable(),
    conversionRate: z.number(),
  }),
  stageDistribution: z.array(
    z.object({
      stageId: z.string().uuid(),
      stageName: z.string(),
      count: z.number(),
      percentage: z.number(),
    })
  ),
  categoryPerformance: z.array(
    z.object({
      categoryId: z.string().uuid().nullable(),
      categoryName: z.string().nullable(),
      totalOpportunities: z.number(),
      interviewsInProgress: z.number(),
      offers: z.number(),
      conversionRate: z.number(),
    })
  ),
  pipelineConversions: z.array(
    z.object({
      fromStage: z.string(),
      toStage: z.string(),
      count: z.number(),
      averageDays: z.number().nullable(),
    })
  ),
  responseTimes: z.array(
    z.object({
      categoryId: z.string().uuid().nullable(),
      categoryName: z.string().nullable(),
      averageResponseHours: z.number().nullable(),
      medianResponseHours: z.number().nullable(),
      totalResponses: z.number(),
    })
  ),
  activityOverTime: z.array(
    z.object({
      date: z.string(),
      conversationsCreated: z.number(),
      messagesSent: z.number(),
      messagesReceived: z.number(),
      opportunitiesCreated: z.number(),
    })
  ),
});

/**
 * Service function for Analytics page data.
 * Calls API endpoint following the service layer pattern.
 */
export async function getAnalytics(params?: {
  startDate?: string;
  endDate?: string;
}): Promise<Analytics> {
  const res = await client.get('/api/analytics', { params });
  const dto = analyticsResponseSchema.parse(res.data);
  return toAnalytics(dto);
}

