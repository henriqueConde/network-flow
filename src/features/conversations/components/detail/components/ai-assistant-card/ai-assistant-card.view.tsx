'use client';

import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  IconButton,
  CircularProgress,
  Alert,
  Stack,
  Button,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SendIcon from '@mui/icons-material/Send';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState, useRef, useEffect } from 'react';
import type { AiAssistantCardProps } from './ai-assistant-card.types';
import { styles } from './ai-assistant-card.styles';

export function AiAssistantCard({
  messages,
  isLoading,
  error,
  config,
  onSendMessage,
  onCopyReply,
}: AiAssistantCardProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;
    
    onSendMessage(trimmed);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getLatestReply = () => {
    const latestMessage = messages[messages.length - 1];
    return latestMessage?.metadata?.suggestedReply;
  };

  return (
    <Card sx={styles.card()}>
      <Box sx={styles.cardTitle()}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AutoAwesomeIcon color="primary" />
          <Typography variant="h6">{config.copy.aiAssistant.title}</Typography>
        </Box>
      </Box>

      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 0, overflow: 'hidden' }}>
        <Box sx={styles.chatContainer()}>
          <Box ref={messagesAreaRef} sx={styles.messagesArea()}>
            {messages.length === 0 && (
              <Box sx={{ textAlign: 'center', color: 'text.secondary', py: 4 }}>
                <AutoAwesomeIcon sx={{ fontSize: 48, mb: 2, opacity: 0.3 }} />
                <Typography variant="body2">
                  Start a conversation with the AI assistant. Ask for reply suggestions, 
                  next actions, or provide context about how you want to respond.
                </Typography>
              </Box>
            )}

            {messages.map((message) => (
              <Box key={message.id} sx={styles.messageBubble(message.role === 'user')}>
                <Typography variant="body2" sx={styles.messageContent()}>
                  {message.content}
                </Typography>

                {message.role === 'assistant' && message.metadata?.suggestedReply && (
                  <Box sx={styles.suggestedReplyBox()}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                      {config.copy.aiAssistant.suggestedReply.title}
                    </Typography>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', mb: 1 }}>
                      {message.metadata.suggestedReply}
                    </Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<ContentCopyIcon />}
                      onClick={() => {
                        if (message.metadata?.suggestedReply) {
                          navigator.clipboard.writeText(message.metadata.suggestedReply);
                          onCopyReply?.(message.metadata.suggestedReply);
                        }
                      }}
                    >
                      {config.copy.aiAssistant.suggestedReply.copy}
                    </Button>
                  </Box>
                )}

                {message.role === 'assistant' && message.metadata?.suggestedNextAction && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
                      {config.copy.aiAssistant.suggestedNextAction.title}
                    </Typography>
                    <Typography variant="caption">
                      {message.metadata.suggestedNextAction}
                      {message.metadata.suggestedNextActionDueAt && (
                        <> • Due: {message.metadata.suggestedNextActionDueAt}</>
                      )}
                    </Typography>
                  </Box>
                )}

                {message.role === 'assistant' && message.metadata?.summary && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 0.5 }}>
                      {config.copy.aiAssistant.summary.title}
                    </Typography>
                    <Typography variant="caption">
                      {message.metadata.summary}
                    </Typography>
                  </Box>
                )}
              </Box>
            ))}

            {isLoading && (
              <Box sx={styles.loadingIndicator()}>
                <CircularProgress size={16} />
                <Typography variant="body2" color="text.secondary">
                  AI is thinking...
                </Typography>
              </Box>
            )}

            {error && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {error}
              </Alert>
            )}

            <div ref={messagesEndRef} />
          </Box>

          <Box sx={styles.inputArea()}>
            <Stack direction="row" spacing={1} alignItems="flex-end">
              <TextField
                fullWidth
                multiline
                maxRows={4}
                placeholder="Ask for a reply suggestion, provide context, or ask questions..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                size="small"
                sx={styles.inputField()}
              />
              <IconButton
                color="primary"
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                sx={styles.sendButton()}
              >
                {isLoading ? <CircularProgress size={20} /> : <SendIcon />}
              </IconButton>
            </Stack>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
