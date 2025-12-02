'use client';

import {
  Box,
  Typography,
  Button,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
  Alert,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  Pagination,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type { ConversationsInboxViewProps, CreateConversationFormValues } from './conversations-inbox.types';
import { styles } from './conversations-inbox.styles';

export function ConversationsInboxView({
  conversations,
  isLoading,
  error,
  search,
  page,
  sortBy,
  sortDir,
  status,
  config,
  onSearchChange,
  onStatusChange,
  onPageChange,
  onSortChange,
  onRowClick,
  onOpenCreate,
  isCreateOpen,
  onCloseCreate,
  onSubmitCreate,
  createValues,
  createErrors,
  onChangeCreateField,
  isCreating,
}: ConversationsInboxViewProps) {
  const formatTimeAgo = (date: Date | null) => {
    if (!date) return '—';
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
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
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onOpenCreate}
        >
          {config.copy.createButton}
        </Button>
      </Box>

      <Box sx={styles.filtersRow()}>
        <TextField
          size="small"
          placeholder={config.copy.searchPlaceholder}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <ToggleButtonGroup
          size="small"
          value={status}
          exclusive
          onChange={(_, value) => {
            if (value) {
              onStatusChange(value);
            }
          }}
        >
          <ToggleButton value="all">
            {config.copy.statusFilter.all}
          </ToggleButton>
          <ToggleButton value="needs_attention">
            {config.copy.statusFilter.needs_attention}
          </ToggleButton>
          <ToggleButton value="waiting_on_them">
            {config.copy.statusFilter.waiting_on_them}
          </ToggleButton>
        </ToggleButtonGroup>
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
        <Box sx={styles.tableCard()}>
          {conversations.length === 0 ? (
            <Box sx={styles.emptyState()}>
              <Typography variant="body2">
                {config.copy.emptyState}
              </Typography>
            </Box>
          ) : (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{config.copy.table.contact}</TableCell>
                  <TableCell>{config.copy.table.stage}</TableCell>
                  <TableCell>{config.copy.table.category}</TableCell>
                  <TableCell>{config.copy.table.channel}</TableCell>
                  <TableCell sortDirection={sortBy === 'lastMessageAt' ? sortDir : false}>
                    <TableSortLabel
                      active={sortBy === 'lastMessageAt'}
                      direction={sortBy === 'lastMessageAt' ? sortDir : 'desc'}
                      onClick={() =>
                        onSortChange(
                          'lastMessageAt',
                          sortBy === 'lastMessageAt' && sortDir === 'desc' ? 'asc' : 'desc',
                        )
                      }
                    >
                      {config.copy.table.lastMessage}
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sortDirection={sortBy === 'priority' ? sortDir : false}>
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
                  <TableCell>{config.copy.table.status}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {conversations.map((conv) => (
                  <TableRow
                    key={conv.id}
                    hover
                    sx={styles.tableRow(true)}
                    onClick={() => onRowClick(conv.id)}
                  >
                    <TableCell>
                      <Typography variant="body2" fontWeight={500}>
                        {conv.contactName}
                      </Typography>
                      {conv.contactCompany && (
                        <Typography variant="caption" color="text.secondary">
                          {conv.contactCompany}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>{conv.stage ?? '—'}</TableCell>
                    <TableCell>{conv.category ?? '—'}</TableCell>
                    <TableCell>{conv.channel}</TableCell>
                    <TableCell>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {formatTimeAgo(conv.lastMessageAtDate)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          maxWidth: 260,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {conv.lastMessageSnippet ?? '—'}
                      </Typography>
                    </TableCell>
                    <TableCell>{conv.priority}</TableCell>
                    <TableCell>
                      {conv.needsAttention ? (
                        <Chip
                          size="small"
                          label="Needs attention"
                          sx={styles.chipNeedsAttention()}
                        />
                      ) : (
                        <Chip
                          size="small"
                          label="Waiting on them"
                          sx={styles.chipWaiting()}
                        />
                      )}
                      {conv.isOutOfSync && (
                        <Chip
                          size="small"
                          label="Out of sync"
                          variant="outlined"
                          sx={styles.chipOutOfSync()}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      )}

      {/* Simple pagination (page count is approximate; backend currently only returns current page) */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Pagination
          page={page}
          onChange={(_, value) => onPageChange(value)}
          count={page + 1}
          color="primary"
        />
      </Box>

      {/* Create Conversation Dialog */}
      <Dialog open={isCreateOpen} onClose={onCloseCreate} fullWidth maxWidth="sm">
        <DialogTitle>New Conversation</DialogTitle>
        <DialogContent sx={styles.createDialogContent()}>
          <TextField
            label="Contact name"
            fullWidth
            required
            size="small"
            value={createValues.contactName}
            onChange={(e) => onChangeCreateField('contactName', e.target.value)}
            error={!!createErrors.contactName}
            helperText={createErrors.contactName}
          />
          <TextField
            label="Company (optional)"
            fullWidth
            size="small"
            value={createValues.contactCompany}
            onChange={(e) => onChangeCreateField('contactCompany', e.target.value)}
            error={!!createErrors.contactCompany}
            helperText={createErrors.contactCompany}
          />
          <TextField
            select
            label="Channel"
            fullWidth
            size="small"
            value={createValues.channel}
            onChange={(e) =>
              onChangeCreateField('channel', e.target.value as CreateConversationFormValues['channel'])
            }
          >
            <MenuItem value="linkedin">LinkedIn</MenuItem>
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="twitter">Twitter</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
          <TextField
            label="Pasted conversation text"
            fullWidth
            required
            size="small"
            multiline
            minRows={4}
            value={createValues.pastedText}
            onChange={(e) => onChangeCreateField('pastedText', e.target.value)}
            error={!!createErrors.pastedText}
            helperText={createErrors.pastedText}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseCreate}>Cancel</Button>
          <Button disabled={isCreating} variant="contained" onClick={onSubmitCreate}>
            {isCreating ? 'Creating…' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}


