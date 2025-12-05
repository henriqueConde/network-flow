export const ANALYTICS_PAGE_CONFIG = {
  copy: {
    title: 'Analytics',
    subtitle: 'Track your networking and job-hunt pipeline performance',
    overallMetrics: {
      title: 'Overall Metrics',
      totalOpportunities: 'Total Opportunities',
      activeOpportunities: 'Active Opportunities',
      interviewsInProgress: 'Interviews in Progress',
      offers: 'Offers',
      totalConversations: 'Total Conversations',
      totalMessages: 'Total Messages',
      averageResponseHours: 'Avg Response Time',
      conversionRate: 'Conversion Rate',
    },
    stageDistribution: {
      title: 'Pipeline Distribution',
      subtitle: 'Opportunities by stage',
    },
    categoryPerformance: {
      title: 'Category Performance',
      subtitle: 'Which categories lead to more interviews',
      totalOpportunities: 'Total',
      interviewsInProgress: 'Interviews',
      offers: 'Offers',
      conversionRate: 'Conversion',
      conversionRatesTitle: 'Conversion Rates by Category',
      conversionRatesSubtitle: 'Percentage of opportunities that reached interview stage',
    },
    pipelineConversions: {
      title: 'Pipeline Conversions',
      subtitle: 'Stage transitions and average time',
    },
    responseTimes: {
      title: 'Response Times by Category',
      subtitle: 'How quickly you respond to different categories',
      average: 'Average',
      median: 'Median',
      totalResponses: 'Total Responses',
    },
    activityOverTime: {
      title: 'Activity Over Time',
      subtitle: 'Your networking activity trends',
      conversationsCreated: 'Conversations',
      messagesSent: 'Messages Sent',
      messagesReceived: 'Messages Received',
      opportunitiesCreated: 'Opportunities',
    },
    dateRange: {
      label: 'Date Range',
      startDate: 'Start Date',
      endDate: 'End Date',
      last7Days: 'Last 7 Days',
      last30Days: 'Last 30 Days',
      last90Days: 'Last 90 Days',
      allTime: 'All Time',
    },
    empty: {
      noData: 'No analytics data available.',
    },
  },
  charts: {
    colors: {
      primary: '#1976d2',
      secondary: '#dc004e',
      success: '#2e7d32',
      warning: '#ed6c02',
      info: '#0288d1',
      error: '#d32f2f',
    },
  },
} as const;

