'use client';

import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import type { FollowupsPageViewProps } from './followups-page.types';
import type { ScheduledFollowup } from '../../services/followups.service';
import { styles } from './followups-page.styles';

const MAX_VISIBLE_FOLLOWUPS = 1;

export function FollowupsPageView({
  isLoading,
  error,
  config,
  calendarData,
  onConversationClick,
  onPrevMonth,
  onNextMonth,
}: FollowupsPageViewProps) {
  const [selectedDay, setSelectedDay] = useState<{
    date: Date;
    followups: ScheduledFollowup[];
  } | null>(null);

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
                {day.followups.slice(0, MAX_VISIBLE_FOLLOWUPS).map((followup, idx) => (
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
                {day.followups.length > MAX_VISIBLE_FOLLOWUPS && (
                  <Button
                    size="small"
                    variant="outlined"
                    sx={styles.moreButton()}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDay({ date: day.date, followups: day.followups });
                    }}
                    title={`Click to view all ${day.followups.length} follow-ups for this day`}
                    endIcon={<ExpandMoreIcon sx={{ fontSize: '1rem' }} />}
                  >
                    View {day.followups.length - MAX_VISIBLE_FOLLOWUPS} more
                  </Button>
                )}
              </Box>
            );
          })}
        </Box>
      </Card>

      {/* Dialog for showing all follow-ups for a day */}
      <Dialog
        open={selectedDay !== null}
        onClose={() => setSelectedDay(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Follow-ups for {selectedDay?.date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </DialogTitle>
        <DialogContent>
          <Box sx={styles.dialogContent()}>
            {selectedDay?.followups.map((followup, idx) => (
              <Box
                key={idx}
                sx={styles.dialogFollowupItem()}
                onClick={() => {
                  onConversationClick(followup.conversationId);
                  setSelectedDay(null);
                }}
              >
                <Box sx={styles.dialogFollowupHeader()}>
                  <Typography variant="subtitle1" sx={styles.dialogFollowupName()}>
                    {followup.contactName}
                  </Typography>
                  <Chip
                    label={config.copy.followup.followupNumber(followup.followupNumber)}
                    size="small"
                    color="primary"
                  />
                </Box>
                {followup.contactCompany && (
                  <Typography variant="body2" color="text.secondary">
                    {followup.contactCompany}
                  </Typography>
                )}
                {followup.opportunityTitle && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    Opportunity: {followup.opportunityTitle}
                  </Typography>
                )}
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                  Channel: {followup.channel}
                </Typography>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedDay(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
