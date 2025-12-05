'use client';

import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { useMemo, useState } from 'react';
import type { FollowupsPageViewProps } from './followups-page.types';
import { styles } from './followups-page.styles';

export function FollowupsPageView({
  followupsByDate,
  isLoading,
  error,
  config,
  onConversationClick,
  onOpportunityClick,
}: FollowupsPageViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const calendarData = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Get first day of month and how many days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Create a map of follow-ups by date (YYYY-MM-DD)
    const followupsMap = new Map<string, typeof followupsByDate[0]['followups']>();
    for (const group of followupsByDate) {
      followupsMap.set(group.date, group.followups);
    }

    // Build calendar grid
    const days: Array<{
      date: Date;
      dayNumber: number;
      isCurrentMonth: boolean;
      followups: typeof followupsByDate[0]['followups'];
    }> = [];

    // Add days from previous month to fill the first week
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      const dateKey = date.toISOString().split('T')[0];
      days.push({
        date,
        dayNumber: prevMonthLastDay - i,
        isCurrentMonth: false,
        followups: followupsMap.get(dateKey) || [],
      });
    }

    // Add days from current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateKey = date.toISOString().split('T')[0];
      days.push({
        date,
        dayNumber: day,
        isCurrentMonth: true,
        followups: followupsMap.get(dateKey) || [],
      });
    }

    // Add days from next month to fill the last week (up to 42 days total for 6 weeks)
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      const dateKey = date.toISOString().split('T')[0];
      days.push({
        date,
        dayNumber: day,
        isCurrentMonth: false,
        followups: followupsMap.get(dateKey) || [],
      });
    }

    return { days, year, month };
  }, [currentMonth, followupsByDate]);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  if (isLoading) {
    return (
      <Box sx={styles.root()}>
        <Box sx={styles.header()}>
          <Typography variant="h3" sx={styles.title()}>
            {config.copy.title}
          </Typography>
          <Typography variant="body2" sx={styles.subtitle()}>
            {config.copy.subtitle}
          </Typography>
        </Box>
        <Box sx={styles.loadingState()}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.root()}>
        <Box sx={styles.header()}>
          <Typography variant="h3" sx={styles.title()}>
            {config.copy.title}
          </Typography>
          <Typography variant="body2" sx={styles.subtitle()}>
            {config.copy.subtitle}
          </Typography>
        </Box>
        <Box sx={styles.errorState()}>
          <Alert severity="error">{error.message || 'Failed to load follow-ups'}</Alert>
        </Box>
      </Box>
    );
  }

  const monthName = config.copy.calendar.monthNames[calendarData.month];
  const today = new Date();
  const todayKey = today.toISOString().split('T')[0];

  return (
    <Box sx={styles.root()}>
      <Box sx={styles.header()}>
        <Typography variant="h3" sx={styles.title()}>
          {config.copy.title}
        </Typography>
        <Typography variant="body2" sx={styles.subtitle()}>
          {config.copy.subtitle}
        </Typography>
      </Box>

      <Card sx={styles.calendar()}>
        <Box sx={styles.calendarHeader()}>
          <Button onClick={handlePrevMonth} size="small">
            ← Prev
          </Button>
          <Typography variant="h6" sx={styles.monthYear()}>
            {monthName} {calendarData.year}
          </Typography>
          <Button onClick={handleNextMonth} size="small">
            Next →
          </Button>
        </Box>

        <Box sx={styles.calendarGrid()}>
          {config.copy.calendar.dayNames.map((dayName) => (
            <Box key={dayName} sx={styles.dayHeader()}>
              {dayName}
            </Box>
          ))}

          {calendarData.days.map((day, index) => {
            const dayKey = day.date.toISOString().split('T')[0];
            const isToday = dayKey === todayKey;

            return (
              <Box
                key={index}
                sx={[
                  day.isCurrentMonth ? styles.dayCell() : styles.dayCellOtherMonth(),
                  isToday && {
                    border: (theme) => `2px solid ${theme.palette.primary.main}`,
                  },
                ]}
              >
                <Typography
                  variant="body2"
                  sx={[
                    styles.dayNumber(),
                    isToday && {
                      color: (theme) => theme.palette.primary.main,
                      fontWeight: 700,
                    },
                  ]}
                >
                  {day.dayNumber}
                </Typography>
                {day.followups.map((followup, idx) => (
                  <Box
                    key={idx}
                    sx={styles.followupItem()}
                    onClick={(e) => {
                      e.stopPropagation();
                      onConversationClick(followup.conversationId);
                    }}
                    title={`${followup.contactName} - ${config.copy.followup.followupNumber(followup.followupNumber)}`}
                  >
                    <Typography variant="caption" sx={{ display: 'block', fontWeight: 600 }}>
                      {followup.contactName}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: '0.65rem', opacity: 0.9 }}>
                      {config.copy.followup.followupNumber(followup.followupNumber)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            );
          })}
        </Box>
      </Card>
    </Box>
  );
}

