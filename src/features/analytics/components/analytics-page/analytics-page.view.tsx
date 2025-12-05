'use client';

import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  ButtonGroup,
  TextField,
} from '@mui/material';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { AnalyticsPageViewProps } from './analytics-page.types';
import { styles } from './analytics-page.styles';

export function AnalyticsPageView({
  analytics,
  isLoading,
  error,
  config,
  dateRange,
  onDateRangeChange,
  onQuickDateRange,
  formatResponseHours,
  formatDate,
}: AnalyticsPageViewProps) {
  if (isLoading) {
    return (
      <Box sx={styles.container()}>
        <Box sx={styles.header()}>
          <Typography variant="h3" sx={styles.title()}>
            {config.copy.title}
          </Typography>
          <Typography variant="body2" sx={styles.subtitle()}>
            {config.copy.subtitle}
          </Typography>
        </Box>
        <Box sx={styles.scrollableContent()}>
          <Box sx={styles.loadingContainer()}>
            <CircularProgress />
          </Box>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.container()}>
        <Box sx={styles.header()}>
          <Typography variant="h3" sx={styles.title()}>
            {config.copy.title}
          </Typography>
          <Typography variant="body2" sx={styles.subtitle()}>
            {config.copy.subtitle}
          </Typography>
        </Box>
        <Box sx={styles.scrollableContent()}>
          <Alert severity="error" sx={styles.errorContainer()}>
            {error}
          </Alert>
        </Box>
      </Box>
    );
  }

  if (!analytics) {
    return (
      <Box sx={styles.container()}>
        <Box sx={styles.header()}>
          <Typography variant="h3" sx={styles.title()}>
            {config.copy.title}
          </Typography>
          <Typography variant="body2" sx={styles.subtitle()}>
            {config.copy.subtitle}
          </Typography>
        </Box>
        <Box sx={styles.scrollableContent()}>
          <Alert severity="info">{config.copy.empty.noData}</Alert>
        </Box>
      </Box>
    );
  }

  // Chart colors
  const COLORS = [
    config.charts.colors.primary,
    config.charts.colors.secondary,
    config.charts.colors.success,
    config.charts.colors.warning,
    config.charts.colors.info,
    config.charts.colors.error,
  ];

  return (
    <Box sx={styles.container()}>
      {/* Header */}
      <Box sx={styles.header()}>
        <Typography variant="h3" sx={styles.title()}>
          {config.copy.title}
        </Typography>
        <Typography variant="body2" sx={styles.subtitle()}>
          {config.copy.subtitle}
        </Typography>
      </Box>

      {/* Scrollable Content */}
      <Box sx={styles.scrollableContent()}>
        {/* Date Range Selector */}
        <Box sx={styles.dateRangeContainer()}>
          <ButtonGroup variant="outlined" size="small">
            <Button onClick={() => onQuickDateRange(7)}>{config.copy.dateRange.last7Days}</Button>
            <Button onClick={() => onQuickDateRange(30)}>{config.copy.dateRange.last30Days}</Button>
            <Button onClick={() => onQuickDateRange(90)}>{config.copy.dateRange.last90Days}</Button>
            <Button onClick={() => onQuickDateRange(null)}>{config.copy.dateRange.allTime}</Button>
          </ButtonGroup>
          <TextField
            type="date"
            label={config.copy.dateRange.startDate}
            size="small"
            value={dateRange.startDate ? dateRange.startDate.toISOString().split('T')[0] : ''}
            onChange={(e) => {
              const date = e.target.value ? new Date(e.target.value) : null;
              onDateRangeChange(date, dateRange.endDate);
            }}
            InputLabelProps={{ shrink: true }}
            sx={{ width: 150 }}
          />
          <TextField
            type="date"
            label={config.copy.dateRange.endDate}
            size="small"
            value={dateRange.endDate ? dateRange.endDate.toISOString().split('T')[0] : ''}
            onChange={(e) => {
              const date = e.target.value ? new Date(e.target.value) : null;
              onDateRangeChange(dateRange.startDate, date);
            }}
            InputLabelProps={{ shrink: true }}
            sx={{ width: 150 }}
          />
        </Box>

        {/* Overall Metrics */}
        <Box sx={styles.metricsGrid()}>
          <Box sx={styles.metricCard()}>
            <Typography sx={styles.metricLabel()}>
              {config.copy.overallMetrics.totalOpportunities}
            </Typography>
            <Typography sx={styles.metricValue()}>
              {analytics.overallMetrics.totalOpportunities}
            </Typography>
          </Box>
          <Box sx={styles.metricCard()}>
            <Typography sx={styles.metricLabel()}>
              {config.copy.overallMetrics.activeOpportunities}
            </Typography>
            <Typography sx={styles.metricValue()}>
              {analytics.overallMetrics.activeOpportunities}
            </Typography>
          </Box>
          <Box sx={styles.metricCard()}>
            <Typography sx={styles.metricLabel()}>
              {config.copy.overallMetrics.interviewsInProgress}
            </Typography>
            <Typography sx={styles.metricValue()}>
              {analytics.overallMetrics.interviewsInProgress}
            </Typography>
          </Box>
          <Box sx={styles.metricCard()}>
            <Typography sx={styles.metricLabel()}>
              {config.copy.overallMetrics.offers}
            </Typography>
            <Typography sx={styles.metricValue()}>
              {analytics.overallMetrics.offers}
            </Typography>
          </Box>
          <Box sx={styles.metricCard()}>
            <Typography sx={styles.metricLabel()}>
              {config.copy.overallMetrics.totalConversations}
            </Typography>
            <Typography sx={styles.metricValue()}>
              {analytics.overallMetrics.totalConversations}
            </Typography>
          </Box>
          <Box sx={styles.metricCard()}>
            <Typography sx={styles.metricLabel()}>
              {config.copy.overallMetrics.totalMessages}
            </Typography>
            <Typography sx={styles.metricValue()}>
              {analytics.overallMetrics.totalMessages}
            </Typography>
          </Box>
          <Box sx={styles.metricCard()}>
            <Typography sx={styles.metricLabel()}>
              {config.copy.overallMetrics.averageResponseHours}
            </Typography>
            <Typography sx={styles.metricValue()}>
              {formatResponseHours(analytics.overallMetrics.averageResponseHours)}
            </Typography>
          </Box>
          <Box sx={styles.metricCard()}>
            <Typography sx={styles.metricLabel()}>
              {config.copy.overallMetrics.conversionRate}
            </Typography>
            <Typography sx={styles.metricValue()}>
              {analytics.overallMetrics.conversionRate.toFixed(1)}%
            </Typography>
          </Box>
        </Box>

        {/* Stage Distribution - Pie Chart */}
        {analytics.stageDistribution.length > 0 && (() => {
          // Filter out stages with 0 count to avoid overlapping labels
          const filteredData = analytics.stageDistribution.filter((item) => item.count > 0);
          
          return filteredData.length > 0 ? (
            <Box sx={styles.chartCard()}>
              <Typography sx={styles.chartTitle()}>
                {config.copy.stageDistribution.title}
              </Typography>
              <Typography sx={styles.chartSubtitle()}>
                {config.copy.stageDistribution.subtitle}
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={filteredData as unknown as Array<Record<string, unknown>>}
                    dataKey="count"
                    nameKey="stageName"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label={(props: any) => {
                      const { stageName, count, percentage } = props;
                      return percentage > 5 
                        ? `${stageName}: ${count} (${percentage.toFixed(1)}%)`
                        : '';
                    }}
                    labelLine={false}
                  >
                    {filteredData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number, name: string, props: any) => [
                      `${value} (${props.payload.percentage.toFixed(1)}%)`,
                      name
                    ]}
                  />
                  <Legend 
                    formatter={(value, entry: any) => {
                      const data = filteredData.find(d => d.stageName === value);
                      return data ? `${value} (${data.count})` : value;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          ) : null;
        })()}

        {/* Category Performance - Bar Chart */}
        {analytics.categoryPerformance.length > 0 && (
          <Box sx={styles.chartCard()}>
            <Typography sx={styles.chartTitle()}>
              {config.copy.categoryPerformance.title}
            </Typography>
            <Typography sx={styles.chartSubtitle()}>
              {config.copy.categoryPerformance.subtitle}
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.categoryPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="categoryName"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalOpportunities" fill={config.charts.colors.primary} name="Total" />
                <Bar dataKey="interviewsInProgress" fill={config.charts.colors.success} name="Interviews" />
                <Bar dataKey="offers" fill={config.charts.colors.warning} name="Offers" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}

        {/* Category Conversion Rates - Bar Chart */}
        {analytics.categoryPerformance.length > 0 && (
          <Box sx={styles.chartCard()}>
            <Typography sx={styles.chartTitle()}>
              {config.copy.categoryPerformance.conversionRatesTitle}
            </Typography>
            <Typography sx={styles.chartSubtitle()}>
              {config.copy.categoryPerformance.conversionRatesSubtitle}
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.categoryPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="categoryName"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                <Legend />
                <Bar dataKey="conversionRate" fill={config.charts.colors.success} name="Conversion Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}

        {/* Response Times by Category - Bar Chart */}
        {analytics.responseTimes.length > 0 && (
          <Box sx={styles.chartCard()}>
            <Typography sx={styles.chartTitle()}>
              {config.copy.responseTimes.title}
            </Typography>
            <Typography sx={styles.chartSubtitle()}>
              {config.copy.responseTimes.subtitle}
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={analytics.responseTimes.filter((rt) => rt.totalResponses > 0)}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="categoryName"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip
                  formatter={(value: any) =>
                    value !== null && typeof value === 'number' ? formatResponseHours(value) : 'N/A'
                  }
                />
                <Legend />
                <Bar
                  dataKey="averageResponseHours"
                  fill={config.charts.colors.primary}
                  name="Average"
                />
                <Bar
                  dataKey="medianResponseHours"
                  fill={config.charts.colors.secondary}
                  name="Median"
                />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}

        {/* Activity Over Time - Line Chart */}
        {analytics.activityOverTime.length > 0 && (
          <Box sx={styles.chartCard()}>
            <Typography sx={styles.chartTitle()}>
              {config.copy.activityOverTime.title}
            </Typography>
            <Typography sx={styles.chartSubtitle()}>
              {config.copy.activityOverTime.subtitle}
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={analytics.activityOverTime.map((item) => ({
                  ...item,
                  date: formatDate(item.date),
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="conversationsCreated"
                  stroke={config.charts.colors.primary}
                  name="Conversations"
                />
                <Line
                  type="monotone"
                  dataKey="messagesSent"
                  stroke={config.charts.colors.success}
                  name="Messages Sent"
                />
                <Line
                  type="monotone"
                  dataKey="messagesReceived"
                  stroke={config.charts.colors.secondary}
                  name="Messages Received"
                />
                <Line
                  type="monotone"
                  dataKey="opportunitiesCreated"
                  stroke={config.charts.colors.warning}
                  name="Opportunities"
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        )}

        {/* Pipeline Conversions - Table/Bar Chart */}
        {analytics.pipelineConversions.length > 0 && (
          <Box sx={styles.chartCard()}>
            <Typography sx={styles.chartTitle()}>
              {config.copy.pipelineConversions.title}
            </Typography>
            <Typography sx={styles.chartSubtitle()}>
              {config.copy.pipelineConversions.subtitle}
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analytics.pipelineConversions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="fromStage"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill={config.charts.colors.primary} name="Conversions" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}
      </Box>
    </Box>
  );
}

