import { makeAnalyticsRepo } from '../infra/analytics.repo';
import { analyticsDto } from '../http/analytics.schemas';

/**
 * Use case: Get analytics data for a user
 */
export async function getAnalytics(
  userId: string,
  options?: { startDate?: Date; endDate?: Date }
) {
  const repo = makeAnalyticsRepo();

  const [
    overallMetrics,
    stageDistribution,
    categoryPerformance,
    pipelineConversions,
    responseTimes,
    activityOverTime,
  ] = await Promise.all([
    repo.getOverallMetrics(userId, options?.startDate, options?.endDate),
    repo.getStageDistribution(userId),
    repo.getCategoryPerformance(userId),
    repo.getPipelineConversions(userId),
    repo.getResponseTimes(userId),
    repo.getActivityOverTime(userId, options?.startDate, options?.endDate),
  ]);

  return analyticsDto.parse({
    overallMetrics,
    stageDistribution,
    categoryPerformance,
    pipelineConversions,
    responseTimes,
    activityOverTime,
  });
}


