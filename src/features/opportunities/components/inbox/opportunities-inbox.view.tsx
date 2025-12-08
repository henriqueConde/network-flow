'use client';

import { Box, Typography, Button, CircularProgress, Alert, Pagination, TextField, MenuItem, Select, FormControl, InputLabel, Table, TableHead, TableRow, TableCell, TableBody, TableSortLabel, IconButton, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { OpportunityListItem } from '../../services/opportunities.service';
import type { Category } from '@/features/categories';
import type { Stage } from '@/features/stages';
import { formatTimeAgo } from '@/features/conversations/components/inbox/components/utils/format-time-ago';

type OpportunitiesInboxConfig = {
  copy: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    createButton: string;
    categoryFilter: {
      label: string;
      all: string;
    };
    stageFilter: {
      label: string;
      all: string;
    };
    table: {
      contact: string;
      title: string;
      stage: string;
      category: string;
      nextAction: string;
      priority: string;
      lastMessage: string;
      warmOrCold: string;
      challenge: string;
    };
    emptyState: string;
    deleteConfirm: string;
  };
};

type OpportunitiesInboxViewProps = {
  opportunities: OpportunityListItem[];
  total: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  search: string;
  page: number;
  sortBy: 'updatedAt' | 'nextActionDueAt' | 'priority';
  sortDir: 'asc' | 'desc';
  categoryId: string | null;
  stageId: string | null;
  availableCategories: Category[];
  availableStages: Stage[];
  config: OpportunitiesInboxConfig;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string | null) => void;
  onStageChange: (value: string | null) => void;
  onPageChange: (value: number) => void;
  onSortChange: (sortBy: 'updatedAt' | 'nextActionDueAt' | 'priority', sortDir: 'asc' | 'desc') => void;
  onRowClick: (opportunityId: string) => void;
  onOpenDelete: (opportunityId: string, opportunityTitle: string | null) => void;
  isDeleteDialogOpen: boolean;
  deleteOpportunityTitle: string | null;
  onCloseDeleteDialog: () => void;
  onConfirmDelete: () => void;
  isDeleting: boolean;
};

