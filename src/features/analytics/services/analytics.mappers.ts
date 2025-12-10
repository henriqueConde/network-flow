import type { Analytics } from '../components/analytics-page/analytics-page.types';
import type { z } from 'zod';
import type { analyticsResponseSchema } from './analytics.service';

type AnalyticsResponseDto = z.infer<typeof analyticsResponseSchema>;

/**
 * Maps analytics DTO to domain type
 */
export function toAnalytics(dto: AnalyticsResponseDto): Analytics {
  return {
    overallMetrics: {
      ...dto.overallMetrics,
      averageResponseHours: dto.overallMetrics.averageResponseHours,
    },
    stageDistribution: dto.stageDistribution,
    categoryPerformance: dto.categoryPerformance,
    pipelineConversions: dto.pipelineConversions,
    responseTimes: dto.responseTimes,
    activityOverTime: dto.activityOverTime.map((item) => ({
      ...item,
      date: new Date(item.date),
    })),
  };
}


