'use client';

import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, TableSortLabel } from '@mui/material';
import type { ConversationsTableProps } from './conversations-table.types';
import { styles } from './conversations-table.styles';
import { ConversationTableRow } from '../conversation-table-row';

export function ConversationsTable({
  conversations,
  sortBy,
  sortDir,
  config,
  onSortChange,
  onRowClick,
  onOpenDelete,
}: ConversationsTableProps) {
  if (conversations.length === 0) {
    return (
      <Box sx={styles.emptyState()}>
        <Typography variant="body2">
          {config.copy.emptyState}
        </Typography>
      </Box>
    );
  }

  return (
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
        {conversations.map((conv) => (
          <ConversationTableRow
            key={conv.id}
            conversation={conv}
            onRowClick={onRowClick}
            onOpenDelete={onOpenDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
}

