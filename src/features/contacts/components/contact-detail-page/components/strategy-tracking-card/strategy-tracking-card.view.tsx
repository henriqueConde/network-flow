'use client';

import { Box, Typography, TextField, MenuItem, Autocomplete, Chip, FormControlLabel, Checkbox } from '@mui/material';
import { STRATEGIES } from '@/features/strategies/components/strategies-page/strategies-page.config';
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
        Strategy Tracking
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
            {contact.strategyIds.length === 0 ? (
              <Typography sx={styles.emptyValue()}>—</Typography>
            ) : (
              contact.strategyIds.map((strategyId) => {
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

