'use client';

import { Card, CardContent, Typography, Box, Button, Chip, IconButton } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { MessagesCardProps } from './messages-card.types';
import { styles } from './messages-card.styles';

const formatMessageDateTime = (date: Date | null) => {
  if (!date) return '—';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

export function MessagesCard({ 
  messages, 
  config, 
  onOpenAddReply, 
  onConfirmMessage,
  onEditMessage,
  onDeleteMessage,
}: MessagesCardProps) {
  return (
    <Card sx={styles.card()}>
      <CardContent>
        <Typography variant="h6" sx={styles.cardTitle()}>
          {config.copy.messages.title}
        </Typography>
        {messages.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            {config.copy.messages.empty}
          </Typography>
        ) : (
          <Box sx={styles.messagesList()}>
            {messages.map((message) => {
              const isUser = message.sender === 'user';
              const isPending = message.status === 'pending';
              return (
                <Box key={message.id} sx={styles.messageBubble(isUser)}>
                  {/* Header with name and action buttons */}
                  <Box sx={styles.messageHeader()}>
                    <Typography variant="caption" sx={styles.messageSender()}>
                      {isUser ? config.copy.messages.userLabel : config.copy.messages.contactLabel}
                    </Typography>
                    <Box sx={styles.messageActions()}>
                      <IconButton
                        size="small"
                        onClick={() => onEditMessage?.(message.id)}
                        sx={styles.actionButton()}
                        title={config.copy.messages.actions.edit}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => onDeleteMessage?.(message.id)}
                        sx={styles.actionButton()}
                        title={config.copy.messages.actions.delete}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  {/* Date/time below name */}
                  <Typography variant="caption" sx={styles.messageTimestamp()}>
                    {formatMessageDateTime(message.sentAt)}
                  </Typography>
                  
                  {/* Message body */}
                  <Typography variant="body2" sx={styles.messageBody()}>
                    {message.body}
                  </Typography>
                  
                  {/* Status chip on bottom right (only for user messages) */}
                  {isUser && (
                    <Box sx={styles.statusChipContainer()}>
                      <Chip
                        icon={isPending ? <PendingIcon /> : <CheckCircleIcon />}
                        label={isPending ? config.copy.messages.status.pending : config.copy.messages.status.confirmed}
                        size="small"
                        color={isPending ? 'warning' : 'success'}
                        sx={styles.statusChip()}
                        onClick={onConfirmMessage ? () => onConfirmMessage(message.id) : undefined}
                        clickable={!!onConfirmMessage}
                        title={onConfirmMessage ? (isPending ? config.copy.messages.status.toggleConfirmed : config.copy.messages.status.togglePending) : undefined}
                      />
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
        )}
        <Button
          variant="contained"
          startIcon={<ReplyIcon />}
          onClick={onOpenAddReply}
          sx={styles.replyButton()}
          fullWidth
        >
          {config.copy.messages.addReply}
        </Button>
      </CardContent>
    </Card>
  );
}

