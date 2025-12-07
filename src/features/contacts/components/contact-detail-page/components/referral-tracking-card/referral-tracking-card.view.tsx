'use client';

import { Box, Typography, TextField, FormControlLabel, Checkbox } from '@mui/material';
import type { ReferralTrackingCardProps } from './referral-tracking-card.types';
import { styles } from './referral-tracking-card.styles';

export function ReferralTrackingCard({
  contact,
  editValues,
  editErrors,
  isEditing,
  isSaving,
  config,
  onChangeEditField,
}: ReferralTrackingCardProps) {
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
        Referral Tracking
      </Typography>

      <Box sx={styles.fieldRow()}>
        <FormControlLabel
          control={
            <Checkbox
              checked={editValues.referralGiven || false}
              onChange={(e) => onChangeEditField('referralGiven', e.target.checked)}
              disabled={!isEditing || isSaving}
            />
          }
          label="Referral Given"
        />
      </Box>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>Referral Given At</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            type="datetime-local"
            value={formatDateForInput(editValues.referralGivenAt)}
            onChange={(e) => handleDateChange('referralGivenAt', e.target.value)}
            error={!!editErrors.referralGivenAt}
            helperText={editErrors.referralGivenAt}
            size="small"
            disabled={isSaving || !editValues.referralGiven}
            InputLabelProps={{ shrink: true }}
          />
        ) : (
          <Typography sx={styles.fieldValue()}>
            {contact.referralGiven ? formatDateForDisplay(contact.referralGivenAtDate) : '—'}
          </Typography>
        )}
      </Box>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>Referral Details</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            multiline
            rows={3}
            value={editValues.referralDetails || ''}
            onChange={(e) => onChangeEditField('referralDetails', e.target.value || null)}
            error={!!editErrors.referralDetails}
            helperText={editErrors.referralDetails}
            size="small"
            disabled={isSaving || !editValues.referralGiven}
            placeholder="Details about the referral..."
          />
        ) : (
          <Typography sx={styles.fieldValue()}>
            {contact.referralDetails || <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>—</span>}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

