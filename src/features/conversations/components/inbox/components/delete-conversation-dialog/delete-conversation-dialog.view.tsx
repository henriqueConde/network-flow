'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import type { DeleteConversationDialogProps } from './delete-conversation-dialog.types';

export function DeleteConversationDialog({
  isOpen,
  onClose,
  contactName,
  onConfirm,
  isDeleting,
}: DeleteConversationDialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Delete Conversation</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete the conversation with <strong>{contactName}</strong>? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting…' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

