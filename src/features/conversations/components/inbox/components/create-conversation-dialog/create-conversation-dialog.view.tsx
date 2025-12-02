'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import type { CreateConversationDialogProps } from './create-conversation-dialog.types';
import { styles } from './create-conversation-dialog.styles';

export function CreateConversationDialog({
  isOpen,
  onClose,
  values,
  errors,
  onChangeField,
  onSubmit,
  isCreating,
}: CreateConversationDialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>New Conversation</DialogTitle>
      <DialogContent sx={styles.createDialogContent()}>
        <TextField
          label="Contact name"
          fullWidth
          required
          size="small"
          value={values.contactName}
          onChange={(e) => onChangeField('contactName', e.target.value)}
          error={!!errors.contactName}
          helperText={errors.contactName}
        />
        <TextField
          label="Company (optional)"
          fullWidth
          size="small"
          value={values.contactCompany}
          onChange={(e) => onChangeField('contactCompany', e.target.value)}
          error={!!errors.contactCompany}
          helperText={errors.contactCompany}
        />
        <TextField
          select
          label="Channel"
          fullWidth
          size="small"
          value={values.channel}
          onChange={(e) =>
            onChangeField('channel', e.target.value as typeof values.channel)
          }
        >
          <MenuItem value="linkedin">LinkedIn</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="twitter">Twitter</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
        <TextField
          select
          label="First message from"
          fullWidth
          size="small"
          value={values.firstMessageSender}
          onChange={(e) =>
            onChangeField('firstMessageSender', e.target.value as typeof values.firstMessageSender)
          }
        >
          <MenuItem value="contact">Contact</MenuItem>
          <MenuItem value="user">You</MenuItem>
        </TextField>
        <TextField
          label="Pasted conversation text"
          fullWidth
          required
          size="small"
          multiline
          minRows={4}
          value={values.pastedText}
          onChange={(e) => onChangeField('pastedText', e.target.value)}
          error={!!errors.pastedText}
          helperText={errors.pastedText}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button disabled={isCreating} variant="contained" onClick={onSubmit}>
          {isCreating ? 'Creating…' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

