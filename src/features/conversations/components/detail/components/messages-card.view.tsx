'use client';

import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
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

export function MessagesCard({ messages, config, onOpenAddReply }: MessagesCardProps) {
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
              return (
                <Box key={message.id} sx={styles.messageBubble(isUser)}>
                  <Box sx={styles.messageHeader()}>
                    <Typography variant="caption" sx={styles.messageSender()}>
                      {isUser ? config.copy.messages.userLabel : config.copy.messages.contactLabel}
                    </Typography>
                    <Typography variant="caption" sx={styles.messageTimestamp()}>
                      {formatMessageDateTime(message.sentAt)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={styles.messageBody()}>
                    {message.body}
                  </Typography>
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


