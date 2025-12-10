'use client';

import { Card, CardContent, Typography, Box, TextField, MenuItem, Button, CircularProgress } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Priority } from '@/shared/types';
import type { MetadataCardProps } from './metadata-card.types';
import { styles } from './metadata-card.styles';

export function MetadataCard({
  conversation,
  editValues,
  editErrors,
  isEditing,
  isSaving,
  availableStages,
  availableCategories,
  config,
  onChangeEditField,
  onSave,
  onCancel,
}: MetadataCardProps) {
  return (
    <Card sx={styles.card()}>
      <CardContent>
        <Typography variant="h6" sx={styles.cardTitle()}>
          {config.copy.metadata.category}
        </Typography>
        <Box sx={styles.metadataGrid()}>
          <TextField
            select
            label={config.copy.metadata.category}
            size="small"
            fullWidth
            value={editValues.categoryId || ''}
            onChange={(e) => onChangeEditField('categoryId', e.target.value || null)}
            error={!!editErrors.categoryId}
            helperText={editErrors.categoryId}
            disabled={isSaving}
          >
            <MenuItem value="">None</MenuItem>
            {availableCategories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label={config.copy.metadata.priority}
            size="small"
            fullWidth
            value={editValues.priority}
            onChange={(e) =>
              onChangeEditField('priority', e.target.value as 'low' | 'medium' | 'high')
            }
            error={!!editErrors.priority}
            helperText={editErrors.priority}
            disabled={isSaving}
          >
            <MenuItem value={Priority.LOW}>{config.copy.priority.low}</MenuItem>
            <MenuItem value={Priority.MEDIUM}>{config.copy.priority.medium}</MenuItem>
            <MenuItem value={Priority.HIGH}>{config.copy.priority.high}</MenuItem>
          </TextField>
        </Box>

        <Box sx={styles.stageContainer()}>
          <TextField
            select
            label={config.copy.metadata.stage}
            size="small"
            fullWidth
            value={editValues.stageId || ''}
            onChange={(e) => onChangeEditField('stageId', e.target.value || null)}
            error={!!editErrors.stageId}
            helperText={editErrors.stageId}
            disabled={isSaving}
          >
            <MenuItem value="">None</MenuItem>
            {availableStages.map((stage) => (
              <MenuItem key={stage.id} value={stage.id}>
                {stage.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box sx={styles.stageContainer()}>
          <TextField
            label="Challenge"
            size="small"
            fullWidth
            value={conversation.challengeName || ''}
            disabled
            helperText={conversation.challengeName ? "Challenge assigned to the opportunity that owns this conversation" : "No challenge assigned"}
          />
        </Box>

        <Box sx={styles.nextActionContainer()}>
          <TextField
            label={config.copy.metadata.nextAction}
            size="small"
            fullWidth
            value={editValues.nextActionType || ''}
            onChange={(e) => onChangeEditField('nextActionType', e.target.value || null)}
            error={!!editErrors.nextActionType}
            helperText={editErrors.nextActionType}
            disabled={isSaving}
          />
        </Box>

        <Box sx={styles.dueDateContainer()}>
          <TextField
            label={config.copy.metadata.dueDate}
            type="datetime-local"
            size="small"
            fullWidth
            value={
              editValues.nextActionDueAt
                ? new Date(editValues.nextActionDueAt).toISOString().slice(0, 16)
                : ''
            }
            onChange={(e) =>
              onChangeEditField(
                'nextActionDueAt',
                e.target.value ? new Date(e.target.value).toISOString() : null,
              )
            }
            error={!!editErrors.nextActionDueAt}
            helperText={editErrors.nextActionDueAt}
            disabled={isSaving}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <Box sx={styles.originalUrlContainer()}>
          <TextField
            label={config.copy.metadata.originalUrl.label}
            size="small"
            fullWidth
            value={editValues.originalUrl || ''}
            onChange={(e) => onChangeEditField('originalUrl', e.target.value || null)}
            error={!!editErrors.originalUrl}
            helperText={editErrors.originalUrl || config.copy.metadata.originalUrl.helperText}
            disabled={isSaving}
            placeholder={config.copy.metadata.originalUrl.placeholder}
          />
          {editValues.originalUrl && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<OpenInNewIcon />}
              onClick={() => window.open(editValues.originalUrl || '', '_blank', 'noopener,noreferrer')}
              disabled={isSaving || !editValues.originalUrl}
              sx={styles.goToConversationButton()}
            >
              {config.copy.metadata.originalUrl.goToButton}
            </Button>
          )}
        </Box>

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

