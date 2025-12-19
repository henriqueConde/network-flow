'use client';

import {
  Box,
  Typography,
  CircularProgress,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  Pagination,
  Card,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatEnumToTitleCase } from '@/shared/utils/string.utils';
import type { ContactsTableProps } from './contacts-table.types';
import { styles } from './contacts-table.styles';

export function ContactsTable({
  contacts,
  totalPages,
  page,
  isLoading,
  sortBy,
  sortDir,
  availableCategories,
  availableStages,
  config,
  onSortChange,
  onPageChange,
  onRowClick,
  onOpenEdit,
  onOpenDelete,
}: ContactsTableProps) {
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
          <Box sx={styles.tableWrapper()}>
            <Table stickyHeader sx={styles.table()}>
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
                  <TableCell>Warm/Cold</TableCell>
                  <TableCell>Connection</TableCell>
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
                        <Chip label={contact.primaryPlatform} size="small" sx={styles.chip()} />
                      )}
                    </TableCell>
                    <TableCell>
                      {contact.warmOrCold ? (
                        <Chip 
                          label={contact.warmOrCold.charAt(0).toUpperCase() + contact.warmOrCold.slice(1)} 
                          size="small" 
                          sx={styles.chip()}
                          color={contact.warmOrCold === 'warm' ? 'success' : 'default'}
                        />
                      ) : (
                        '—'
                      )}
                    </TableCell>
                    <TableCell>
                      {contact.connectionStatus ? (
                        <Chip 
                          label={formatEnumToTitleCase(contact.connectionStatus)} 
                          size="small" 
                          sx={styles.chip()}
                          color={
                            contact.connectionStatus === 'connected' ? 'success' :
                            contact.connectionStatus === 'request_sent' ? 'warning' :
                            'default'
                          }
                        />
                      ) : (
                        '—'
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
          </Box>
          {totalPages > 1 && (
            <Box sx={styles.paginationWrapper()}>
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
  );
}

