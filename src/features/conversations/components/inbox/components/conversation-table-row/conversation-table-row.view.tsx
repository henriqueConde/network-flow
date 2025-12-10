'use client';

import { TableRow, TableCell, Typography, Chip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { ConversationTableRowProps } from './conversation-table-row.types';
import { styles } from './conversation-table-row.styles';
import { formatTimeAgo } from '../utils';

export function ConversationTableRow({
  conversation,
  onRowClick,
  onOpenDelete,
}: ConversationTableRowProps) {
  return (
    <TableRow
      key={conversation.id}
      hover
      sx={styles.tableRow(true)}
      onClick={() => onRowClick(conversation.id)}
    >
      <TableCell>
        <Typography variant="body2" fontWeight={500}>
          {conversation.contactName}
          {conversation.contactCount > 1 && (
            <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
              +{conversation.contactCount - 1}
            </Typography>
          )}
        </Typography>
        {conversation.contactCompany && (
          <Typography variant="caption" color="text.secondary">
            {conversation.contactCompany}
          </Typography>
        )}
      </TableCell>
      <TableCell>{conversation.stage ?? '—'}</TableCell>
      <TableCell>{conversation.category ?? '—'}</TableCell>
      <TableCell>{conversation.channel}</TableCell>
      <TableCell>
        <Typography variant="caption" color="text.secondary" display="block">
          {formatTimeAgo(conversation.lastMessageAtDate)}
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
          {conversation.lastMessageSnippet ?? '—'}
        </Typography>
      </TableCell>
      <TableCell>{conversation.priority ?? 'N/A'}</TableCell>
      <TableCell>
        {conversation.stage && conversation.stage.toLowerCase().startsWith('closed') ? (
          <Chip
            size="small"
            label="N/A"
            sx={styles.chipWaiting()}
          />
        ) : conversation.needsAttention ? (
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
        {conversation.isOutOfSync && (
          <Chip
            size="small"
            label="Out of sync"
            variant="outlined"
            sx={styles.chipOutOfSync()}
          />
        )}
      </TableCell>
      <TableCell>
        {conversation.warmOrCold ? (
          <Chip
            label={conversation.warmOrCold.charAt(0).toUpperCase() + conversation.warmOrCold.slice(1)}
            size="small"
            color={conversation.warmOrCold === 'warm' ? 'success' : 'default'}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">—</Typography>
        )}
      </TableCell>
      <TableCell>
        <Typography variant="body2" color="text.secondary">
          {conversation.challengeName || '—'}
        </Typography>
      </TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onOpenDelete(conversation.id, conversation.contactName);
          }}
          aria-label="Delete conversation"
          color="error"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

