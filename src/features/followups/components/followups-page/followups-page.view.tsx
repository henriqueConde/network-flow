'use client';

import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  Button,
} from '@mui/material';
import type { FollowupsPageViewProps } from './followups-page.types';
import { styles } from './followups-page.styles';

export function FollowupsPageView({
  isLoading,
  error,
  config,
  calendarData,
  onConversationClick,
  onPrevMonth,
  onNextMonth,
}: FollowupsPageViewProps) {

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
          <Button onClick={onPrevMonth} size="small">
            ← Prev
          </Button>
          <Typography variant="h6" sx={styles.monthYear()}>
            {config.copy.calendar.monthNames[calendarData.month]} {calendarData.year}
          </Typography>
          <Button onClick={onNextMonth} size="small">
            Next →
          </Button>
        </Box>

        <Box sx={styles.dayHeadersContainer()}>
          {config.copy.calendar.dayNames.map((dayName) => (
            <Box key={dayName} sx={styles.dayHeader()}>
              {dayName}
            </Box>
          ))}
        </Box>

        <Box sx={styles.calendarGrid()}>
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
                    title={`${followup.contactName} - ${config.copy.followup.followupNumber(
                      followup.followupNumber,
                    )}`}
                  >
                    <Typography variant="body2" sx={styles.followupContactName()}>
                      {followup.contactName}
                    </Typography>
                    <Typography variant="body2" sx={styles.followupNumberText()}>
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
