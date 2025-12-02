'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Box,
  Collapse,
  Typography,
  IconButton,
  Stack,
  Alert,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SendIcon from '@mui/icons-material/Send';
import { useState, useRef, useEffect, useCallback } from 'react';
import type { AddReplyDialogProps } from './add-reply-dialog.types';

export function AddReplyDialog({
  isOpen,
  values,
  errors,
  isAddingReply,
  conversation,
  config,
  onClose,
  onChangeField,
  onSubmit,
  aiMessages,
  isAiLoading,
  aiError,
  onSendAiMessage,
  onClearAiMessages,
  onUseAiSuggestion,
}: AddReplyDialogProps) {
  const [isAiExpanded, setIsAiExpanded] = useState(false);
  const [aiInputValue, setAiInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevIsOpenRef = useRef(isOpen);

  // Auto-scroll to bottom when new AI messages arrive
  useEffect(() => {
    if (isAiExpanded) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [aiMessages, isAiExpanded]);

  // Reset everything when dialog opens - fresh start for each reply
  useEffect(() => {
    // Only clear when transitioning from closed to open
    const wasClosed = !prevIsOpenRef.current;
    const isNowOpen = isOpen;
    
    if (isNowOpen && wasClosed) {
      // Clear messages when dialog opens - fresh start for this reply
      onClearAiMessages();
      setAiInputValue('');
      setIsAiExpanded(false);
    } else if (!isNowOpen && prevIsOpenRef.current) {
      // Reset when closing
      setAiInputValue('');
      setIsAiExpanded(false);
    }
    
    prevIsOpenRef.current = isOpen;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleGenerateReply = () => {
    onSendAiMessage('Generate a reply suggestion for this conversation.');
  };

  const handleAiSend = () => {
    const trimmed = aiInputValue.trim();
    if (!trimmed || isAiLoading) return;
    
    onSendAiMessage(trimmed);
    setAiInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAiSend();
    }
  };

  const getLatestReply = () => {
    const latestMessage = aiMessages[aiMessages.length - 1];
    return latestMessage?.metadata?.suggestedReply;
  };

  const handleUseSuggestion = () => {
    const suggestion = getLatestReply();
    if (suggestion && onUseAiSuggestion) {
      onUseAiSuggestion(suggestion);
      setIsAiExpanded(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{config.copy.addReplyDialog.title}</DialogTitle>
      <DialogContent>
        <TextField
          select
          label={config.copy.addReplyDialog.senderLabel}
          fullWidth
          size="small"
          value={values.sender}
          onChange={(e) => onChangeField('sender', e.target.value as 'user' | 'contact')}
          error={!!errors.sender}
          helperText={errors.sender}
          disabled={isAddingReply}
          sx={{ mt: 2 }}
        >
          <MenuItem value="user">{config.copy.messages.userLabel}</MenuItem>
          <MenuItem value="contact">
            {conversation?.contactName}
            {conversation?.contactCompany ? ` (${conversation.contactCompany})` : ''}
          </MenuItem>
        </TextField>
        <TextField
          label={config.copy.addReplyDialog.sentAtLabel}
          type="datetime-local"
          fullWidth
          size="small"
          value={values.sentAt ? new Date(values.sentAt).toISOString().slice(0, 16) : ''}
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              onChangeField('sentAt', new Date(value).toISOString());
            }
          }}
          error={!!errors.sentAt}
          helperText={errors.sentAt}
          disabled={isAddingReply}
          InputLabelProps={{ shrink: true }}
          sx={{ mt: 2 }}
        />
        <TextField
          label={config.copy.addReplyDialog.bodyLabel}
          placeholder={config.copy.addReplyDialog.bodyPlaceholder}
          fullWidth
          multiline
          rows={6}
          value={values.body}
          onChange={(e) => onChangeField('body', e.target.value)}
          error={!!errors.body}
          helperText={errors.body}
          disabled={isAddingReply}
          sx={{ mt: 2 }}
        />

        {/* AI Assistant Section */}
        <Box sx={{ mt: 3, mb: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            startIcon={<AutoAwesomeIcon />}
            endIcon={isAiExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsAiExpanded((prev) => !prev);
            }}
            disabled={isAddingReply}
            sx={{ 
              justifyContent: 'space-between',
              textTransform: 'none',
              py: 1.5,
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <Box component="span" sx={{ flex: 1, textAlign: 'left' }}>
              AI Assistant - Get help writing your reply
            </Box>
          </Button>

          <Collapse in={isAiExpanded} timeout="auto" unmountOnExit={false}>
            <Box
              sx={{
                mt: 2,
                p: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                backgroundColor: 'background.default',
                maxHeight: '400px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* AI Messages Area */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: 'auto',
                  mb: 2,
                  minHeight: '200px',
                  maxHeight: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                {aiMessages.length === 0 && !isAiLoading && (
                  <Box sx={{ textAlign: 'center', color: 'text.secondary', py: 4 }}>
                    <AutoAwesomeIcon sx={{ fontSize: 48, mb: 2, opacity: 0.3 }} />
                    <Typography variant="body2" sx={{ mb: 3 }}>
                      Click the button below to generate a reply suggestion based on the conversation.
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<AutoAwesomeIcon />}
                      onClick={handleGenerateReply}
                      disabled={isAddingReply}
                    >
                      Generate Reply Suggestion
                    </Button>
                  </Box>
                )}

                {aiMessages.map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '80%',
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: message.role === 'user' ? 'primary.main' : 'grey.800',
                      color: message.role === 'user' ? 'primary.contrastText' : 'text.primary',
                      border: message.role === 'user' ? 'none' : '1px solid',
                      borderColor: message.role === 'user' ? 'transparent' : 'grey.700',
                    }}
                  >
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                      {message.content}
                    </Typography>

                    {message.role === 'assistant' && message.metadata?.suggestedReply && (
                      <Box sx={{ mt: 1.5, pt: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                          {config.copy.aiAssistant.suggestedReply.title}
                        </Typography>
                        <Box
                          sx={{
                            p: 1.5,
                            backgroundColor: 'grey.900',
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'primary.main',
                            mb: 1,
                          }}
                        >
                          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                            {message.metadata.suggestedReply}
                          </Typography>
                        </Box>
                        <Stack direction="row" spacing={1}>
                          <Button
                            size="small"
                            variant="contained"
                            onClick={handleUseSuggestion}
                            disabled={isAddingReply}
                          >
                            Use This Reply
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<ContentCopyIcon />}
                            onClick={() => {
                              if (message.metadata?.suggestedReply) {
                                navigator.clipboard.writeText(message.metadata.suggestedReply);
                              }
                            }}
                          >
                            Copy
                          </Button>
                        </Stack>
                      </Box>
                    )}
                  </Box>
                ))}

                {isAiLoading && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1.5 }}>
                    <CircularProgress size={16} />
                    <Typography variant="body2" color="text.secondary">
                      AI is thinking...
                    </Typography>
                  </Box>
                )}

                {aiError && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {aiError}
                  </Alert>
                )}

                <div ref={messagesEndRef} />
              </Box>

              <Divider sx={{ my: 1 }} />

              {/* Optional: Refine with context */}
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                  Optional: Provide context to refine the reply (e.g., &quot;Make it more casual&quot; or &quot;Focus on scheduling&quot;)
                </Typography>
                <Stack direction="row" spacing={1} alignItems="flex-end">
                  <TextField
                    fullWidth
                    multiline
                    maxRows={2}
                    placeholder="e.g., 'Make it more casual' or 'Focus on scheduling a call'..."
                    value={aiInputValue}
                    onChange={(e) => setAiInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isAiLoading || isAddingReply}
                    size="small"
                  />
                  <IconButton
                    color="primary"
                    onClick={handleAiSend}
                    disabled={!aiInputValue.trim() || isAiLoading || isAddingReply}
                    title="Refine reply with context"
                  >
                    {isAiLoading ? <CircularProgress size={20} /> : <SendIcon />}
                  </IconButton>
                </Stack>
              </Box>
            </Box>
          </Collapse>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isAddingReply}>
          {config.copy.addReplyDialog.cancel}
        </Button>
        <Button
          variant="contained"
          onClick={onSubmit}
          disabled={isAddingReply || !values.body.trim()}
          startIcon={isAddingReply ? <CircularProgress size={16} /> : null}
        >
          {isAddingReply ? config.copy.addReplyDialog.submitting : config.copy.addReplyDialog.submit}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
