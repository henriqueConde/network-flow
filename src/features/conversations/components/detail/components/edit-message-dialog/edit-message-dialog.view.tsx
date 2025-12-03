'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import type { EditMessageDialogProps } from './edit-message-dialog.types';

export function EditMessageDialog({
  isOpen,
  values,
  errors,
  isUpdating,
  config,
  onClose,
  onChangeField,
  onSubmit,
}: EditMessageDialogProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{config.copy.title}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={6}
            label={config.copy.fields.body.label}
            value={values.body}
            onChange={(e) => onChangeField('body', e.target.value)}
            error={!!errors.body}
            helperText={errors.body}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            type="datetime-local"
            label={config.copy.fields.sentAt.label}
            value={values.sentAt ? new Date(values.sentAt).toISOString().slice(0, 16) : ''}
            onChange={(e) => {
              const value = e.target.value;
              if (value) {
                onChangeField('sentAt', new Date(value).toISOString());
              }
            }}
            error={!!errors.sentAt}
            helperText={errors.sentAt}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isUpdating}>
            {config.copy.buttons.cancel}
          </Button>
          <Button type="submit" variant="contained" disabled={isUpdating}>
            {isUpdating ? <CircularProgress size={20} /> : config.copy.buttons.save}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

