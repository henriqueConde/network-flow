'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import type { DeleteContactDialogProps } from './delete-contact-dialog.types';

export function DeleteContactDialog({
  isOpen,
  contactName,
  isDeleting,
  config,
  onClose,
  onConfirm,
}: DeleteContactDialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{config.copy.dialog.deleteTitle}</DialogTitle>
      <DialogContent>
        <Typography>
          {config.copy.dialog.deleteMessage} <strong>{contactName}</strong>? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isDeleting}>
          {config.copy.dialog.cancel}
        </Button>
        <Button variant="contained" color="error" onClick={onConfirm} disabled={isDeleting}>
          {isDeleting ? 'Deleting…' : config.copy.dialog.delete}
        </Button>
      </DialogActions>
    </Dialog>
  );
}