export function OpportunitiesInboxView({
  opportunities,
  total,
  totalPages,
  isLoading,
  error,
  search,
  page,
  sortBy,
  sortDir,
  categoryId,
  stageId,
  availableCategories,
  availableStages,
  config,
  onSearchChange,
  onCategoryChange,
  onStageChange,
  onPageChange,
  onSortChange,
  onRowClick,
  onOpenDelete,
  isDeleteDialogOpen,
  deleteOpportunityTitle,
  onCloseDeleteDialog,
  onConfirmDelete,
  isDeleting,
}: OpportunitiesInboxViewProps) {
  const getPriorityColor = (priority: 'low' | 'medium' | 'high' | null) => {
    if (!priority) return 'default';
    if (priority === 'high') return 'error';
    if (priority === 'medium') return 'warning';
    return 'default';
  };

  const formatDateSimple = (date: Date | null) => {
    if (!date) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Box sx={{ maxWidth: 1400, margin: '0 auto', padding: 3 }}>
      {/* Header */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h4" gutterBottom>
          {config.copy.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {config.copy.subtitle}
        </Typography>
      </Box>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, marginBottom: 3, flexWrap: 'wrap' }}>
        <TextField
          placeholder={config.copy.searchPlaceholder}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          size="small"
          sx={{ minWidth: 300, flex: 1 }}
        />
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>{config.copy.categoryFilter.label}</InputLabel>
          <Select
            value={categoryId || ''}
            label={config.copy.categoryFilter.label}
            onChange={(e) => onCategoryChange(e.target.value || null)}
          >
            <MenuItem value="">{config.copy.categoryFilter.all}</MenuItem>
            {availableCategories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>{config.copy.stageFilter.label}</InputLabel>
          <Select
            value={stageId || ''}
            label={config.copy.stageFilter.label}
            onChange={(e) => onStageChange(e.target.value || null)}
          >
            <MenuItem value="">{config.copy.stageFilter.all}</MenuItem>
            {availableStages.map((stage) => (
              <MenuItem key={stage.id} value={stage.id}>
                {stage.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && !isLoading && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!isLoading && !error && (
        <Box sx={{ backgroundColor: 'background.paper', borderRadius: 1, overflow: 'hidden' }}>
          {opportunities.length === 0 ? (
            <Box sx={{ padding: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {config.copy.emptyState}
              </Typography>
            </Box>
          ) : (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{config.copy.table.contact}</TableCell>
                  <TableCell>{config.copy.table.title}</TableCell>
                  <TableCell>{config.copy.table.stage}</TableCell>
                  <TableCell>{config.copy.table.category}</TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'nextActionDueAt'}
                      direction={sortBy === 'nextActionDueAt' ? sortDir : 'desc'}
                      onClick={() =>
                        onSortChange(
                          'nextActionDueAt',
                          sortBy === 'nextActionDueAt' && sortDir === 'desc' ? 'asc' : 'desc',
                        )
                      }
                    >
                      {config.copy.table.nextAction}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'priority'}
                      direction={sortBy === 'priority' ? sortDir : 'desc'}
                      onClick={() =>
                        onSortChange(
                          'priority',
                          sortBy === 'priority' && sortDir === 'desc' ? 'asc' : 'desc',
                        )
                      }
                    >
                      {config.copy.table.priority}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === 'updatedAt'}
                      direction={sortBy === 'updatedAt' ? sortDir : 'desc'}
                      onClick={() =>
                        onSortChange(
                          'updatedAt',
                          sortBy === 'updatedAt' && sortDir === 'desc' ? 'asc' : 'desc',
                        )
                      }
                    >
                      {config.copy.table.lastMessage}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>{config.copy.table.warmOrCold}</TableCell>
                  <TableCell>{config.copy.table.challenge}</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {opportunities.map((opp) => (
                  <TableRow
                    key={opp.id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => onRowClick(opp.id)}
                  >
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {opp.contactName}
                      </Typography>
                      {opp.contactCompany && (
                        <Typography variant="caption" color="text.secondary">
                          {opp.contactCompany}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {opp.title || '—'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{opp.stageName || '—'}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{opp.categoryName || '—'}</Typography>
                    </TableCell>
                    <TableCell>
                      {opp.nextActionDueAtDate ? (
                        <Typography variant="body2">
                          {formatDateSimple(opp.nextActionDueAtDate)}
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          —
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {opp.priority ? (
                        <Typography
                          variant="body2"
                          color={`${getPriorityColor(opp.priority)}.main`}
                          fontWeight="medium"
                        >
                          {opp.priority.charAt(0).toUpperCase() + opp.priority.slice(1)}
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          —
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {opp.lastMessageAtDate ? (
                        <Typography variant="body2" color="text.secondary">
                          {formatTimeAgo(opp.lastMessageAtDate)}
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          —
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      {opp.warmOrCold ? (
                        <Chip
                          label={opp.warmOrCold.charAt(0).toUpperCase() + opp.warmOrCold.slice(1)}
                          size="small"
                          color={opp.warmOrCold === 'warm' ? 'success' : 'default'}
                        />
                      ) : (
                        <Typography variant="body2" color="text.secondary">—</Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {opp.challengeName || '—'}
                      </Typography>
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onOpenDelete(opp.id, opp.title)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      )}

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Pagination
            page={page}
            count={totalPages}
            onChange={(_, value) => onPageChange(value)}
            color="primary"
          />
        </Box>
      )}

      {/* Delete Dialog */}
      {isDeleteDialogOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1300,
          }}
          onClick={onCloseDeleteDialog}
        >
          <Box
            sx={{
              backgroundColor: 'background.paper',
              padding: 3,
              borderRadius: 2,
              maxWidth: 400,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Typography variant="h6" gutterBottom>
              Delete Opportunity
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {config.copy.deleteConfirm}
              {deleteOpportunityTitle && (
                <>
                  <br />
                  <strong>{deleteOpportunityTitle}</strong>
                </>
              )}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button onClick={onCloseDeleteDialog} disabled={isDeleting}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={onConfirmDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

