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
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { JobPostingsPageViewProps } from './job-postings-page.types';
import { styles } from './job-postings-page.styles';

export function JobPostingsPageView({
  jobPostings,
  totalPages,
  page,
  isLoading,
  error,
  search,
  source,
  companyId,
  outreachDone,
  sortBy,
  sortDir,
  config,
  onSearchChange,
  onSourceChange,
  onCompanyIdChange,
  onOutreachDoneChange,
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
  deleteJobPostingTitle,
  onOpenDelete,
  onCloseDeleteDialog,
  onConfirmDelete,
  isDeleting,
}: JobPostingsPageViewProps) {
  const handleSort = (field: 'jobTitle' | 'postedAt' | 'updatedAt' | 'createdAt') => {
    const newSortDir = sortBy === field && sortDir === 'asc' ? 'desc' : 'asc';
    onSortChange(field, newSortDir);
  };

  const handleRowAction = (e: React.MouseEvent, jobPosting: typeof jobPostings[0], action: 'edit' | 'delete') => {
    e.stopPropagation();
    if (action === 'edit') {
      onOpenEdit(jobPosting);
    } else {
      onOpenDelete(jobPosting);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '—';
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
  };

  const formatSource = (source: string) => {
    const sourceMap: Record<string, string> = {
      linkedin_post: 'LinkedIn Post',
      linkedin_job: 'LinkedIn Job',
      other: 'Other',
    };
    return sourceMap[source] || source;
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
          <InputLabel>Source</InputLabel>
          <Select
            value={source || ''}
            onChange={(e) => onSourceChange(e.target.value ? (e.target.value as typeof source) : null)}
            label="Source"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="linkedin_post">LinkedIn Post</MenuItem>
            <MenuItem value="linkedin_job">LinkedIn Job</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Outreach Done</InputLabel>
          <Select
            value={outreachDone === null ? '' : outreachDone ? 'yes' : 'no'}
            onChange={(e) => {
              const val = e.target.value as string;
              onOutreachDoneChange(val === '' ? null : val === 'yes');
            }}
            label="Outreach Done"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
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
        ) : jobPostings.length === 0 ? (
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
                        active={sortBy === 'jobTitle'}
                        direction={sortBy === 'jobTitle' ? sortDir : 'asc'}
                        onClick={() => handleSort('jobTitle')}
                      >
                        {config.copy.table.jobTitle}
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>{config.copy.table.company}</TableCell>
                    <TableCell>{config.copy.table.source}</TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'postedAt'}
                        direction={sortBy === 'postedAt' ? sortDir : 'asc'}
                        onClick={() => handleSort('postedAt')}
                      >
                        {config.copy.table.postedAt}
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>{config.copy.table.applicants}</TableCell>
                    <TableCell>{config.copy.table.outreachDone}</TableCell>
                    <TableCell>{config.copy.table.actions}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {jobPostings.map((jobPosting) => (
                    <TableRow
                      key={jobPosting.id}
                      sx={styles.tableRow(true)}
                      onClick={() => onRowClick(jobPosting.id)}
                    >
                      <TableCell>{jobPosting.jobTitle}</TableCell>
                      <TableCell>{jobPosting.companyName || '—'}</TableCell>
                      <TableCell>
                        <Chip label={formatSource(jobPosting.source)} size="small" />
                      </TableCell>
                      <TableCell>{formatDate(jobPosting.postedAtDate)}</TableCell>
                      <TableCell>{jobPosting.applicantsWhenFound || '—'}</TableCell>
                      <TableCell>
                        <Chip
                          label={jobPosting.outreachDone ? 'Yes' : 'No'}
                          color={jobPosting.outreachDone ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={(e) => handleRowAction(e, jobPosting, 'edit')}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => handleRowAction(e, jobPosting, 'delete')}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
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
              label="Job Title"
              value={dialogValues.jobTitle}
              onChange={(e) => onChangeDialogField('jobTitle', e.target.value)}
              error={!!dialogErrors.jobTitle}
              helperText={dialogErrors.jobTitle}
              required
              fullWidth
            />
            <TextField
              label="Job URL"
              value={dialogValues.jobUrl}
              onChange={(e) => onChangeDialogField('jobUrl', e.target.value)}
              error={!!dialogErrors.jobUrl}
              helperText={dialogErrors.jobUrl}
              required
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Source</InputLabel>
              <Select
                value={dialogValues.source}
                onChange={(e) => onChangeDialogField('source', e.target.value as typeof dialogValues.source)}
                label="Source"
              >
                <MenuItem value="linkedin_post">LinkedIn Post</MenuItem>
                <MenuItem value="linkedin_job">LinkedIn Job</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Posted At"
              type="date"
              value={dialogValues.postedAt}
              onChange={(e) => onChangeDialogField('postedAt', e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Applicants When Found"
              value={dialogValues.applicantsWhenFound}
              onChange={(e) => onChangeDialogField('applicantsWhenFound', e.target.value)}
              placeholder="e.g., 0, <25, 100+"
              fullWidth
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={dialogValues.outreachDone}
                  onChange={(e) => onChangeDialogField('outreachDone', e.target.checked)}
                />
              }
              label="Outreach Done"
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
            {config.copy.dialog.deleteMessage} <strong>{deleteJobPostingTitle}</strong>?
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

