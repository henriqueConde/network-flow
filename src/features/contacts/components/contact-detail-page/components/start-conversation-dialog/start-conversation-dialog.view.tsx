'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import type { StartConversationDialogProps } from './start-conversation-dialog.types';

export function StartConversationDialog({
  isOpen,
  onClose,
  values,
  errors,
  onChangeField,
  onSubmit,
  isCreating,
  contactName,
  contactCompany,
  config,
}: StartConversationDialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{config.copy.title}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2 }}>
        <TextField
          label={config.copy.contactName}
          fullWidth
          size="small"
          value={contactName}
          disabled
        />
        {contactCompany && (
          <TextField
            label={config.copy.company}
            fullWidth
            size="small"
            value={contactCompany}
            disabled
          />
        )}
        <TextField
          select
          label={config.copy.channel}
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
          label={config.copy.firstMessageSender}
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
          label={config.copy.firstMessage}
          fullWidth
          required
          size="small"
          multiline
          minRows={4}
          value={values.pastedText}
          onChange={(e) => onChangeField('pastedText', e.target.value)}
          error={!!errors.pastedText}
          helperText={errors.pastedText}
          placeholder={config.copy.firstMessagePlaceholder}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isCreating}>{config.copy.cancel}</Button>
        <Button disabled={isCreating} variant="contained" onClick={onSubmit}>
          {isCreating ? config.copy.submitting : config.copy.submit}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

