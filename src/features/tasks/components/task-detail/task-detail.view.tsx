'use client';

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { styles } from './task-detail.styles';
import type { TaskDetailViewProps } from './task-detail.types';

function formatDate(dateString: string | null) {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return 'Invalid date';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export function TaskDetailView({
  task,
  isLoading,
  error,
  config,
  editValues,
  isEditing,
  isSaving,
  isToggling,
  isDeleting,
  hasChanges,
  actionError,
  onBack,
  onStartEdit,
  onChangeField,
  onSave,
  onCancelEdit,
  onToggleComplete,
  onDelete,
}: TaskDetailViewProps) {
  const renderStatus = () => {
    if (!task) return null;
    const now = new Date();
    const due = task.dueAt ? new Date(task.dueAt) : null;
    const isOverdue = !task.completedAt && due && due < now;

    if (task.completedAt) {
      return <Chip label="Completed" color="success" sx={styles.chip()} />;
    }

    if (isOverdue) {
      return <Chip label="Overdue" color="error" sx={styles.chip()} />;
    }

    return <Chip label="Open" color="primary" variant="outlined" sx={styles.chip()} />;
  };

  if (isLoading) {
    return (
      <Box sx={styles.container()}>
        <Box sx={styles.headerSection()}>
          <Button startIcon={<ArrowBackIcon />} onClick={onBack}>
            {config.copy.back}
          </Button>
        </Box>
        <Box sx={styles.scrollableContent()}>
          <Box sx={styles.loadingContainer()}>
            <CircularProgress />
          </Box>
        </Box>
      </Box>
    );
  }

  if (error || !task) {
    return (
      <Box sx={styles.container()}>
        <Box sx={styles.headerSection()}>
          <Button startIcon={<ArrowBackIcon />} onClick={onBack}>
            {config.copy.back}
          </Button>
        </Box>
        <Box sx={styles.scrollableContent()}>
          <Alert severity={!task ? 'info' : 'error'} sx={styles.errorContainer()}>
            {!task ? config.copy.notFound : error}
          </Alert>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={styles.container()}>
      {/* Header Section - Fixed */}
      <Box sx={styles.headerSection()}>
        <Box sx={styles.headerActions()}>
          <Button startIcon={<ArrowBackIcon />} onClick={onBack}>
            {config.copy.back}
          </Button>
          {!isEditing && (
            <Button startIcon={<EditIcon />} variant="outlined" onClick={onStartEdit}>
              {config.copy.edit}
            </Button>
          )}
          {isEditing && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                startIcon={<CancelIcon />}
                variant="outlined"
                onClick={onCancelEdit}
                disabled={isSaving || isToggling}
              >
                {config.copy.cancel}
              </Button>
              <Button
                startIcon={<SaveIcon />}
                variant="contained"
                onClick={onSave}
                disabled={isSaving || isToggling || !hasChanges}
              >
                {isSaving ? 'Saving...' : config.copy.save}
              </Button>
            </Box>
          )}
        </Box>

        {/* Task Title */}
        {isEditing ? (
          <TextField
            fullWidth
            label={config.copy.fields.title}
            value={editValues.title}
            onChange={(e) => onChangeField('title', e.target.value)}
            error={false}
            sx={{ marginTop: 2 }}
            placeholder="Enter task title"
            disabled={isSaving}
          />
        ) : (
          <Typography variant="h4" sx={styles.title()}>
            {task.title}
          </Typography>
        )}
      </Box>

      {/* Scrollable Content */}
      <Box sx={styles.scrollableContent()}>
        {/* Metadata Section */}
        <Card sx={styles.section()}>
          <CardContent>
            <Typography sx={styles.sectionTitle()}>Details</Typography>
            <Box sx={styles.metadataGrid()}>
              <Box>
                <Typography sx={styles.label()}>{config.copy.metadata.status}</Typography>
                <Box sx={{ mt: 0.5 }}>{renderStatus()}</Box>
              </Box>
              <Box>
                <Typography sx={styles.label()}>{config.copy.metadata.due}</Typography>
                <Typography sx={styles.value()}>{formatDate(task.dueAt)}</Typography>
              </Box>
              <Box>
                <Typography sx={styles.label()}>{config.copy.metadata.priority}</Typography>
                <Typography sx={styles.value()}>{task.priority ?? 'None'}</Typography>
              </Box>
              <Box>
                <Typography sx={styles.label()}>{config.copy.metadata.createdAt}</Typography>
                <Typography sx={styles.value()}>{formatDate(task.createdAt)}</Typography>
              </Box>
              <Box>
                <Typography sx={styles.label()}>{config.copy.metadata.updatedAt}</Typography>
                <Typography sx={styles.value()}>{formatDate(task.updatedAt)}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Task Details Section */}
        <Card sx={styles.section()}>
          <CardContent>
            <Typography sx={styles.sectionTitle()}>Task Information</Typography>
            <Box sx={styles.fieldGrid()}>
              <Box>
                <Typography sx={styles.label()}>{config.copy.fields.dueDate}</Typography>
                {isEditing ? (
                  <TextField
                    type="date"
                    value={editValues.dueDate}
                    onChange={(e) => onChangeField('dueDate', e.target.value)}
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    disabled={isSaving}
                  />
                ) : (
                  <Typography sx={styles.value()}>{formatDate(task.dueAt)}</Typography>
                )}
              </Box>
              <Box>
                <Typography sx={styles.label()}>{config.copy.fields.priority}</Typography>
                {isEditing ? (
                  <FormControl fullWidth size="small" disabled={isSaving}>
                    <InputLabel id="task-priority-select">{config.copy.fields.priority}</InputLabel>
                    <Select
                      labelId="task-priority-select"
                      value={editValues.priority}
                      label={config.copy.fields.priority}
                      onChange={(e) => onChangeField('priority', e.target.value as typeof editValues.priority)}
                    >
                      <MenuItem value="none">None</MenuItem>
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <Typography sx={styles.value()}>{task.priority ?? 'None'}</Typography>
                )}
              </Box>
            </Box>

            <Box>
              <Typography sx={styles.label()}>{config.copy.fields.description}</Typography>
              {isEditing ? (
                <TextField
                  multiline
                  rows={6}
                  value={editValues.description}
                  onChange={(e) => onChangeField('description', e.target.value)}
                  fullWidth
                  placeholder={config.copy.emptyDescription}
                  disabled={isSaving}
                  sx={{ mt: 1 }}
                />
              ) : (
                <Box sx={styles.descriptionBox()}>
                  {task.description ? (
                    <Typography variant="body2">{task.description}</Typography>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      {config.copy.emptyDescription}
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Actions Section */}
        <Box sx={styles.actionsRow()}>
          <Button
            variant={task.completedAt ? 'outlined' : 'contained'}
            color={task.completedAt ? 'primary' : 'success'}
            onClick={onToggleComplete}
            disabled={isToggling || isSaving}
          >
            {task.completedAt ? config.copy.markIncomplete : config.copy.markComplete}
          </Button>
          <Button variant="outlined" color="error" onClick={onDelete} disabled={isDeleting}>
            {config.copy.delete}
          </Button>
        </Box>

        {actionError && (
          <Alert severity="error" sx={{ maxWidth: 520, mt: 2 }}>
            {actionError}
          </Alert>
        )}
      </Box>
    </Box>
  );
}


