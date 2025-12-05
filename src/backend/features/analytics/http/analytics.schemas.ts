import { z } from 'zod';

/**
 * Query schema for analytics endpoint
 */
export const getAnalyticsQuery = z.object({
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format').optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format').optional(),
});

/**
 * Stage distribution data point
 */
export const stageDistributionDto = z.object({
  stageId: z.string().uuid(),
  stageName: z.string(),
  count: z.number(),
  percentage: z.number(),
});

/**
 * Category performance data point
 */
export const categoryPerformanceDto = z.object({
  categoryId: z.string().uuid().nullable(),
  categoryName: z.string().nullable(),
  totalOpportunities: z.number(),
  interviewsInProgress: z.number(),
  offers: z.number(),
  conversionRate: z.number(), // percentage
});

/**
 * Pipeline conversion data point
 */
export const pipelineConversionDto = z.object({
  fromStage: z.string(),
  toStage: z.string(),
  count: z.number(),
  averageDays: z.number().nullable(), // null if no conversions
});

/**
 * Response time data point
 */
export const responseTimeDto = z.object({
  categoryId: z.string().uuid().nullable(),
  categoryName: z.string().nullable(),
  averageResponseHours: z.number().nullable(), // null if no data
  medianResponseHours: z.number().nullable(),
  totalResponses: z.number(),
});

/**
 * Activity over time data point
 */
export const activityOverTimeDto = z.object({
  date: z.string(), // ISO date string (YYYY-MM-DD)
  conversationsCreated: z.number(),
  messagesSent: z.number(),
  messagesReceived: z.number(),
  opportunitiesCreated: z.number(),
});

/**
 * Overall metrics
 */
export const overallMetricsDto = z.object({
  totalOpportunities: z.number(),
  activeOpportunities: z.number(),
  interviewsInProgress: z.number(),
  offers: z.number(),
  totalConversations: z.number(),
  totalMessages: z.number(),
  averageResponseHours: z.number().nullable(),
  conversionRate: z.number(), // overall conversion to interviews
});

/**
 * Complete analytics response
 */
export const analyticsDto = z.object({
  overallMetrics: overallMetricsDto,
  stageDistribution: z.array(stageDistributionDto),
  categoryPerformance: z.array(categoryPerformanceDto),
  pipelineConversions: z.array(pipelineConversionDto),
  responseTimes: z.array(responseTimeDto),
  activityOverTime: z.array(activityOverTimeDto),
});

export type AnalyticsDto = z.infer<typeof analyticsDto>;
export type StageDistributionDto = z.infer<typeof stageDistributionDto>;
export type CategoryPerformanceDto = z.infer<typeof categoryPerformanceDto>;
export type PipelineConversionDto = z.infer<typeof pipelineConversionDto>;
export type ResponseTimeDto = z.infer<typeof responseTimeDto>;
export type ActivityOverTimeDto = z.infer<typeof activityOverTimeDto>;
export type OverallMetricsDto = z.infer<typeof overallMetricsDto>;

