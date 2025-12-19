'use client';

import { Box, CircularProgress, Alert, Pagination, Typography, Table, TableHead, TableRow, TableCell, TableBody, TableSortLabel } from '@mui/material';
import type { InterviewsListViewProps } from './interviews-list.types';
import { styles } from './interviews-list.styles';
import { ConversationTableRow } from '@/features/conversations/components/inbox/components/conversation-table-row';
import { ConversationsInboxFilters } from '@/features/conversations/components/inbox/components/conversations-inbox-filters';

export function InterviewsListView({
  interviews,
  isLoading,
  error,
  search,
  page,
  sortBy,
  sortDir,
  status,
  categoryId,
  availableCategories,
  config,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onPageChange,
  onSortChange,
  onRowClick,
}: InterviewsListViewProps) {
  return (
    <Box sx={styles.container()}>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ mb: 0.5 }}>
          {config.copy.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {config.copy.subtitle}
        </Typography>
      </Box>

      {/* Filters */}
      <ConversationsInboxFilters
        search={search}
        status={status}
        categoryId={categoryId}
        stageId={null}
        emailStatus={null}
        availableCategories={availableCategories}
        availableStages={[]}
        config={{
          copy: {
            title: 'Conversations Inbox' as const,
            subtitle: 'All your networking conversations in one place.' as const,
            searchPlaceholder: config.copy.searchPlaceholder,
            createButton: 'New Conversation' as const,
            statusFilter: config.copy.statusFilter,
            categoryFilter: config.copy.categoryFilter,
            stageFilter: { label: 'Stage' as const, all: 'All stages' as const },
            table: {
              contact: 'Contact' as const,
              stage: 'Stage' as const,
              category: 'Category' as const,
              channel: 'Channel' as const,
              lastMessage: 'Last message' as const,
              priority: 'Priority' as const,
              status: 'Status' as const,
              warmOrCold: 'Warm/Cold' as const,
              challenge: 'Challenge' as const,
            },
            emptyState: 'No conversations yet. Create your first one to get started.' as const,
          },
        }}
        onSearchChange={onSearchChange}
        onStatusChange={onStatusChange}
        onCategoryChange={onCategoryChange}
        onStageChange={() => {}}
        onEmailStatusChange={() => {}}
      />

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
          {interviews.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
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
                  <TableCell>{config.copy.table.warmOrCold}</TableCell>
                  <TableCell>{config.copy.table.challenge}</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {interviews.map((interview) => (
                  <ConversationTableRow
                    key={interview.id}
                    conversation={interview}
                    onRowClick={onRowClick}
                    onOpenDelete={() => {}}
                  />
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      )}

      {!isLoading && !error && page > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Pagination
            page={page}
            onChange={(_, value) => onPageChange(value)}
            count={page + 1}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}

