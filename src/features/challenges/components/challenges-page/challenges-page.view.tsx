'use client';

import {
  Box,
  Typography,
  Button,
  TextField,
  Alert,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  Pagination,
  Card,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  LinearProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { ChallengesPageViewProps } from './challenges-page.types';
import { styles } from './challenges-page.styles';

export function ChallengesPageView({
  challenges,
  totalPages,
  page,
  isLoading,
  error,
  search,
  active,
  sortBy,
  sortDir,
  config,
  onSearchChange,
  onActiveChange,
  onPageChange,
  onSortChange,
  onRowClick,
  isDialogOpen,
  isEditing,
  dialogValues,
  dialogErrors,
  onOpenCreate,
  onOpenEdit,
  onCloseDialog,
  onChangeDialogField,
  onSubmitDialog,
  isSubmitting,
  isDeleteDialogOpen,
  deleteChallengeName,
  onOpenDelete,
  onCloseDeleteDialog,
  onConfirmDelete,
  isDeleting,
}: ChallengesPageViewProps) {
  const handleSort = (field: 'name' | 'startDate' | 'endDate' | 'updatedAt' | 'createdAt') => {
    const newSortDir = sortBy === field && sortDir === 'asc' ? 'desc' : 'asc';
    onSortChange(field, newSortDir);
  };

  const handleRowAction = (e: React.MouseEvent, challenge: typeof challenges[0], action: 'edit' | 'delete') => {
    e.stopPropagation();
    if (action === 'edit') {
      onOpenEdit(challenge);
    } else {
      onOpenDelete(challenge);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
  };

  const getProgressPercentage = (challenge: typeof challenges[0]) => {
    if (challenge.goal === 0) return 0;
    return Math.min((challenge.outreachesCount / challenge.goal) * 100, 100);
  };

  return (
    <Box sx={styles.container()}>
      <Box sx={styles.header()}>
        <Box sx={styles.titleBlock()}>
          <Typography variant="h4" sx={styles.title()}>
            {config.copy.title}
          </Typography>
          <Typography variant="body2" sx={styles.subtitle()}>
            {config.copy.subtitle}
          </Typography>
        </Box>
        <Button variant="contained" onClick={onOpenCreate}>
          {config.copy.createButton}
        </Button>
      </Box>

      <Box sx={styles.filtersRow()}>
        <TextField
          placeholder={config.copy.searchPlaceholder}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          size="small"
          sx={{ minWidth: 250 }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={active === null ? '' : active ? 'active' : 'inactive'}
            onChange={(e) => {
              const val = e.target.value as string;
              onActiveChange(val === '' ? null : val === 'active');
            }}
            label="Status"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2, flexShrink: 0 }}>
          {error}
        </Alert>
      )}

      <Card sx={styles.tableCard()}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
            <CircularProgress />
          </Box>
        ) : challenges.length === 0 ? (
          <Box sx={styles.emptyState()}>
            <Typography>{config.copy.emptyState}</Typography>
          </Box>
        ) : (
          <>
            <Box sx={styles.tableWrapper()}>
              <Table sx={styles.table()}>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'name'}
                        direction={sortBy === 'name' ? sortDir : 'asc'}
                        onClick={() => handleSort('name')}
                      >
                        {config.copy.table.name}
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'startDate'}
                        direction={sortBy === 'startDate' ? sortDir : 'asc'}
                        onClick={() => handleSort('startDate')}
                      >
                        {config.copy.table.startDate}
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'endDate'}
                        direction={sortBy === 'endDate' ? sortDir : 'asc'}
                        onClick={() => handleSort('endDate')}
                      >
                        {config.copy.table.endDate}
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>{config.copy.table.goal}</TableCell>
                    <TableCell>{config.copy.table.outreaches}</TableCell>
                    <TableCell>{config.copy.table.accepts}</TableCell>
                    <TableCell>{config.copy.table.replies}</TableCell>
                    <TableCell>{config.copy.table.calls}</TableCell>
                    <TableCell>{config.copy.table.interviews}</TableCell>
                    <TableCell>{config.copy.table.progress}</TableCell>
                    <TableCell>{config.copy.table.actions}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {challenges.map((challenge) => {
                    const progress = getProgressPercentage(challenge);
                    return (
                      <TableRow
                        key={challenge.id}
                        sx={styles.tableRow(true)}
                        onClick={() => onRowClick(challenge.id)}
                      >
                        <TableCell>{challenge.name}</TableCell>
                        <TableCell>{formatDate(challenge.startDateDate)}</TableCell>
                        <TableCell>{formatDate(challenge.endDateDate)}</TableCell>
                        <TableCell>{challenge.goal}</TableCell>
                        <TableCell>{challenge.outreachesCount}</TableCell>
                        <TableCell>{challenge.acceptsCount}</TableCell>
                        <TableCell>{challenge.repliesCount}</TableCell>
                        <TableCell>{challenge.callsCount}</TableCell>
                        <TableCell>{challenge.interviewsCount}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 100 }}>
                            <LinearProgress
                              variant="determinate"
                              value={progress}
                              sx={{ flex: 1, height: 8, borderRadius: 1 }}
                            />
                            <Typography variant="caption" sx={{ minWidth: 35, textAlign: 'right' }}>
                              {Math.round(progress)}%
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={(e) => handleRowAction(e, challenge, 'edit')}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={(e) => handleRowAction(e, challenge, 'delete')}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
            <Box sx={styles.paginationWrapper()}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, newPage) => onPageChange(newPage)}
                color="primary"
              />
            </Box>
          </>
        )}
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onClose={onCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{isEditing ? config.copy.dialog.editTitle : config.copy.dialog.createTitle}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2 }}>
            <TextField
              label="Challenge Name"
              value={dialogValues.name}
              onChange={(e) => onChangeDialogField('name', e.target.value)}
              error={!!dialogErrors.name}
              helperText={dialogErrors.name}
              required
              fullWidth
            />
            <TextField
              label="Start Date"
              type="datetime-local"
              value={dialogValues.startDate ? dialogValues.startDate.slice(0, 16) : ''}
              onChange={(e) => onChangeDialogField('startDate', e.target.value ? new Date(e.target.value).toISOString() : '')}
              InputLabelProps={{ shrink: true }}
              error={!!dialogErrors.startDate}
              helperText={dialogErrors.startDate}
              required
              fullWidth
            />
            <TextField
              label="End Date"
              type="datetime-local"
              value={dialogValues.endDate ? dialogValues.endDate.slice(0, 16) : ''}
              onChange={(e) => onChangeDialogField('endDate', e.target.value ? new Date(e.target.value).toISOString() : '')}
              InputLabelProps={{ shrink: true }}
              error={!!dialogErrors.endDate}
              helperText={dialogErrors.endDate}
              required
              fullWidth
            />
            <TextField
              label="Goal"
              type="number"
              value={dialogValues.goal}
              onChange={(e) => onChangeDialogField('goal', parseInt(e.target.value, 10) || 0)}
              error={!!dialogErrors.goal}
              helperText={dialogErrors.goal}
              required
              fullWidth
            />
            <TextField
              label="Outreaches Per Day (Optional)"
              type="number"
              value={dialogValues.outreachesPerDay ?? ''}
              onChange={(e) => onChangeDialogField('outreachesPerDay', e.target.value ? parseInt(e.target.value, 10) : null)}
              helperText="Set a daily minimum goal to track daily progress"
              fullWidth
            />
            <TextField
              label="Outreaches Count"
              type="number"
              value={dialogValues.outreachesCount}
              onChange={(e) => onChangeDialogField('outreachesCount', parseInt(e.target.value, 10) || 0)}
              fullWidth
            />
            <TextField
              label="Accepts Count"
              type="number"
              value={dialogValues.acceptsCount}
              onChange={(e) => onChangeDialogField('acceptsCount', parseInt(e.target.value, 10) || 0)}
              fullWidth
            />
            <TextField
              label="Replies Count"
              type="number"
              value={dialogValues.repliesCount}
              onChange={(e) => onChangeDialogField('repliesCount', parseInt(e.target.value, 10) || 0)}
              fullWidth
            />
            <TextField
              label="Screenings Scheduled Count"
              type="number"
              value={dialogValues.callsCount}
              onChange={(e) => onChangeDialogField('callsCount', parseInt(e.target.value, 10) || 0)}
              fullWidth
            />
            <TextField
              label="Interviews Count"
              type="number"
              value={dialogValues.interviewsCount}
              onChange={(e) => onChangeDialogField('interviewsCount', parseInt(e.target.value, 10) || 0)}
              fullWidth
            />
            <TextField
              label="Notes"
              value={dialogValues.notes}
              onChange={(e) => onChangeDialogField('notes', e.target.value)}
              multiline
              rows={4}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialog}>{config.copy.dialog.cancel}</Button>
          <Button
            onClick={onSubmitDialog}
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : isEditing ? config.copy.dialog.save : config.copy.dialog.create}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={onCloseDeleteDialog}>
        <DialogTitle>{config.copy.dialog.deleteTitle}</DialogTitle>
        <DialogContent>
          <Typography>
            {config.copy.dialog.deleteMessage} <strong>{deleteChallengeName}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDeleteDialog}>{config.copy.dialog.cancel}</Button>
          <Button
            onClick={onConfirmDelete}
            variant="contained"
            color="error"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : config.copy.dialog.delete}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

