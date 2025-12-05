'use client';

import { Box, Typography, TextField, MenuItem, Chip } from '@mui/material';
import type { AdditionalInfoCardProps } from './additional-info-card.types';
import { styles } from './additional-info-card.styles';

export function AdditionalInfoCard({
  contact,
  editValues,
  editErrors,
  isEditing,
  isSaving,
  availableCategories,
  availableStages,
  config,
  onChangeEditField,
}: AdditionalInfoCardProps) {
  return (
    <Box sx={styles.card()}>
      <Typography variant="h6" sx={styles.cardTitle()}>
        {config.copy.sections.additionalInfo}
      </Typography>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>{config.copy.fields.primaryPlatform}</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            select
            value={editValues.primaryPlatform || ''}
            onChange={(e) => onChangeEditField('primaryPlatform', e.target.value || null)}
            error={!!editErrors.primaryPlatform}
            helperText={editErrors.primaryPlatform}
            size="small"
            disabled={isSaving}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="linkedin">LinkedIn</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="twitter">Twitter</MenuItem>
          </TextField>
        ) : (
          <Typography sx={styles.fieldValue()}>
            {contact.primaryPlatform || <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>—</span>}
          </Typography>
        )}
      </Box>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>{config.copy.fields.tags}</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            value={editValues.tags.join(', ')}
            onChange={(e) => onChangeEditField('tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
            error={!!editErrors.tags}
            helperText={editErrors.tags}
            size="small"
            disabled={isSaving}
            placeholder="Comma-separated tags"
          />
        ) : (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {contact.tags.length === 0 ? (
              <Typography sx={styles.emptyValue()}>—</Typography>
            ) : (
              contact.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" />
              ))
            )}
          </Box>
        )}
      </Box>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>{config.copy.fields.category}</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            select
            value={editValues.categoryId || ''}
            onChange={(e) => onChangeEditField('categoryId', e.target.value || null)}
            error={!!editErrors.categoryId}
            helperText={editErrors.categoryId}
            size="small"
            disabled={isSaving}
          >
            <MenuItem value="">None</MenuItem>
            {availableCategories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
        ) : (
          <Typography sx={styles.fieldValue()}>
            {contact.categoryId ? availableCategories.find(c => c.id === contact.categoryId)?.name || '—' : '—'}
          </Typography>
        )}
      </Box>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>{config.copy.fields.stage}</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            select
            value={editValues.stageId || ''}
            onChange={(e) => onChangeEditField('stageId', e.target.value || null)}
            error={!!editErrors.stageId}
            helperText={editErrors.stageId}
            size="small"
            disabled={isSaving}
          >
            <MenuItem value="">None</MenuItem>
            {availableStages.map((stage) => (
              <MenuItem key={stage.id} value={stage.id}>
                {stage.name}
              </MenuItem>
            ))}
          </TextField>
        ) : (
          <Typography sx={styles.fieldValue()}>
            {contact.stageId ? availableStages.find(s => s.id === contact.stageId)?.name || '—' : '—'}
          </Typography>
        )}
      </Box>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>{config.copy.fields.createdAt}</Typography>
        <Typography sx={styles.fieldValue()}>
          {contact.createdAtDate.toLocaleDateString()}
        </Typography>
      </Box>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>{config.copy.fields.updatedAt}</Typography>
        <Typography sx={styles.fieldValue()}>
          {contact.updatedAtDate.toLocaleDateString()}
        </Typography>
      </Box>
    </Box>
  );
}

