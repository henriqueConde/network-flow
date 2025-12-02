'use client';

import {
  Box,
  Typography,
  TextField,
  CircularProgress,
  Alert,
  Chip,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  Pagination,
  Card,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { ContactsPageViewProps } from './contacts-page.types';
import { styles } from './contacts-page.styles';

export function ContactsPageView({
  contacts,
  total,
  page,
  pageSize,
  totalPages,
  isLoading,
  error,
  search,
  company,
  categoryId,
  stageId,
  primaryPlatform,
  sortBy,
  sortDir,
  availableCategories,
  availableStages,
  config,
  onSearchChange,
  onCompanyChange,
  onCategoryChange,
  onStageChange,
  onPlatformChange,
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
  deleteContactName,
  onOpenDelete,
  onCloseDeleteDialog,
  onConfirmDelete,
  isDeleting,
}: ContactsPageViewProps) {
  const formatTimeAgo = (date: Date | null) => {
    if (!date) return '—';
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 30) return `${diffDays}d ago`;
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths}mo ago`;
  };

  const handleSort = (field: 'name' | 'company' | 'updatedAt' | 'createdAt') => {
    const newSortDir = sortBy === field && sortDir === 'asc' ? 'desc' : 'asc';
    onSortChange(field, newSortDir);
  };

  const handleRowAction = (e: React.MouseEvent, contact: typeof contacts[0], action: 'edit' | 'delete') => {
    e.stopPropagation();
    if (action === 'edit') {
      onOpenEdit(contact);
    } else {
      onOpenDelete(contact);
    }
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
        <Button variant="contained" startIcon={<AddIcon />} onClick={onOpenCreate}>
          {config.copy.createButton}
        </Button>
      </Box>

      <Box sx={styles.filtersRow()}>
        <TextField
          size="small"
          placeholder={config.copy.searchPlaceholder}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          sx={{ minWidth: 200 }}
        />
        <TextField
          size="small"
          placeholder="Filter by company"
          value={company}
          onChange={(e) => onCompanyChange(e.target.value)}
          sx={{ minWidth: 180 }}
        />
        <TextField
          select
          size="small"
          label={config.copy.table.category}
          value={categoryId || ''}
          onChange={(e) => onCategoryChange(e.target.value || null)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">All categories</MenuItem>
          {availableCategories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label={config.copy.table.stage}
          value={stageId || ''}
          onChange={(e) => onStageChange(e.target.value || null)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">All stages</MenuItem>
          {availableStages.map((stage) => (
            <MenuItem key={stage.id} value={stage.id}>
              {stage.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          size="small"
          label={config.copy.table.platform}
          value={primaryPlatform || ''}
          onChange={(e) => onPlatformChange(e.target.value || null)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All platforms</MenuItem>
          <MenuItem value="linkedin">LinkedIn</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="twitter">Twitter</MenuItem>
        </TextField>
      </Box>

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      <Card sx={styles.tableCard()}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
            <CircularProgress />
          </Box>
        ) : contacts.length === 0 ? (
          <Box sx={styles.emptyState()}>
            <Typography>{config.copy.emptyState}</Typography>
          </Box>
        ) : (
          <>
            <Table>
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
                  <TableCell>{config.copy.table.role}</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'company'}
                      direction={sortBy === 'company' ? sortDir : 'asc'}
                      onClick={() => handleSort('company')}
                    >
                      {config.copy.table.company}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>{config.copy.table.platform}</TableCell>
                  <TableCell>{config.copy.table.stage}</TableCell>
                  <TableCell>{config.copy.table.category}</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'updatedAt'}
                      direction={sortBy === 'updatedAt' ? sortDir : 'asc'}
                      onClick={() => handleSort('updatedAt')}
                    >
                      {config.copy.table.lastTouch}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>{config.copy.table.actions}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow
                    key={contact.id}
                    sx={styles.tableRow(true)}
                    onClick={() => onRowClick(contact.id)}
                  >
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {contact.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {contact.headlineOrRole || '—'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {contact.company || '—'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {contact.primaryPlatform && (
                        <Chip
                          label={contact.primaryPlatform}
                          size="small"
                          sx={styles.chip()}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      {contact.latestConversation?.stageName && (
                        <Chip
                          label={contact.latestConversation.stageName}
                          size="small"
                          sx={styles.chip()}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      {contact.latestConversation?.categoryName && (
                        <Chip
                          label={contact.latestConversation.categoryName}
                          size="small"
                          sx={styles.chip()}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {contact.latestConversation?.lastMessageAtDate
                          ? formatTimeAgo(contact.latestConversation.lastMessageAtDate)
                          : '—'}
                      </Typography>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={(e) => handleRowAction(e, contact, 'edit')}
                          aria-label="Edit contact"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => handleRowAction(e, contact, 'delete')}
                          aria-label="Delete contact"
                          color="error"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, newPage) => onPageChange(newPage)}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}
      </Card>

      {/* Create/Edit Contact Dialog */}
      <Dialog open={isDialogOpen} onClose={onCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{isEditing ? config.copy.dialog.editTitle : config.copy.dialog.createTitle}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2 }}>
          <TextField
            label="Name"
            fullWidth
            required
            size="small"
            value={dialogValues.name}
            onChange={(e) => onChangeDialogField('name', e.target.value)}
            error={!!dialogErrors.name}
            helperText={dialogErrors.name}
          />
          <TextField
            label="Role / Headline"
            fullWidth
            size="small"
            value={dialogValues.headlineOrRole || ''}
            onChange={(e) => onChangeDialogField('headlineOrRole', e.target.value)}
            error={!!dialogErrors.headlineOrRole}
            helperText={dialogErrors.headlineOrRole}
          />
          <TextField
            label="Company"
            fullWidth
            size="small"
            value={dialogValues.company || ''}
            onChange={(e) => onChangeDialogField('company', e.target.value)}
            error={!!dialogErrors.company}
            helperText={dialogErrors.company}
          />
          <TextField
            select
            label="Primary Platform"
            fullWidth
            size="small"
            value={dialogValues.primaryPlatform || ''}
            onChange={(e) => onChangeDialogField('primaryPlatform', e.target.value)}
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
            value={dialogValues.categoryId || ''}
            onChange={(e) => onChangeDialogField('categoryId', e.target.value || null)}
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
            value={dialogValues.stageId || ''}
            onChange={(e) => onChangeDialogField('stageId', e.target.value || null)}
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
          <Button onClick={onCloseDialog} disabled={isSubmitting}>
            {config.copy.dialog.cancel}
          </Button>
          <Button
            variant="contained"
            onClick={onSubmitDialog}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? 'Saving…'
              : isEditing
                ? config.copy.dialog.save
                : config.copy.dialog.create}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={onCloseDeleteDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{config.copy.dialog.deleteTitle}</DialogTitle>
        <DialogContent>
          <Typography>
            {config.copy.dialog.deleteMessage} <strong>{deleteContactName}</strong>? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDeleteDialog} disabled={isDeleting}>
            {config.copy.dialog.cancel}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={onConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting…' : config.copy.dialog.delete}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
