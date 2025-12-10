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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { CompaniesPageViewProps } from './companies-page.types';
import { styles } from './companies-page.styles';

export function CompaniesPageView({
  companies,
  totalPages,
  page,
  isLoading,
  error,
  search,
  industry,
  fundingRound,
  hasRelevantRole,
  applied,
  sortBy,
  sortDir,
  config,
  onSearchChange,
  onIndustryChange,
  onFundingRoundChange,
  onHasRelevantRoleChange,
  onAppliedChange,
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
  deleteCompanyName,
  onOpenDelete,
  onCloseDeleteDialog,
  onConfirmDelete,
  isDeleting,
}: CompaniesPageViewProps) {
  const handleSort = (field: 'name' | 'fundingDate' | 'updatedAt' | 'createdAt') => {
    const newSortDir = sortBy === field && sortDir === 'asc' ? 'desc' : 'asc';
    onSortChange(field, newSortDir);
  };

  const handleRowAction = (e: React.MouseEvent, company: typeof companies[0], action: 'edit' | 'delete') => {
    e.stopPropagation();
    if (action === 'edit') {
      onOpenEdit(company);
    } else {
      onOpenDelete(company);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '—';
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
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
        <TextField
          placeholder="Industry"
          value={industry}
          onChange={(e) => onIndustryChange(e.target.value)}
          size="small"
          sx={{ minWidth: 200 }}
        />
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Funding Round</InputLabel>
          <Select
            value={fundingRound || ''}
            onChange={(e) => onFundingRoundChange(e.target.value || null)}
            label="Funding Round"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="seed">Seed</MenuItem>
            <MenuItem value="series-a">Series A</MenuItem>
            <MenuItem value="series-b">Series B</MenuItem>
            <MenuItem value="series-c">Series C</MenuItem>
            <MenuItem value="series-d">Series D+</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Has Role</InputLabel>
          <Select
            value={hasRelevantRole === null ? '' : hasRelevantRole ? 'yes' : 'no'}
            onChange={(e) => {
              const val = e.target.value as string;
              onHasRelevantRoleChange(val === '' ? null : val === 'yes');
            }}
            label="Has Role"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Applied</InputLabel>
          <Select
            value={applied === null ? '' : applied ? 'yes' : 'no'}
            onChange={(e) => {
              const val = e.target.value as string;
              onAppliedChange(val === '' ? null : val === 'yes');
            }}
            label="Applied"
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
        ) : companies.length === 0 ? (
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
                    <TableCell>{config.copy.table.industry}</TableCell>
                    <TableCell>{config.copy.table.fundingRound}</TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortBy === 'fundingDate'}
                        direction={sortBy === 'fundingDate' ? sortDir : 'asc'}
                        onClick={() => handleSort('fundingDate')}
                      >
                        {config.copy.table.fundingDate}
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>{config.copy.table.hasRelevantRole}</TableCell>
                    <TableCell>{config.copy.table.applied}</TableCell>
                    <TableCell>{config.copy.table.actions}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {companies.map((company) => (
                    <TableRow
                      key={company.id}
                      sx={styles.tableRow(true)}
                      onClick={() => onRowClick(company.id)}
                    >
                      <TableCell>{company.name}</TableCell>
                      <TableCell>{company.industry || '—'}</TableCell>
                      <TableCell>{company.fundingRound || '—'}</TableCell>
                      <TableCell>{formatDate(company.fundingDateDate)}</TableCell>
                      <TableCell>{company.hasRelevantRole ? 'Yes' : 'No'}</TableCell>
                      <TableCell>{company.applied ? 'Yes' : 'No'}</TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={(e) => handleRowAction(e, company, 'edit')}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => handleRowAction(e, company, 'delete')}
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
              label="Company Name"
              value={dialogValues.name}
              onChange={(e) => onChangeDialogField('name', e.target.value)}
              error={!!dialogErrors.name}
              helperText={dialogErrors.name}
              required
              fullWidth
            />
            <TextField
              label="Industry"
              value={dialogValues.industry}
              onChange={(e) => onChangeDialogField('industry', e.target.value)}
              fullWidth
            />
            <TextField
              label="Funding Round"
              value={dialogValues.fundingRound}
              onChange={(e) => onChangeDialogField('fundingRound', e.target.value)}
              fullWidth
            />
            <TextField
              label="Funding Date"
              type="date"
              value={dialogValues.fundingDate}
              onChange={(e) => onChangeDialogField('fundingDate', e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Funding Source"
              value={dialogValues.fundingSource}
              onChange={(e) => onChangeDialogField('fundingSource', e.target.value)}
              fullWidth
            />
            <TextField
              label="Careers Page URL"
              value={dialogValues.careersPageUrl}
              onChange={(e) => onChangeDialogField('careersPageUrl', e.target.value)}
              fullWidth
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={dialogValues.hasRelevantRole}
                  onChange={(e) => onChangeDialogField('hasRelevantRole', e.target.checked)}
                />
              }
              label="Has Relevant Role"
            />
            <TextField
              label="Role Title"
              value={dialogValues.roleTitle}
              onChange={(e) => onChangeDialogField('roleTitle', e.target.value)}
              fullWidth
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={dialogValues.applied}
                  onChange={(e) => onChangeDialogField('applied', e.target.checked)}
                />
              }
              label="Applied"
            />
            <TextField
              label="Application Date"
              type="date"
              value={dialogValues.applicationDate}
              onChange={(e) => onChangeDialogField('applicationDate', e.target.value)}
              InputLabelProps={{ shrink: true }}
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
            {config.copy.dialog.deleteMessage} <strong>{deleteCompanyName}</strong>?
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

