'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import type { DeleteMessageDialogProps } from './delete-message-dialog.types';

export function DeleteMessageDialog({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  config,
}: DeleteMessageDialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{config.copy.title}</DialogTitle>
      <DialogContent>
        <Typography>
          {config.copy.message}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isDeleting}>
          {config.copy.cancel}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={isDeleting}
        >
          {isDeleting ? config.copy.deleting : config.copy.confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

