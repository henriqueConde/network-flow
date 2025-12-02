'use client';

import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Alert,
  Chip,
  Card,
  CardContent,
  MenuItem,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReplyIcon from '@mui/icons-material/Reply';
import type { ConversationDetailViewProps } from './conversation-detail.types';
import { styles } from './conversation-detail.styles';
import { Priority } from '@/shared/types';

export function ConversationDetailView({
  conversation,
  isLoading,
  error,
  config,
  editValues,
  editErrors,
  isEditing,
  isSaving,
  onBack,
  onChangeEditField,
  onSave,
  onCancel,
  onPasteNewMessages,
  isAddReplyOpen,
  addReplyValues,
  addReplyErrors,
  isAddingReply,
  onOpenAddReply,
  onCloseAddReply,
  onChangeAddReplyField,
  onSubmitAddReply,
  availableStages,
}: ConversationDetailViewProps) {
  const formatDate = (date: Date | null) => {
    if (!date) return '—';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

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

  if (isLoading) {
    return (
      <Box sx={styles.container()}>
        <Box sx={styles.loadingContainer()}>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.container()}>
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={styles.backButton()}>
          {config.copy.backButton}
        </Button>
        <Alert severity="error" sx={styles.errorContainer()}>
          {error}
        </Alert>
      </Box>
    );
  }

  if (!conversation) {
    return (
      <Box sx={styles.container()}>
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={styles.backButton()}>
          {config.copy.backButton}
        </Button>
        <Alert severity="info" sx={styles.errorContainer()}>
          Conversation not found
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={styles.container()}>
      <Box sx={styles.headerSection()}>
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={styles.backButton()}>
          {config.copy.backButton}
        </Button>

        <Box sx={styles.header()}>
          <Box>
            <Typography variant="h4" sx={styles.title()}>
              {conversation.contactName}
            </Typography>
            {conversation.contactCompany && (
              <Typography variant="body2" color="text.secondary">
                {conversation.contactCompany}
              </Typography>
            )}
          </Box>
          {conversation.isOutOfSync && (
            <Chip label="Out of sync" color="warning" variant="outlined" />
          )}
        </Box>
      </Box>

      <Box sx={styles.scrollableContent()}>
        {conversation.isOutOfSync && conversation.latestEmailEvent && (
          <Alert
            severity="warning"
            sx={styles.outOfSyncBanner()}
            action={
              <Button color="inherit" size="small" onClick={onPasteNewMessages}>
                {config.copy.outOfSyncBanner.action}
              </Button>
            }
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600, marginBottom: 0.5 }}>
              {config.copy.outOfSyncBanner.title}
            </Typography>
            <Typography variant="body2">
              {config.copy.outOfSyncBanner.message}
            </Typography>
            {conversation.latestEmailEvent.snippet && (
              <Box sx={{ marginTop: 1, padding: 1, backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 1 }}>
                <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                  &ldquo;{conversation.latestEmailEvent.snippet}&rdquo;
                </Typography>
              </Box>
            )}
          </Alert>
        )}

        <Box sx={styles.contentGrid()}>
        {/* Main column: Messages */}
        <Box sx={styles.mainColumn()}>
          <Card sx={styles.messagesCard()}>
            <CardContent>
              <Typography variant="h6" sx={styles.cardTitle()}>
                {config.copy.messages.title}
              </Typography>
              {conversation.messages.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  {config.copy.messages.empty}
                </Typography>
              ) : (
                <Box sx={styles.messagesList()}>
                  {conversation.messages.map((message) => {
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
        </Box>

        {/* Sidebar: Metadata, Summary, Notes */}
        <Box sx={styles.sidebarColumn()}>
          {/* Metadata Card */}
          <Card sx={styles.card()}>
            <CardContent>
              <Typography variant="h6" sx={styles.cardTitle()}>
                {config.copy.metadata.category}
              </Typography>
              <Box sx={styles.metadataGrid()}>
                <TextField
                  select
                  label={config.copy.metadata.category}
                  size="small"
                  fullWidth
                  value={editValues.categoryId || ''}
                  onChange={(e) => onChangeEditField('categoryId', e.target.value || null)}
                  error={!!editErrors.categoryId}
                  helperText={editErrors.categoryId}
                  disabled={isSaving}
                >
                  <MenuItem value="">None</MenuItem>
                  {conversation.categoryName && (
                    <MenuItem value={conversation.categoryId || ''}>
                      {conversation.categoryName}
                    </MenuItem>
                  )}
                </TextField>

                <TextField
                  select
                  label={config.copy.metadata.stage}
                  size="small"
                  fullWidth
                  value={editValues.stageId || ''}
                  onChange={(e) => onChangeEditField('stageId', e.target.value || null)}
                  error={!!editErrors.stageId}
                  helperText={editErrors.stageId}
                  disabled={isSaving}
                >
                  <MenuItem value="">None</MenuItem>
                  {availableStages.map((stage) => (
                    <MenuItem key={stage.id} value={stage.id}>
                      {stage.name}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  select
                  label={config.copy.metadata.priority}
                  size="small"
                  fullWidth
                  value={editValues.priority}
                  onChange={(e) =>
                    onChangeEditField('priority', e.target.value as 'low' | 'medium' | 'high')
                  }
                  error={!!editErrors.priority}
                  helperText={editErrors.priority}
                  disabled={isSaving}
                >
                  <MenuItem value={Priority.LOW}>{config.copy.priority.low}</MenuItem>
                  <MenuItem value={Priority.MEDIUM}>{config.copy.priority.medium}</MenuItem>
                  <MenuItem value={Priority.HIGH}>{config.copy.priority.high}</MenuItem>
                </TextField>

                <TextField
                  label={config.copy.metadata.nextAction}
                  size="small"
                  fullWidth
                  value={editValues.nextActionType || ''}
                  onChange={(e) => onChangeEditField('nextActionType', e.target.value || null)}
                  error={!!editErrors.nextActionType}
                  helperText={editErrors.nextActionType}
                  disabled={isSaving}
                />

                <TextField
                  label={config.copy.metadata.dueDate}
                  type="datetime-local"
                  size="small"
                  fullWidth
                  value={
                    editValues.nextActionDueAt
                      ? new Date(editValues.nextActionDueAt).toISOString().slice(0, 16)
                      : ''
                  }
                  onChange={(e) =>
                    onChangeEditField(
                      'nextActionDueAt',
                      e.target.value ? new Date(e.target.value).toISOString() : null,
                    )
                  }
                  error={!!editErrors.nextActionDueAt}
                  helperText={editErrors.nextActionDueAt}
                  disabled={isSaving}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>

              {isEditing && (
                <Box sx={styles.actionsRow()}>
                  <Button onClick={onCancel} disabled={isSaving}>
                    {config.copy.actions.cancel}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={onSave}
                    disabled={isSaving}
                    startIcon={isSaving ? <CircularProgress size={16} /> : null}
                  >
                    {isSaving ? config.copy.actions.saving : config.copy.actions.save}
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Summary Card */}
          {conversation.summary && (
            <Card sx={styles.card()}>
              <CardContent>
                <Typography variant="h6" sx={styles.cardTitle()}>
                  {config.copy.summary.title}
                </Typography>
                <Typography variant="body2" sx={styles.summaryText()}>
                  {conversation.summary}
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Notes Card */}
          <Card sx={styles.card()}>
            <CardContent>
              <Typography variant="h6" sx={styles.cardTitle()}>
                {config.copy.notes.title}
              </Typography>
              <TextField
                multiline
                rows={4}
                fullWidth
                placeholder={config.copy.notes.placeholder}
                value={editValues.notes || ''}
                onChange={(e) => onChangeEditField('notes', e.target.value || null)}
                error={!!editErrors.notes}
                helperText={editErrors.notes}
                disabled={!isEditing || isSaving}
                sx={styles.notesTextarea()}
              />
              {isEditing && (
                <Box sx={styles.actionsRow()}>
                  <Button onClick={onCancel} disabled={isSaving}>
                    {config.copy.actions.cancel}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={onSave}
                    disabled={isSaving}
                    startIcon={isSaving ? <CircularProgress size={16} /> : null}
                  >
                    {isSaving ? config.copy.actions.saving : config.copy.actions.save}
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
      </Box>

      {/* Add Reply Dialog */}
      <Dialog open={isAddReplyOpen} onClose={onCloseAddReply} fullWidth maxWidth="sm">
        <DialogTitle>{config.copy.addReplyDialog.title}</DialogTitle>
        <DialogContent>
          <TextField
            select
            label={config.copy.addReplyDialog.senderLabel}
            fullWidth
            size="small"
            value={addReplyValues.sender}
            onChange={(e) => onChangeAddReplyField('sender', e.target.value as 'user' | 'contact')}
            error={!!addReplyErrors.sender}
            helperText={addReplyErrors.sender}
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
            value={
              addReplyValues.sentAt
                ? new Date(addReplyValues.sentAt).toISOString().slice(0, 16)
                : ''
            }
            onChange={(e) => {
              const value = e.target.value;
              if (value) {
                onChangeAddReplyField('sentAt', new Date(value).toISOString());
              }
            }}
            error={!!addReplyErrors.sentAt}
            helperText={addReplyErrors.sentAt}
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
            value={addReplyValues.body}
            onChange={(e) => onChangeAddReplyField('body', e.target.value)}
            error={!!addReplyErrors.body}
            helperText={addReplyErrors.body}
            disabled={isAddingReply}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseAddReply} disabled={isAddingReply}>
            {config.copy.addReplyDialog.cancel}
          </Button>
          <Button
            variant="contained"
            onClick={onSubmitAddReply}
            disabled={isAddingReply || !addReplyValues.body.trim()}
            startIcon={isAddingReply ? <CircularProgress size={16} /> : null}
          >
            {isAddingReply ? config.copy.addReplyDialog.submitting : config.copy.addReplyDialog.submit}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

