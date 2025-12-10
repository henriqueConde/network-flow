'use client';

import { Box, Typography, TextField, Link } from '@mui/material';
import type { LinkedInInfoCardProps } from './linkedin-info-card.types';
import { styles } from './linkedin-info-card.styles';

export function LinkedInInfoCard({
  contact,
  editValues,
  editErrors,
  isEditing,
  isSaving,
  config,
  onChangeEditField,
}: LinkedInInfoCardProps) {
  const linkedinUrl = contact.profileLinks?.linkedin || editValues.linkedinUrl || null;
  const connectedOn = editValues.connectedOn || null;

  return (
    <Box sx={styles.card()}>
      <Typography variant="h6" sx={styles.cardTitle()}>
        {config.copy.sections.linkedinInfo}
      </Typography>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>{config.copy.fields.linkedinUrl}</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            value={editValues.linkedinUrl || ''}
            onChange={(e) => onChangeEditField('linkedinUrl', e.target.value || null)}
            error={!!editErrors.linkedinUrl}
            helperText={editErrors.linkedinUrl}
            size="small"
            disabled={isSaving}
          />
        ) : (
          <Typography sx={styles.fieldValue()}>
            {linkedinUrl ? (
              <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                {linkedinUrl}
              </Link>
            ) : (
              <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>{config.copy.empty.noLinkedInUrl}</span>
            )}
          </Typography>
        )}
      </Box>

      <Box sx={styles.fieldRow()}>
        <Typography sx={styles.fieldLabel()}>{config.copy.fields.connectedOn}</Typography>
        {isEditing ? (
          <TextField
            fullWidth
            type="date"
            value={editValues.connectedOn || ''}
            onChange={(e) => onChangeEditField('connectedOn', e.target.value || null)}
            error={!!editErrors.connectedOn}
            helperText={editErrors.connectedOn}
            size="small"
            disabled={isSaving}
            InputLabelProps={{ shrink: true }}
          />
        ) : (
          <Typography sx={styles.fieldValue()}>
            {connectedOn ? new Date(connectedOn).toLocaleDateString() : <span style={{ fontStyle: 'italic', color: 'text.disabled' }}>{config.copy.empty.noConnectedOn}</span>}
          </Typography>
        )}
      </Box>
    </Box>
  );
}


