'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
} from '@mui/material';
import type { AddReplyDialogProps } from './add-reply-dialog.types';

export function AddReplyDialog({
  isOpen,
  values,
  errors,
  isAddingReply,
  conversation,
  config,
  onClose,
  onChangeField,
  onSubmit,
}: AddReplyDialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{config.copy.addReplyDialog.title}</DialogTitle>
      <DialogContent>
        <TextField
          select
          label={config.copy.addReplyDialog.senderLabel}
          fullWidth
          size="small"
          value={values.sender}
          onChange={(e) => onChangeField('sender', e.target.value as 'user' | 'contact')}
          error={!!errors.sender}
          helperText={errors.sender}
          disabled={isAddingReply}
          sx={{ mt: 2 }}
        >
          <MenuItem value="user">{config.copy.messages.userLabel}</MenuItem>
          <MenuItem value="contact">
            {conversation?.contactName}
            {conversation?.contactCompany ? ` (${conversation.contactCompany})` : ''}
          </MenuItem>
        </TextField>
        <TextField
          label={config.copy.addReplyDialog.sentAtLabel}
          type="datetime-local"
          fullWidth
          size="small"
          value={values.sentAt ? new Date(values.sentAt).toISOString().slice(0, 16) : ''}
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              onChangeField('sentAt', new Date(value).toISOString());
            }
          }}
          error={!!errors.sentAt}
          helperText={errors.sentAt}
          disabled={isAddingReply}
          InputLabelProps={{ shrink: true }}
          sx={{ mt: 2 }}
        />
        <TextField
          label={config.copy.addReplyDialog.bodyLabel}
          placeholder={config.copy.addReplyDialog.bodyPlaceholder}
          fullWidth
          multiline
          rows={6}
          value={values.body}
          onChange={(e) => onChangeField('body', e.target.value)}
          error={!!errors.body}
          helperText={errors.body}
          disabled={isAddingReply}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isAddingReply}>
          {config.copy.addReplyDialog.cancel}
        </Button>
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={isAddingReply || !values.body.trim()}
          startIcon={isAddingReply ? <CircularProgress size={16} /> : null}
        >
          {isAddingReply ? config.copy.addReplyDialog.submitting : config.copy.addReplyDialog.submit}
        </Button>
      </DialogActions>
    </Dialog>
  );
}



