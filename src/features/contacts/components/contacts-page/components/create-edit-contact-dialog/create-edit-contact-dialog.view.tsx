'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';
import type { CreateEditContactDialogProps } from './create-edit-contact-dialog.types';

export function CreateEditContactDialog({
  isOpen,
  isEditing,
  values,
  errors,
  isSubmitting,
  availableCategories,
  availableStages,
  config,
  onClose,
  onChangeField,
  onSubmit,
}: CreateEditContactDialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{isEditing ? config.copy.dialog.editTitle : config.copy.dialog.createTitle}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2 }}>
        <TextField
          label="Name"
          fullWidth
          required
          size="small"
          value={values.name}
          onChange={(e) => onChangeField('name', e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Role / Headline"
          fullWidth
          size="small"
          value={values.headlineOrRole || ''}
          onChange={(e) => onChangeField('headlineOrRole', e.target.value)}
          error={!!errors.headlineOrRole}
          helperText={errors.headlineOrRole}
        />
        <TextField
          label="Company"
          fullWidth
          size="small"
          value={values.company || ''}
          onChange={(e) => onChangeField('company', e.target.value)}
          error={!!errors.company}
          helperText={errors.company}
        />
        <TextField
          select
          label="Primary Platform"
          fullWidth
          size="small"
          value={values.primaryPlatform || ''}
          onChange={(e) => onChangeField('primaryPlatform', e.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="linkedin">LinkedIn</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="twitter">Twitter</MenuItem>
        </TextField>
        <TextField
          select
          label="Category"
          fullWidth
          size="small"
          value={values.categoryId || ''}
          onChange={(e) => onChangeField('categoryId', e.target.value || null)}
        >
          <MenuItem value="">None</MenuItem>
          {availableCategories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Stage"
          fullWidth
          size="small"
          value={values.stageId || ''}
          onChange={(e) => onChangeField('stageId', e.target.value || null)}
        >
          <MenuItem value="">None</MenuItem>
          {availableStages.map((stage) => (
            <MenuItem key={stage.id} value={stage.id}>
              {stage.name}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          {config.copy.dialog.cancel}
        </Button>
        <Button variant="contained" onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting
            ? 'Saving…'
            : isEditing
              ? config.copy.dialog.save
              : config.copy.dialog.create}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

