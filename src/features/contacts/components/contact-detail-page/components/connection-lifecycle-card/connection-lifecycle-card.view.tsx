'use client';

import { Box, Typography, TextField, MenuItem, Chip } from '@mui/material';
import type { ConnectionLifecycleCardProps } from './connection-lifecycle-card.types';
import { styles } from './connection-lifecycle-card.styles';

export function ConnectionLifecycleCard({
  contact,
  editValues,
  editErrors,
  isEditing,
  isSaving,
  config,
  onChangeEditField,
}: ConnectionLifecycleCardProps) {
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

  return (
    <Box sx={styles.card()}>
      <Typography variant="h6" sx={styles.cardTitle()}>
        Connection Lifecycle
      </Typography>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>Connection Status</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            select
            value={editValues.connectionStatus || ''}
            onChange={(e) => onChangeEditField('connectionStatus', (e.target.value as 'not_connected' | 'request_sent' | 'connected') || null)}
            error={!!editErrors.connectionStatus}
            helperText={editErrors.connectionStatus}
            size="small"
            disabled={isSaving}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="not_connected">Not Connected</MenuItem>
            <MenuItem value="request_sent">Request Sent</MenuItem>
            <MenuItem value="connected">Connected</MenuItem>
          </TextField>
        ) : (
          <Typography sx={styles.fieldValue()}>
            {contact.connectionStatus ? (
              <Chip 
                label={contact.connectionStatus.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} 
                size="small" 
              />
            ) : (
              <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>—</span>
            )}
          </Typography>
        )}
      </Box>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>Connection Request Sent At</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            type="datetime-local"
            value={formatDateForInput(editValues.connectionRequestSentAt)}
            onChange={(e) => handleDateChange('connectionRequestSentAt', e.target.value)}
            error={!!editErrors.connectionRequestSentAt}
            helperText={editErrors.connectionRequestSentAt}
            size="small"
            disabled={isSaving}
            InputLabelProps={{ shrink: true }}
          />
        ) : (
          <Typography sx={styles.fieldValue()}>
            {formatDateForDisplay(contact.connectionRequestSentAtDate)}
          </Typography>
        )}
      </Box>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>Connection Accepted At</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            type="datetime-local"
            value={formatDateForInput(editValues.connectionAcceptedAt)}
            onChange={(e) => handleDateChange('connectionAcceptedAt', e.target.value)}
            error={!!editErrors.connectionAcceptedAt}
            helperText={editErrors.connectionAcceptedAt}
            size="small"
            disabled={isSaving}
            InputLabelProps={{ shrink: true }}
          />
        ) : (
          <Typography sx={styles.fieldValue()}>
            {formatDateForDisplay(contact.connectionAcceptedAtDate)}
          </Typography>
        )}
      </Box>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>DM Sent At</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            type="datetime-local"
            value={formatDateForInput(editValues.dmSentAt)}
            onChange={(e) => handleDateChange('dmSentAt', e.target.value)}
            error={!!editErrors.dmSentAt}
            helperText={editErrors.dmSentAt}
            size="small"
            disabled={isSaving}
            InputLabelProps={{ shrink: true }}
          />
        ) : (
          <Typography sx={styles.fieldValue()}>
            {formatDateForDisplay(contact.dmSentAtDate)}
          </Typography>
        )}
      </Box>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>First Message Date</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            type="datetime-local"
            value={formatDateForInput(editValues.firstMessageDate)}
            onChange={(e) => handleDateChange('firstMessageDate', e.target.value)}
            error={!!editErrors.firstMessageDate}
            helperText={editErrors.firstMessageDate}
            size="small"
            disabled={isSaving}
            InputLabelProps={{ shrink: true }}
          />
        ) : (
          <Typography sx={styles.fieldValue()}>
            {formatDateForDisplay(contact.firstMessageDateDate)}
          </Typography>
        )}
      </Box>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>Last Follow-Up At</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            type="datetime-local"
            value={formatDateForInput(editValues.lastFollowUpAt)}
            onChange={(e) => handleDateChange('lastFollowUpAt', e.target.value)}
            error={!!editErrors.lastFollowUpAt}
            helperText={editErrors.lastFollowUpAt}
            size="small"
            disabled={isSaving}
            InputLabelProps={{ shrink: true }}
          />
        ) : (
          <Typography sx={styles.fieldValue()}>
            {formatDateForDisplay(contact.lastFollowUpAtDate)}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

