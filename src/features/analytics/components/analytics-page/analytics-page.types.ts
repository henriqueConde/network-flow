export interface OverallMetrics {
  totalOpportunities: number;
  activeOpportunities: number;
  interviewsInProgress: number;
  offers: number;
  totalConversations: number;
  totalMessages: number;
  averageResponseHours: number | null;
  conversionRate: number;
}

export interface StageDistribution {
  stageId: string;
  stageName: string;
  count: number;
  percentage: number;
}

export interface CategoryPerformance {
  categoryId: string | null;
  categoryName: string | null;
  totalOpportunities: number;
  interviewsInProgress: number;
  offers: number;
  conversionRate: number;
}

export interface PipelineConversion {
  fromStage: string;
  toStage: string;
  count: number;
  averageDays: number | null;
}

export interface ResponseTime {
  categoryId: string | null;
  categoryName: string | null;
  averageResponseHours: number | null;
  medianResponseHours: number | null;
  totalResponses: number;
}

import { ANALYTICS_PAGE_CONFIG } from './analytics-page.config';

export interface ActivityOverTime {
  date: Date;
  conversationsCreated: number;
  messagesSent: number;
  messagesReceived: number;
  opportunitiesCreated: number;
}

export interface Analytics {
  overallMetrics: OverallMetrics;
  stageDistribution: StageDistribution[];
  categoryPerformance: CategoryPerformance[];
  pipelineConversions: PipelineConversion[];
  responseTimes: ResponseTime[];
  activityOverTime: ActivityOverTime[];
}

export interface AnalyticsPageViewProps {
  analytics: Analytics | null;
  isLoading: boolean;
  error: string | null;
  config: typeof ANALYTICS_PAGE_CONFIG;
  dateRange: {
    startDate: Date | null;
    endDate: Date | null;
  };
  onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void;
  onQuickDateRange: (days: number | null) => void;
  formatResponseHours: (hours: number | null) => string;
  formatDate: (date: Date) => string;
}

