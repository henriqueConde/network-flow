'use client';

import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Chip,
  IconButton,
  Link as MuiLink,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';
import { Autocomplete } from '@mui/material';
import { formatEnumToTitleCase } from '@/shared/utils/string.utils';
import { STRATEGIES } from '@/features/strategies/components/strategies-page/strategies-page.config';
import type { EmailTrackingCardProps } from './email-tracking-card.types';
import { styles } from './email-tracking-card.styles';

export function EmailTrackingCard({
  conversation,
  editValues,
  editErrors,
  isEditing,
  isSaving,
  config,
  onChangeEditField,
  onSave,
  onCancel,
}: EmailTrackingCardProps) {
  const strategies = STRATEGIES;

  // Format date for input[type="datetime-local"]
  const formatDateForInput = (dateStr: string | null | undefined): string => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '';
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch {
      return '';
    }
  };

  const formatDateForDisplay = (date: Date | null): string => {
    if (!date) return '—';
    return date.toLocaleString();
  };

  const handleDateChange = (field: string, value: string) => {
    if (!value) {
      onChangeEditField(field as any, '');
      return;
    }
    try {
      const date = new Date(value);
      onChangeEditField(field as any, date.toISOString());
    } catch {
      onChangeEditField(field as any, '');
    }
  };

  const handleAddFollowUpDate = () => {
    const newDate = new Date().toISOString();
    onChangeEditField('emailFollowUpDates', [...(editValues.emailFollowUpDates || []), newDate]);
  };

  const handleRemoveFollowUpDate = (index: number) => {
    const newDates = [...(editValues.emailFollowUpDates || [])];
    newDates.splice(index, 1);
    onChangeEditField('emailFollowUpDates', newDates);
  };

  return (
    <Card sx={styles.card()}>
      <CardContent>
        <Typography variant="h6" sx={styles.cardTitle()}>
          Email & Loom Tracking
        </Typography>

        <Box sx={styles.fieldRow()}>
          <Typography sx={styles.fieldLabel()}>Strategies</Typography>
          {isEditing ? (
            <Autocomplete
              multiple
              options={strategies}
              getOptionLabel={(option) => option.title}
              value={strategies.filter((s) => editValues.strategyIds?.includes(s.id)) || []}
              onChange={(_, newValue) => {
                onChangeEditField('strategyIds', newValue.map((s) => s.id));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  placeholder="Select strategies..."
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option.id}
                    label={option.title}
                    size="small"
                  />
                ))
              }
              disabled={isSaving}
            />
          ) : (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {conversation.strategyIds.length === 0 ? (
                <Typography sx={styles.emptyValue()}>—</Typography>
              ) : (
                conversation.strategyIds.map((strategyId) => {
                  const strategy = strategies.find((s) => s.id === strategyId);
                  return strategy ? (
                    <Chip key={strategyId} label={strategy.title} size="small" />
                  ) : null;
                })
              )}
            </Box>
          )}
        </Box>

        <Box sx={styles.fieldRow()}>
          <Typography sx={styles.fieldLabel()}>Email Sent At</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              type="datetime-local"
              size="small"
              value={formatDateForInput(editValues.emailSentAt)}
              onChange={(e) => handleDateChange('emailSentAt', e.target.value)}
              error={!!editErrors.emailSentAt}
              helperText={editErrors.emailSentAt}
              disabled={isSaving}
              InputLabelProps={{ shrink: true }}
            />
          ) : (
            <Typography sx={styles.fieldValue()}>
              {formatDateForDisplay(conversation.emailSentAtDate)}
            </Typography>
          )}
        </Box>

        <Box sx={styles.fieldRow()}>
          <Typography sx={styles.fieldLabel()}>Email Status</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              select
              size="small"
              value={editValues.emailStatus || ''}
              onChange={(e) =>
                onChangeEditField(
                  'emailStatus',
                  (e.target.value as 'no_reply' | 'replied' | 'call_scheduled' | 'rejected' | 'in_process') || null,
                )
              }
              error={!!editErrors.emailStatus}
              helperText={editErrors.emailStatus}
              disabled={isSaving}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="no_reply">No Reply</MenuItem>
              <MenuItem value="replied">Replied</MenuItem>
              <MenuItem value="call_scheduled">Call Scheduled</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
              <MenuItem value="in_process">In Process</MenuItem>
            </TextField>
          ) : (
            <Typography sx={styles.fieldValue()}>
              {conversation.emailStatus ? (
                <Chip
                  label={formatEnumToTitleCase(conversation.emailStatus)}
                  size="small"
                />
              ) : (
                <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>—</span>
              )}
            </Typography>
          )}
        </Box>

        <Box sx={styles.fieldRow()}>
          <FormControlLabel
            control={
              <Checkbox
                checked={editValues.responseReceived || false}
                onChange={(e) => onChangeEditField('responseReceived', e.target.checked)}
                disabled={!isEditing || isSaving}
              />
            }
            label="Response Received"
          />
        </Box>

        {editValues.responseReceived && (
          <Box sx={styles.fieldRow()}>
            <Typography sx={styles.fieldLabel()}>Response Received At</Typography>
            {isEditing ? (
              <TextField
                fullWidth
                type="datetime-local"
                size="small"
                value={formatDateForInput(editValues.responseReceivedAt)}
                onChange={(e) => handleDateChange('responseReceivedAt', e.target.value)}
                error={!!editErrors.responseReceivedAt}
                helperText={editErrors.responseReceivedAt}
                disabled={isSaving || !editValues.responseReceived}
                InputLabelProps={{ shrink: true }}
              />
            ) : (
              <Typography sx={styles.fieldValue()}>
                {formatDateForDisplay(conversation.responseReceivedAtDate)}
              </Typography>
            )}
          </Box>
        )}

        <Box sx={styles.fieldRow()}>
          <Typography sx={styles.fieldLabel()}>Loom Video URL</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              size="small"
              value={editValues.loomVideoUrl || ''}
              onChange={(e) => onChangeEditField('loomVideoUrl', e.target.value || null)}
              error={!!editErrors.loomVideoUrl}
              helperText={editErrors.loomVideoUrl}
              disabled={isSaving}
              placeholder="https://..."
            />
          ) : (
            <Typography sx={styles.fieldValue()}>
              {conversation.loomVideoUrl ? (
                <MuiLink href={conversation.loomVideoUrl} target="_blank" rel="noopener noreferrer" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {conversation.loomVideoUrl}
                  <LaunchIcon fontSize="small" />
                </MuiLink>
              ) : (
                <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>—</span>
              )}
            </Typography>
          )}
        </Box>

        <Box sx={styles.fieldRow()}>
          <FormControlLabel
            control={
              <Checkbox
                checked={editValues.loomSent || false}
                onChange={(e) => onChangeEditField('loomSent', e.target.checked)}
                disabled={!isEditing || isSaving}
              />
            }
            label="Loom Sent"
          />
        </Box>

        <Box sx={styles.fieldRow()}>
          <Typography sx={styles.fieldLabel()}>Email Follow-Up Dates</Typography>
          {isEditing ? (
            <Box>
              {(editValues.emailFollowUpDates || []).map((dateStr, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center', marginBottom: 1 }}>
                  <TextField
                    fullWidth
                    type="datetime-local"
                    size="small"
                    value={formatDateForInput(dateStr)}
                    onChange={(e) => {
                      const newDates = [...(editValues.emailFollowUpDates || [])];
                      if (e.target.value) {
                        newDates[index] = new Date(e.target.value).toISOString();
                      } else {
                        newDates[index] = new Date().toISOString();
                      }
                      onChangeEditField('emailFollowUpDates', newDates);
                    }}
                    disabled={isSaving}
                    InputLabelProps={{ shrink: true }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveFollowUpDate(index)}
                    disabled={isSaving}
                    color="error"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
              <Button
                size="small"
                startIcon={<AddIcon />}
                onClick={handleAddFollowUpDate}
                disabled={isSaving}
              >
                Add Follow-Up Date
              </Button>
            </Box>
          ) : (
            <Box>
              {conversation.emailFollowUpDatesDates.length === 0 ? (
                <Typography sx={styles.emptyValue()}>—</Typography>
              ) : (
                conversation.emailFollowUpDatesDates.map((date, index) => (
                  <Typography key={index} sx={styles.fieldValue()}>
                    {formatDateForDisplay(date)}
                  </Typography>
                ))
              )}
            </Box>
          )}
        </Box>

        <Box sx={styles.fieldRow()}>
          <Typography sx={styles.fieldLabel()}>Follow-Up 1 Date</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              type="datetime-local"
              size="small"
              value={formatDateForInput(editValues.followUp1Date)}
              onChange={(e) => handleDateChange('followUp1Date', e.target.value)}
              error={!!editErrors.followUp1Date}
              helperText={editErrors.followUp1Date}
              disabled={isSaving}
              InputLabelProps={{ shrink: true }}
            />
          ) : (
            <Typography sx={styles.fieldValue()}>
              {formatDateForDisplay(conversation.followUp1DateDate)}
            </Typography>
          )}
        </Box>

        <Box sx={styles.fieldRow()}>
          <Typography sx={styles.fieldLabel()}>Follow-Up 2 Date</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              type="datetime-local"
              size="small"
              value={formatDateForInput(editValues.followUp2Date)}
              onChange={(e) => handleDateChange('followUp2Date', e.target.value)}
              error={!!editErrors.followUp2Date}
              helperText={editErrors.followUp2Date}
              disabled={isSaving}
              InputLabelProps={{ shrink: true }}
            />
          ) : (
            <Typography sx={styles.fieldValue()}>
              {formatDateForDisplay(conversation.followUp2DateDate)}
            </Typography>
          )}
        </Box>

        <Box sx={styles.fieldRow()}>
          <Typography sx={styles.fieldLabel()}>Follow-Up 3 Date</Typography>
          {isEditing ? (
            <TextField
              fullWidth
              type="datetime-local"
              size="small"
              value={formatDateForInput(editValues.followUp3Date)}
              onChange={(e) => handleDateChange('followUp3Date', e.target.value)}
              error={!!editErrors.followUp3Date}
              helperText={editErrors.followUp3Date}
              disabled={isSaving}
              InputLabelProps={{ shrink: true }}
            />
          ) : (
            <Typography sx={styles.fieldValue()}>
              {formatDateForDisplay(conversation.followUp3DateDate)}
            </Typography>
          )}
        </Box>

        {isEditing && (
          <Box sx={styles.actionsRow()}>
            <Button onClick={onCancel} disabled={isSaving}>
              {config.copy.actions.cancel}
            </Button>
            <Button
              variant="contained"
              onClick={onSave}
              disabled={isSaving}
              startIcon={isSaving ? <CircularProgress size={16} /> : null}
            >
              {isSaving ? config.copy.actions.saving : config.copy.actions.save}
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}




