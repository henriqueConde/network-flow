'use client';

import { Card, CardContent, Typography, TextField, Box, Button, CircularProgress } from '@mui/material';
import type { NotesCardProps } from './notes-card.types';
import { styles } from './notes-card.styles';

export function NotesCard({
  notes,
  isEditing,
  isSaving,
  error,
  config,
  onChangeNotes,
  onSave,
  onCancel,
}: NotesCardProps) {
  return (
    <Card sx={styles.card()}>
      <CardContent>
        <Typography variant="h6" sx={styles.cardTitle()}>
          {config.copy.notes.title}
        </Typography>
        <TextField
          multiline
          rows={4}
          fullWidth
          placeholder={config.copy.notes.placeholder}
          value={notes || ''}
          onChange={(e) => onChangeNotes(e.target.value || null)}
          error={!!error}
          helperText={error}
          disabled={!isEditing || isSaving}
          sx={styles.notesTextarea()}
        />
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





