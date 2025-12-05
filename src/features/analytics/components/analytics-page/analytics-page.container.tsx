'use client';

import { useState, useMemo } from 'react';
import { useAnalytics } from '../../services/analytics.queries';
import { AnalyticsPageView } from './analytics-page.view';
import { ANALYTICS_PAGE_CONFIG } from './analytics-page.config';
import { useAnalyticsFormatters } from './hooks/use-analytics-formatters.state';

export function AnalyticsPageContainer() {
  const [dateRange, setDateRange] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Default: 30 days ago
    endDate: new Date(),
  });

  const queryParams = useMemo(() => {
    return {
      startDate: dateRange.startDate?.toISOString().split('T')[0],
      endDate: dateRange.endDate?.toISOString().split('T')[0],
    };
  }, [dateRange.startDate, dateRange.endDate]);

  const { data: analytics, isLoading, error } = useAnalytics(queryParams);
  const { formatResponseHours, formatDate } = useAnalyticsFormatters();

  const handleDateRangeChange = (startDate: Date | null, endDate: Date | null) => {
    setDateRange({ startDate, endDate });
  };

  const handleQuickDateRange = (days: number | null) => {
    if (days === null) {
      handleDateRangeChange(null, null);
    } else {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - days);
      handleDateRangeChange(start, end);
    }
  };

  return (
    <AnalyticsPageView
      analytics={analytics || null}
      isLoading={isLoading}
      error={error ? 'Failed to load analytics data' : null}
      config={ANALYTICS_PAGE_CONFIG}
      dateRange={dateRange}
      onDateRangeChange={handleDateRangeChange}
      onQuickDateRange={handleQuickDateRange}
      formatResponseHours={formatResponseHours}
      formatDate={formatDate}
    />
  );
}

