'use client';

import { Box, Typography, Button, TextField, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import type { ContactDetailHeaderProps } from './contact-detail-header.types';
import { styles } from './contact-detail-header.styles';

export function ContactDetailHeader({
  contactName,
  contactCompany,
  isEditing,
  isSaving,
  editValues,
  editErrors,
  config,
  onBack,
  onStartEdit,
  onChangeEditField,
  onSave,
  onCancel,
}: ContactDetailHeaderProps) {
  return (
    <Box sx={styles.headerSection()}>
      <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={styles.backButton()}>
        {config.copy.backButton}
      </Button>

      <Box sx={styles.header()}>
        <Box>
          <Typography variant="h4" sx={styles.title()}>
            {isEditing ? (
              <TextField
                fullWidth
                value={editValues.name}
                onChange={(e) => onChangeEditField('name', e.target.value)}
                error={!!editErrors.name}
                helperText={editErrors.name}
                size="small"
              />
            ) : (
              contactName
            )}
          </Typography>
          {contactCompany && (
            <Typography variant="body2" color="text.secondary">
              {isEditing ? (
                <TextField
                  fullWidth
                  value={editValues.company || ''}
                  onChange={(e) => onChangeEditField('company', e.target.value || null)}
                  error={!!editErrors.company}
                  helperText={editErrors.company}
                  size="small"
                  sx={{ mt: 1 }}
                />
              ) : (
                contactCompany
              )}
            </Typography>
          )}
        </Box>
        {!isEditing && (
          <Button startIcon={<EditIcon />} variant="outlined" onClick={onStartEdit}>
            {config.copy.buttons.edit}
          </Button>
        )}
        {isEditing && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" onClick={onCancel} disabled={isSaving}>
              {config.copy.buttons.cancel}
            </Button>
            <Button variant="contained" onClick={onSave} disabled={isSaving}>
              {isSaving ? <CircularProgress size={20} /> : config.copy.buttons.save}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}


