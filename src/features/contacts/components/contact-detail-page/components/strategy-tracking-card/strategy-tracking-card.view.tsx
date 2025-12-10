'use client';

import { Box, Typography, TextField, MenuItem, Chip } from '@mui/material';
import type { StrategyTrackingCardProps } from './strategy-tracking-card.types';
import { styles } from './strategy-tracking-card.styles';

export function StrategyTrackingCard({
  contact,
  editValues,
  editErrors,
  isEditing,
  isSaving,
  config,
  onChangeEditField,
}: StrategyTrackingCardProps) {
  return (
    <Box sx={styles.card()}>
      <Typography variant="h6" sx={styles.cardTitle()}>
        Contact Classification
      </Typography>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>Warm/Cold</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            select
            value={editValues.warmOrCold || ''}
            onChange={(e) => onChangeEditField('warmOrCold', (e.target.value as 'warm' | 'cold') || null)}
            error={!!editErrors.warmOrCold}
            helperText={editErrors.warmOrCold}
            size="small"
            disabled={isSaving}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="warm">Warm</MenuItem>
            <MenuItem value="cold">Cold</MenuItem>
          </TextField>
        ) : (
          <Typography sx={styles.fieldValue()}>
            {contact.warmOrCold ? (
              <Chip label={contact.warmOrCold.charAt(0).toUpperCase() + contact.warmOrCold.slice(1)} size="small" />
            ) : (
              <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>—</span>
            )}
          </Typography>
        )}
      </Box>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>Common Ground</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            multiline
            rows={3}
            value={editValues.commonGround || ''}
            onChange={(e) => onChangeEditField('commonGround', e.target.value || null)}
            error={!!editErrors.commonGround}
            helperText={editErrors.commonGround}
            size="small"
            disabled={isSaving}
            placeholder="Shared interests, connections, or common ground..."
          />
        ) : (
          <Typography sx={styles.fieldValue()}>
            {contact.commonGround || <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>—</span>}
          </Typography>
        )}
      </Box>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>Contact Type</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            value={editValues.contactType || ''}
            onChange={(e) => onChangeEditField('contactType', e.target.value || null)}
            error={!!editErrors.contactType}
            helperText={editErrors.contactType}
            size="small"
            disabled={isSaving}
            placeholder="e.g., Developer, Manager, Recruiter"
          />
        ) : (
          <Typography sx={styles.fieldValue()}>
            {contact.contactType || <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>—</span>}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

