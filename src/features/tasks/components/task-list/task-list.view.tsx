'use client';

import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { styles } from './task-list.styles';
import type { TaskListViewProps } from './task-list.types';

function formatDate(dateString: string | null) {
  if (!dateString) return 'No due date';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return 'Invalid date';
  return date.toLocaleDateString();
}

export function TaskListView({
  tasks,
  isLoading,
  error,
  filters,
  config,
  hasCustomFilters,
  isCreateOpen,
  isCreating,
  createValues,
  createErrors,
  isEditOpen,
  isEditing,
  editValues,
  editErrors,
  actionError,
  onChangeCompletion,
  onChangeDueDate,
  onChangePriority,
  onClearFilters,
  onSelectTask,
  onOpenCreate,
  onCloseCreate,
  onChangeCreateField,
  onSubmitCreate,
  onOpenEdit,
  onCloseEdit,
  onChangeEditField,
  onSubmitEdit,
}: TaskListViewProps) {
  const handleCompletionChange = (_: unknown, value: string | null) => {
    if (value) onChangeCompletion(value as TaskListViewProps['filters']['completion']);
  };

  const handleDueDateChange = (_: unknown, value: string | null) => {
    if (value) onChangeDueDate(value as TaskListViewProps['filters']['dueDate']);
  };

  const handlePriorityChange = (event: SelectChangeEvent<string>) => {
    onChangePriority(event.target.value as TaskListViewProps['filters']['priority']);
  };

  const renderStatusChip = (task: TaskListViewProps['tasks'][number]) => {
    const now = new Date();
    const dueDate = task.dueAt ? new Date(task.dueAt) : null;
    const isOverdue = !task.completedAt && dueDate && dueDate < now;

    if (task.completedAt) {
      return <Chip label="Completed" color="success" size="small" sx={styles.chip()} />;
    }

    if (isOverdue) {
      return <Chip label="Overdue" color="error" size="small" sx={styles.chip()} />;
    }

    return <Chip label="Open" color="primary" variant="outlined" size="small" sx={styles.chip()} />;
  };

  return (
    <Box sx={styles.container()}>
      <Box sx={styles.header()}>
        <Box sx={styles.headerTexts()}>
          <Typography variant="h4">{config.copy.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {config.copy.subtitle}
          </Typography>
        </Box>
        <Button variant="contained" onClick={onOpenCreate}>
          {config.copy.createButton}
        </Button>
      </Box>

      <Box sx={styles.filtersRow()}>
        <Box>
          <Typography variant="body2" sx={styles.filterLabel()}>
            {config.copy.filters.completion.label}
          </Typography>
          <ToggleButtonGroup
            color="primary"
            exclusive
            value={filters.completion}
            onChange={handleCompletionChange}
            fullWidth
          >
            <ToggleButton value="all" sx={styles.toggleButton()}>{config.copy.filters.completion.options.all}</ToggleButton>
            <ToggleButton value="open" sx={styles.toggleButton()}>{config.copy.filters.completion.options.open}</ToggleButton>
            <ToggleButton value="completed" sx={styles.toggleButton()}>{config.copy.filters.completion.options.completed}</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box>
          <Typography variant="body2" sx={styles.filterLabel()}>
            {config.copy.filters.dueDate.label}
          </Typography>
          <ToggleButtonGroup
            color="primary"
            exclusive
            value={filters.dueDate}
            onChange={handleDueDateChange}
            fullWidth
          >
            <ToggleButton value="all" sx={styles.toggleButton()}>{config.copy.filters.dueDate.options.all}</ToggleButton>
            <ToggleButton value="today" sx={styles.toggleButton()}>{config.copy.filters.dueDate.options.today}</ToggleButton>
            <ToggleButton value="overdue" sx={styles.toggleButton()}>{config.copy.filters.dueDate.options.overdue}</ToggleButton>
            <ToggleButton value="upcoming" sx={styles.toggleButton()}>{config.copy.filters.dueDate.options.upcoming}</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box>
          <Typography variant="body2" sx={styles.filterLabel()}>
            {config.copy.filters.priority.label}
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel id="tasks-priority-filter">{config.copy.filters.priority.label}</InputLabel>
            <Select
              labelId="tasks-priority-filter"
              label={config.copy.filters.priority.label}
              value={filters.priority}
              onChange={handlePriorityChange}
            >
              <MenuItem value="all">{config.copy.filters.priority.options.all}</MenuItem>
              <MenuItem value="low">{config.copy.filters.priority.options.low}</MenuItem>
              <MenuItem value="medium">{config.copy.filters.priority.options.medium}</MenuItem>
              <MenuItem value="high">{config.copy.filters.priority.options.high}</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={styles.actionsRow()}>
          <Chip
            label="Reset filters"
            onClick={hasCustomFilters ? onClearFilters : undefined}
            variant="outlined"
            sx={!hasCustomFilters ? styles.hiddenChip() : undefined}
          />
        </Box>
      </Box>

      {isLoading && (
        <Box sx={styles.loadingState()}>
          <CircularProgress />
        </Box>
      )}

      {error && !isLoading && (
        <Box sx={styles.errorState()}>
          <Alert severity="error">{config.copy.table.error}</Alert>
        </Box>
      )}

      {actionError && (
        <Alert severity="error" sx={{ maxWidth: 640 }}>
          {actionError}
        </Alert>
      )}

      {!isLoading && !error && (
        <Box sx={styles.tableCard()}>
          {tasks.length === 0 ? (
            <Box sx={styles.emptyState()}>
              <Typography variant="body2">{config.copy.table.empty}</Typography>
            </Box>
          ) : (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{config.copy.table.columns.title}</TableCell>
                  <TableCell>{config.copy.table.columns.dueAt}</TableCell>
                  <TableCell>{config.copy.table.columns.priority}</TableCell>
                  <TableCell>{config.copy.table.columns.status}</TableCell>
                  <TableCell>{config.copy.table.columns.updatedAt}</TableCell>
                  <TableCell sx={styles.actionsCell()}>{config.copy.table.columns.actions}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id} hover sx={styles.tableRow()} onClick={() => onSelectTask(task.id)}>
                    <TableCell>
                      <Typography variant="subtitle1">{task.title}</Typography>
                      {task.description && (
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {task.description}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>{formatDate(task.dueAt)}</TableCell>
                    <TableCell>
                      <Chip
                        label={task.priority ? task.priority : 'None'}
                        size="small"
                        variant={task.priority ? 'filled' : 'outlined'}
                        color={
                          task.priority === 'high'
                            ? 'error'
                            : task.priority === 'medium'
                              ? 'warning'
                              : task.priority === 'low'
                                ? 'default'
                                : 'default'
                        }
                        sx={styles.chip()}
                      />
                    </TableCell>
                    <TableCell>{renderStatusChip(task)}</TableCell>
                    <TableCell>{formatDate(task.updatedAt)}</TableCell>
                    <TableCell sx={styles.actionsCell()}>
                      <Button size="small" onClick={(e) => { e.stopPropagation(); onOpenEdit(task.id); }}>
                        {config.copy.editButton}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      )}

      <Dialog open={isCreateOpen} onClose={onCloseCreate} fullWidth maxWidth="sm">
        <DialogTitle>{config.copy.createDialog.title}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {config.copy.createDialog.description}
          </Typography>
          <TextField
            label={config.copy.createDialog.fields.title}
            value={createValues.title}
            onChange={(e) => onChangeCreateField('title', e.target.value)}
            error={Boolean(createErrors.title)}
            helperText={createErrors.title}
            autoFocus
            fullWidth
            disabled={isCreating}
          />
          <TextField
            label={config.copy.createDialog.fields.description}
            value={createValues.description}
            onChange={(e) => onChangeCreateField('description', e.target.value)}
            fullWidth
            multiline
            minRows={3}
            disabled={isCreating}
          />
          <Box sx={styles.formRow()}>
            <TextField
              type="date"
              label={config.copy.createDialog.fields.dueDate}
              value={createValues.dueDate}
              onChange={(e) => onChangeCreateField('dueDate', e.target.value)}
              InputLabelProps={{ shrink: true }}
              disabled={isCreating}
            />
            <FormControl fullWidth size="small" disabled={isCreating}>
              <InputLabel id="task-priority-create">{config.copy.createDialog.fields.priority}</InputLabel>
              <Select
                labelId="task-priority-create"
                label={config.copy.createDialog.fields.priority}
                value={createValues.priority}
                onChange={(e) => onChangeCreateField('priority', e.target.value as typeof createValues.priority)}
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <Box sx={styles.dialogActions()}>
          <Button onClick={onCloseCreate} disabled={isCreating}>
            {config.copy.createDialog.actions.cancel}
          </Button>
          <Button variant="contained" onClick={onSubmitCreate} disabled={isCreating}>
            {config.copy.createDialog.actions.create}
          </Button>
        </Box>
      </Dialog>

      <Dialog open={isEditOpen} onClose={onCloseEdit} fullWidth maxWidth="sm">
        <DialogTitle>{config.copy.editDialog.title}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {config.copy.editDialog.description}
          </Typography>
          <TextField
            label={config.copy.editDialog.fields.title}
            value={editValues.title}
            onChange={(e) => onChangeEditField('title', e.target.value)}
            error={Boolean(editErrors.title)}
            helperText={editErrors.title}
            autoFocus
            fullWidth
            disabled={isEditing}
          />
          <TextField
            label={config.copy.editDialog.fields.description}
            value={editValues.description}
            onChange={(e) => onChangeEditField('description', e.target.value)}
            fullWidth
            multiline
            minRows={3}
            disabled={isEditing}
          />
          <Box sx={styles.formRow()}>
            <TextField
              type="date"
              label={config.copy.editDialog.fields.dueDate}
              value={editValues.dueDate}
              onChange={(e) => onChangeEditField('dueDate', e.target.value)}
              InputLabelProps={{ shrink: true }}
              disabled={isEditing}
            />
            <FormControl fullWidth size="small" disabled={isEditing}>
              <InputLabel id="task-priority-edit">{config.copy.editDialog.fields.priority}</InputLabel>
              <Select
                labelId="task-priority-edit"
                label={config.copy.editDialog.fields.priority}
                value={editValues.priority}
                onChange={(e) => onChangeEditField('priority', e.target.value as typeof editValues.priority)}
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <Box sx={styles.dialogActions()}>
          <Button onClick={onCloseEdit} disabled={isEditing}>
            {config.copy.editDialog.actions.cancel}
          </Button>
          <Button variant="contained" onClick={onSubmitEdit} disabled={isEditing}>
            {config.copy.editDialog.actions.save}
          </Button>
        </Box>
      </Dialog>
    </Box>
  );
}

