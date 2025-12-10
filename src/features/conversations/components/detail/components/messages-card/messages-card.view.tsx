'use client';

import { Card, CardContent, Typography, Box, Button, Chip, IconButton } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMemo } from 'react';
import { getContactColor, darkenColor } from '@/shared/utils/color.utils';
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
  contacts,
  config, 
  onOpenAddReply, 
  onConfirmMessage,
  onEditMessage,
  onDeleteMessage,
}: MessagesCardProps) {
  // Create a map of contact IDs to colors and names
  const contactColorMap = useMemo(() => {
    const map = new Map<string, string>();
    contacts.forEach((contact) => {
      map.set(contact.id, getContactColor(contact.id));
    });
    return map;
  }, [contacts]);

  // Create a map of contact IDs to contact objects for name lookup
  const contactMap = useMemo(() => {
    const map = new Map<string, { name: string; company: string | null }>();
    contacts.forEach((contact) => {
      map.set(contact.id, { name: contact.name, company: contact.company });
    });
    return map;
  }, [contacts]);

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
              
              // Get contact name: prefer message.contactName, fallback to lookup from contacts array
              let contactDisplayName: string = config.copy.messages.contactLabel;
              let resolvedContactId: string | undefined = undefined;
              
              if (!isUser) {
                if (message.contactName) {
                  contactDisplayName = message.contactName;
                  // Try to find the contactId by name
                  const contactByName = contacts.find(c => c.name === message.contactName);
                  if (contactByName) {
                    resolvedContactId = contactByName.id;
                  }
                } else if (message.contactId) {
                  // Look up contact by contactId
                  const contact = contactMap.get(message.contactId);
                  if (contact) {
                    contactDisplayName = contact.name;
                  }
                  resolvedContactId = message.contactId;
                } else if (contacts.length === 1) {
                  // If no contactId but only one contact, assume it's from that contact
                  contactDisplayName = contacts[0].name;
                  resolvedContactId = contacts[0].id;
                } else if (contacts.length > 0) {
                  // If multiple contacts but no contactId, use the first contact as fallback
                  // (this handles legacy messages before contactId was added)
                  contactDisplayName = contacts[0].name;
                  resolvedContactId = contacts[0].id;
                }
              }
              
              // Get contact color if message is from a contact
              const contactColor = !isUser && resolvedContactId 
                ? contactColorMap.get(resolvedContactId) 
                : undefined;
              
              // Darken the color for better contrast with white text (use 50% darkening)
              const backgroundColor = contactColor 
                ? darkenColor(contactColor, 0.5) 
                : undefined;
              
              return (
                <Box key={message.id} sx={styles.messageBubble(isUser, backgroundColor)}>
                  {/* Header with name and action buttons */}
                  <Box sx={styles.messageHeader()}>
                    <Typography variant="caption" sx={styles.messageSender()}>
                      {isUser 
                        ? config.copy.messages.userLabel 
                        : contactDisplayName
                      }
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

