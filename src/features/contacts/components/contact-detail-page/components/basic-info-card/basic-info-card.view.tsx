'use client';

import { Box, Typography, TextField } from '@mui/material';
import type { BasicInfoCardProps } from './basic-info-card.types';
import { styles } from './basic-info-card.styles';

export function BasicInfoCard({
  contact,
  editValues,
  editErrors,
  isEditing,
  isSaving,
  config,
  onChangeEditField,
}: BasicInfoCardProps) {
  const email = editValues.email || null;

  return (
    <Box sx={styles.card()}>
      <Typography variant="h6" sx={styles.cardTitle()}>
        {config.copy.sections.basicInfo}
      </Typography>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>{config.copy.fields.firstName}</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            value={editValues.firstName}
            onChange={(e) => onChangeEditField('firstName', e.target.value)}
            error={!!editErrors.firstName}
            helperText={editErrors.firstName}
            size="small"
            disabled={isSaving}
          />
        ) : (
          <Typography sx={styles.fieldValue()}>
            {editValues.firstName || <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>—</span>}
          </Typography>
        )}
      </Box>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>{config.copy.fields.lastName}</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            value={editValues.lastName}
            onChange={(e) => onChangeEditField('lastName', e.target.value)}
            error={!!editErrors.lastName}
            helperText={editErrors.lastName}
            size="small"
            disabled={isSaving}
          />
        ) : (
          <Typography sx={styles.fieldValue()}>
            {editValues.lastName || <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>—</span>}
          </Typography>
        )}
      </Box>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>{config.copy.fields.headlineOrRole}</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            value={editValues.headlineOrRole || ''}
            onChange={(e) => onChangeEditField('headlineOrRole', e.target.value || null)}
            error={!!editErrors.headlineOrRole}
            helperText={editErrors.headlineOrRole}
            size="small"
            disabled={isSaving}
          />
        ) : (
          <Typography sx={styles.fieldValue()}>
            {contact.headlineOrRole || <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>—</span>}
          </Typography>
        )}
      </Box>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>{config.copy.fields.position}</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            value={editValues.position || ''}
            onChange={(e) => onChangeEditField('position', e.target.value || null)}
            error={!!editErrors.position}
            helperText={editErrors.position}
            size="small"
            disabled={isSaving}
          />
        ) : (
          <Typography sx={styles.fieldValue()}>
            {editValues.position || <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>—</span>}
          </Typography>
        )}
      </Box>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>{config.copy.fields.company}</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            value={editValues.company || ''}
            onChange={(e) => onChangeEditField('company', e.target.value || null)}
            error={!!editErrors.company}
            helperText={editErrors.company}
            size="small"
            disabled={isSaving}
          />
        ) : (
          <Typography sx={styles.fieldValue()}>
            {contact.company || <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>—</span>}
          </Typography>
        )}
      </Box>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>{config.copy.fields.email}</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            type="email"
            value={editValues.email || ''}
            onChange={(e) => onChangeEditField('email', e.target.value || null)}
            error={!!editErrors.email}
            helperText={editErrors.email}
            size="small"
            disabled={isSaving}
          />
        ) : (
          <Typography sx={styles.fieldValue()}>
            {email || <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>{config.copy.empty.noEmail}</span>}
          </Typography>
        )}
      </Box>
    </Box>
  );
}


