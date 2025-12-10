'use client';

import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  LinearProgress,
  Chip,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import type { ChallengeDetailViewProps } from './challenge-detail-page.types';
import { styles } from './challenge-detail-page.styles';
import { LoadingView, ErrorView } from './components';

export function ChallengeDetailPageView({
  challenge,
  isLoading,
  error,
  config,
  editValues,
  editErrors,
  isEditing,
  isSaving,
  onBack,
  onStartEdit,
  onChangeEditField,
  onSave,
  onCancel,
}: ChallengeDetailViewProps) {
  if (isLoading) {
    return <LoadingView />;
  }

  if (error || !challenge) {
    return (
      <ErrorView
        error={error || 'Challenge not found'}
        isNotFound={!challenge}
        config={config}
        onBack={onBack}
      />
    );
  }

  // Calculate progress metrics
  const overallProgress = challenge.goal > 0 ? (challenge.outreachesCount / challenge.goal) * 100 : 0;
  const now = new Date();
  const startDate = challenge.startDateDate;
  const endDate = challenge.endDateDate;
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Calculate days elapsed - compare dates at midnight to get accurate day count
  // Reset times to midnight for accurate day comparison
  const startDateMidnight = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const daysElapsed = Math.max(0, Math.floor((nowMidnight.getTime() - startDateMidnight.getTime()) / (1000 * 60 * 60 * 24)));
  const daysRemaining = Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  const timeProgress = totalDays > 0 ? (daysElapsed / totalDays) * 100 : 0;
  
  // Determine status based on daily goal if set, otherwise use time-based progress
  let status: 'onTrack' | 'behind' | 'ahead' = 'onTrack';
  let statusLabel: string = config.copy.progress.onTrack;
  
  if (challenge.outreachesPerDay && challenge.outreachesPerDay > 0) {
    if (daysElapsed > 0) {
      // Challenge has started - use daily goal to determine if on track
      const expectedOutreaches = daysElapsed * challenge.outreachesPerDay;
      const actualOutreaches = challenge.outreachesCount;
      
      // Calculate percentage of expected achieved
      const percentageAchieved = expectedOutreaches > 0 
        ? (actualOutreaches / expectedOutreaches) * 100 
        : 100;
      
      // If less than 90% of expected, mark as behind
      // If more than 110% of expected, mark as ahead
      // Otherwise, on track
      if (percentageAchieved < 90) {
        status = 'behind';
        statusLabel = config.copy.progress.behind;
      } else if (percentageAchieved > 110) {
        status = 'ahead';
        statusLabel = config.copy.progress.ahead;
      } else {
        status = 'onTrack';
        statusLabel = config.copy.progress.onTrack;
      }
    } else {
      // Challenge hasn't started yet (startDate is in the future)
      // However, if we have a daily goal and the challenge should have started by now
      // (based on creation date or if startDate is very close), we should still evaluate
      // For now, if challenge hasn't started, show on track unless we have outreaches (then ahead)
      if (challenge.outreachesCount > 0) {
        status = 'ahead';
        statusLabel = config.copy.progress.ahead;
      } else {
        // Challenge hasn't started - on track by default
        status = 'onTrack';
        statusLabel = config.copy.progress.onTrack;
      }
    }
  } else {
    // Fallback to time-based progress if no daily goal is set
    if (overallProgress < timeProgress - 10) {
      status = 'behind';
      statusLabel = config.copy.progress.behind;
    } else if (overallProgress > timeProgress + 10) {
      status = 'ahead';
      statusLabel = config.copy.progress.ahead;
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatDateShort = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <Box sx={styles.container()}>
      {/* Header Section */}
      <Box sx={styles.headerSection()}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={styles.backButton()}
          variant="text"
        >
          {config.copy.backButton}
        </Button>
        <Box sx={styles.header()}>
          <Box>
            {isEditing ? (
              <TextField
                label={config.copy.fields.name}
                value={editValues.name}
                onChange={(e) => onChangeEditField('name', e.target.value)}
                error={!!editErrors.name}
                helperText={editErrors.name}
                sx={{ minWidth: 300 }}
              />
            ) : (
              <Typography variant="h4" sx={styles.title()}>
                {challenge.name}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {isEditing ? (
              <>
                <Button
                  startIcon={<CancelIcon />}
                  onClick={onCancel}
                  variant="outlined"
                  disabled={isSaving}
                >
                  {config.copy.buttons.cancel}
                </Button>
                <Button
                  startIcon={<SaveIcon />}
                  onClick={onSave}
                  variant="contained"
                  disabled={isSaving}
                >
                  {isSaving ? 'Saving...' : config.copy.buttons.save}
                </Button>
              </>
            ) : (
              <IconButton onClick={onStartEdit} color="primary">
                <EditIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>

      {/* Scrollable Content */}
      <Box sx={styles.scrollableContent()}>
        {/* Main Column */}
        <Box sx={styles.mainColumn()}>
            {/* Progress Card */}
            <Card sx={styles.progressCard()}>
              <Box sx={styles.progressHeader()}>
                <Typography variant="h6" sx={styles.cardTitle()}>
                  {config.copy.progress.overallProgress}
                </Typography>
                <Chip
                  label={statusLabel}
                  sx={[
                    styles.statusBadge(),
                    status === 'onTrack' && styles.statusOnTrack(),
                    status === 'behind' && styles.statusBehind(),
                    status === 'ahead' && styles.statusAhead(),
                  ]}
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2 }}>
                <Typography sx={styles.progressValue()}>
                  {Math.round(overallProgress)}%
                </Typography>
                <Box sx={{ flex: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={Math.min(overallProgress, 100)}
                    sx={styles.progressBar()}
                    color={status === 'behind' ? 'error' : status === 'ahead' ? 'success' : 'primary'}
                  />
                </Box>
              </Box>
              <Box sx={styles.metricsGrid()}>
                <Box sx={styles.metricCard()}>
                  <Typography sx={styles.metricLabel()}>
                    {config.copy.progress.daysElapsed}
                  </Typography>
                  <Typography sx={styles.metricValue()}>{daysElapsed}</Typography>
                </Box>
                <Box sx={styles.metricCard()}>
                  <Typography sx={styles.metricLabel()}>
                    {config.copy.progress.daysRemaining}
                  </Typography>
                  <Typography sx={styles.metricValue()}>{daysRemaining}</Typography>
                </Box>
                <Box sx={styles.metricCard()}>
                  <Typography sx={styles.metricLabel()}>
                    {config.copy.progress.completionRate}
                  </Typography>
                  <Typography sx={styles.metricValue()}>
                    {challenge.outreachesCount} / {challenge.goal}
                  </Typography>
                </Box>
                {challenge.outreachesPerDay && challenge.outreachesPerDay > 0 && (
                  <Box sx={styles.metricCard()}>
                    <Typography sx={styles.metricLabel()}>
                      Expected Outreaches by Now
                    </Typography>
                    <Typography sx={styles.metricValue()}>
                      {daysElapsed * challenge.outreachesPerDay}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Card>

            {/* Basic Information Card */}
            <Card sx={styles.card()}>
              <Typography variant="h6" sx={styles.cardTitle()}>
                {config.copy.sections.basicInfo}
              </Typography>
              <Box sx={styles.fieldRow()}>
                <Typography sx={styles.fieldLabel()}>
                  {config.copy.fields.startDate}
                </Typography>
                {isEditing ? (
                  <TextField
                    type="datetime-local"
                    value={editValues.startDate ? editValues.startDate.slice(0, 16) : ''}
                    onChange={(e) =>
                      onChangeEditField(
                        'startDate',
                        e.target.value ? new Date(e.target.value).toISOString() : '',
                      )
                    }
                    error={!!editErrors.startDate}
                    helperText={editErrors.startDate}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                ) : (
                  <Typography sx={styles.fieldValue()}>
                    {formatDate(challenge.startDateDate)}
                  </Typography>
                )}
              </Box>
              <Box sx={styles.fieldRow()}>
                <Typography sx={styles.fieldLabel()}>
                  {config.copy.fields.endDate}
                </Typography>
                {isEditing ? (
                  <TextField
                    type="datetime-local"
                    value={editValues.endDate ? editValues.endDate.slice(0, 16) : ''}
                    onChange={(e) =>
                      onChangeEditField(
                        'endDate',
                        e.target.value ? new Date(e.target.value).toISOString() : '',
                      )
                    }
                    error={!!editErrors.endDate}
                    helperText={editErrors.endDate}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                ) : (
                  <Typography sx={styles.fieldValue()}>
                    {formatDate(challenge.endDateDate)}
                  </Typography>
                )}
              </Box>
              <Box sx={styles.fieldRow()}>
                <Typography sx={styles.fieldLabel()}>
                  {config.copy.fields.goal}
                </Typography>
                {isEditing ? (
                  <TextField
                    type="number"
                    value={editValues.goal}
                    onChange={(e) =>
                      onChangeEditField('goal', parseInt(e.target.value, 10) || 0)
                    }
                    error={!!editErrors.goal}
                    helperText={editErrors.goal}
                    fullWidth
                  />
                ) : (
                  <Typography sx={styles.fieldValue()}>{challenge.goal}</Typography>
                )}
              </Box>
              <Box sx={styles.fieldRow()}>
                <Typography sx={styles.fieldLabel()}>
                  {config.copy.fields.outreachesPerDay}
                </Typography>
                {isEditing ? (
                  <TextField
                    type="number"
                    label="Outreaches Per Day"
                    value={editValues.outreachesPerDay ?? ''}
                    onChange={(e) =>
                      onChangeEditField(
                        'outreachesPerDay',
                        e.target.value ? parseInt(e.target.value, 10) : null,
                      )
                    }
                    placeholder="e.g., 5"
                    helperText="Optional: Set a daily minimum goal to track daily progress. Leave empty to remove."
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                ) : (
                  <Typography sx={styles.fieldValue()}>
                    {challenge.outreachesPerDay ? `${challenge.outreachesPerDay} per day` : 'Not set'}
                  </Typography>
                )}
              </Box>
              <Box sx={styles.fieldRow()}>
                <Typography sx={styles.fieldLabel()}>
                  {config.copy.fields.createdAt}
                </Typography>
                <Typography sx={styles.fieldValue()}>
                  {formatDateShort(challenge.createdAtDate)}
                </Typography>
              </Box>
              <Box sx={styles.fieldRow()}>
                <Typography sx={styles.fieldLabel()}>
                  {config.copy.fields.updatedAt}
                </Typography>
                <Typography sx={styles.fieldValue()}>
                  {formatDateShort(challenge.updatedAtDate)}
                </Typography>
              </Box>
            </Card>

            {/* Metrics Card */}
            <Card sx={styles.card()}>
              <Typography variant="h6" sx={styles.cardTitle()}>
                {config.copy.sections.metrics}
              </Typography>
              <Box sx={styles.metricsGrid()}>
                <Box sx={styles.metricCard()}>
                  <Typography sx={styles.metricLabel()}>
                    {config.copy.fields.outreachesCount}
                  </Typography>
                  {isEditing ? (
                    <TextField
                      type="number"
                      value={editValues.outreachesCount}
                      onChange={(e) =>
                        onChangeEditField('outreachesCount', parseInt(e.target.value, 10) || 0)
                      }
                      size="small"
                      fullWidth
                    />
                  ) : (
                    <Typography sx={styles.metricValue()}>
                      {challenge.outreachesCount}
                    </Typography>
                  )}
                </Box>
                <Box sx={styles.metricCard()}>
                  <Typography sx={styles.metricLabel()}>
                    {config.copy.fields.acceptsCount}
                  </Typography>
                  {isEditing ? (
                    <TextField
                      type="number"
                      value={editValues.acceptsCount}
                      onChange={(e) =>
                        onChangeEditField('acceptsCount', parseInt(e.target.value, 10) || 0)
                      }
                      size="small"
                      fullWidth
                    />
                  ) : (
                    <Typography sx={styles.metricValue()}>
                      {challenge.acceptsCount}
                    </Typography>
                  )}
                </Box>
                <Box sx={styles.metricCard()}>
                  <Typography sx={styles.metricLabel()}>
                    {config.copy.fields.repliesCount}
                  </Typography>
                  {isEditing ? (
                    <TextField
                      type="number"
                      value={editValues.repliesCount}
                      onChange={(e) =>
                        onChangeEditField('repliesCount', parseInt(e.target.value, 10) || 0)
                      }
                      size="small"
                      fullWidth
                    />
                  ) : (
                    <Typography sx={styles.metricValue()}>
                      {challenge.repliesCount}
                    </Typography>
                  )}
                </Box>
                <Box sx={styles.metricCard()}>
                  <Typography sx={styles.metricLabel()}>
                    {config.copy.fields.callsCount}
                  </Typography>
                  {isEditing ? (
                    <TextField
                      type="number"
                      value={editValues.callsCount}
                      onChange={(e) =>
                        onChangeEditField('callsCount', parseInt(e.target.value, 10) || 0)
                      }
                      size="small"
                      fullWidth
                    />
                  ) : (
                    <Typography sx={styles.metricValue()}>
                      {challenge.callsCount}
                    </Typography>
                  )}
                </Box>
                <Box sx={styles.metricCard()}>
                  <Typography sx={styles.metricLabel()}>
                    {config.copy.fields.interviewsCount}
                  </Typography>
                  {isEditing ? (
                    <TextField
                      type="number"
                      value={editValues.interviewsCount}
                      onChange={(e) =>
                        onChangeEditField('interviewsCount', parseInt(e.target.value, 10) || 0)
                      }
                      size="small"
                      fullWidth
                    />
                  ) : (
                    <Typography sx={styles.metricValue()}>
                      {challenge.interviewsCount}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Card>

            {/* Notes Card */}
            <Card sx={styles.card()}>
              <Typography variant="h6" sx={styles.cardTitle()}>
                {config.copy.sections.notes}
              </Typography>
              {isEditing ? (
                <TextField
                  multiline
                  rows={6}
                  value={editValues.notes}
                  onChange={(e) => onChangeEditField('notes', e.target.value)}
                  placeholder="Add notes about this challenge..."
                  fullWidth
                />
              ) : (
                <Typography sx={challenge.notes ? styles.fieldValue() : styles.emptyValue()}>
                  {challenge.notes || config.copy.empty.noNotes}
                </Typography>
              )}
            </Card>
        </Box>
      </Box>
    </Box>
  );
}

