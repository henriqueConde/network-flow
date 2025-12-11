'use client';

import { Box, Typography, Button, TextField, CircularProgress, Alert, Card, CardContent } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import type { InterviewDetailViewProps } from './interview-detail.types';
import { styles } from './interview-detail.styles';
import { formatDate } from './interview-detail.utils';

export function InterviewDetailView({
  interview,
  isLoading,
  error,
  config,
  notes,
  isEditingNotes,
  isSavingNotes,
  onBack,
  onNotesChange,
  onStartEditNotes,
  onSaveNotes,
  onCancelEditNotes,
  onRelatedConversationClick,
  onRelatedContactClick,
  onConversationClick,
}: InterviewDetailViewProps) {


  if (isLoading) {
    return (
      <Box sx={styles.container()}>
        <Box sx={styles.header()}>
          <Button startIcon={<ArrowBackIcon />} onClick={onBack}>
            {config.copy.backButton}
          </Button>
        </Box>
        <Box sx={styles.scrollableContent()}>
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
            <CircularProgress />
          </Box>
        </Box>
      </Box>
    );
  }

  if (error || !interview) {
    return (
      <Box sx={styles.container()}>
        <Box sx={styles.header()}>
          <Button startIcon={<ArrowBackIcon />} onClick={onBack}>
            {config.copy.backButton}
          </Button>
        </Box>
        <Box sx={styles.scrollableContent()}>
          <Alert severity="error">{error || 'Interview not found'}</Alert>
        </Box>
      </Box>
    );
  }

  // Get last message snippet from messages
  const lastMessageSnippet = interview.messages && interview.messages.length > 0
    ? interview.messages[interview.messages.length - 1].body
    : null;

  return (
    <Box sx={styles.container()}>
      {/* Header - Fixed */}
      <Box sx={styles.header()}>
        <Button startIcon={<ArrowBackIcon />} onClick={onBack}>
          {config.copy.backButton}
        </Button>
      </Box>

      {/* Scrollable Content */}
      <Box sx={styles.scrollableContent()}>
        {/* Contact Information Section */}
      <Box sx={styles.section()}>
        <Typography sx={styles.sectionTitle()}>
          {config.copy.contact.title}
        </Typography>
        <Box sx={styles.contactInfo()}>
          <Box sx={styles.contactField()}>
            <Typography sx={styles.contactLabel()}>
              {config.copy.contact.name}
            </Typography>
            <Typography sx={styles.contactValue()}>
              {interview.contactName}
            </Typography>
          </Box>
          {interview.contactCompany && (
            <Box sx={styles.contactField()}>
              <Typography sx={styles.contactLabel()}>
                {config.copy.contact.company}
              </Typography>
              <Typography sx={styles.contactValue()}>
                {interview.contactCompany}
              </Typography>
            </Box>
          )}
          {interview.contactHeadlineOrRole && (
            <Box sx={styles.contactField()}>
              <Typography sx={styles.contactLabel()}>
                {config.copy.contact.role}
              </Typography>
              <Typography sx={styles.contactValue()}>
                {interview.contactHeadlineOrRole}
              </Typography>
            </Box>
          )}
          {interview.challengeName && (
            <Box sx={styles.contactField()}>
              <Typography sx={styles.contactLabel()}>
                Challenge
              </Typography>
              <Typography sx={styles.contactValue()}>
                {interview.challengeName}
              </Typography>
            </Box>
          )}
          {interview.contactProfileLinks && (
            <Box sx={styles.contactField()}>
              <Typography sx={styles.contactLabel()}>
                {config.copy.contact.profileLinks}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {typeof interview.contactProfileLinks === 'object' && interview.contactProfileLinks !== null && (
                  Object.entries(interview.contactProfileLinks as Record<string, string>).map(([key, value]) => (
                    <Typography key={key} sx={styles.contactValue()}>
                      <a href={value} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                        {key}: {value}
                      </a>
                    </Typography>
                  ))
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {/* Notes Section */}
      <Box sx={styles.section()}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Typography sx={styles.sectionTitle()}>
            {config.copy.notes.title}
          </Typography>
          {!isEditingNotes && (
            <Button
              startIcon={<EditIcon />}
              size="small"
              onClick={onStartEditNotes}
            >
              Edit
            </Button>
          )}
        </Box>
        {isEditingNotes ? (
          <Box>
            <TextField
              fullWidth
              multiline
              rows={6}
              value={notes}
              onChange={(e) => onNotesChange(e.target.value)}
              placeholder={config.copy.notes.placeholder}
              sx={styles.notesTextarea()}
            />
            <Box sx={{ display: 'flex', gap: 1, marginTop: 2, justifyContent: 'flex-end' }}>
              <Button
                startIcon={<CancelIcon />}
                onClick={onCancelEditNotes}
                disabled={isSavingNotes}
              >
                {config.copy.notes.cancel}
              </Button>
              <Button
                startIcon={<SaveIcon />}
                variant="contained"
                onClick={onSaveNotes}
                disabled={isSavingNotes}
              >
                {isSavingNotes ? config.copy.notes.saving : config.copy.notes.save}
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: 'pre-wrap', minHeight: 100 }}
          >
            {interview.notes || config.copy.notes.placeholder}
          </Typography>
        )}
      </Box>

      {/* Conversation Preview Section */}
      <Box sx={styles.section()}>
        <Typography sx={styles.sectionTitle()}>
          {config.copy.conversation.title}
        </Typography>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
                  <Typography variant="h6">
                    {interview.contactName}
                    {interview.contactCompany ? ` • ${interview.contactCompany}` : ''}
                  </Typography>
                </Box>
                {interview.lastMessageAtDate && (
                  <Typography variant="body2" color="text.secondary">
                    Last message: {formatDate(interview.lastMessageAtDate)}
                  </Typography>
                )}
                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  {interview.messages.length} message{interview.messages.length !== 1 ? 's' : ''}
                </Typography>
                {lastMessageSnippet && (
                  <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1, fontStyle: 'italic' }}>
                    &quot;{lastMessageSnippet.slice(0, 100)}{lastMessageSnippet.length > 100 ? '...' : ''}&quot;
                  </Typography>
                )}
              </Box>
              <Button
                variant="outlined"
                size="small"
                startIcon={<VisibilityIcon />}
                onClick={() => onConversationClick(interview.id)}
                sx={{ ml: 2 }}
              >
                View Conversation
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Related Conversations */}
      {interview.relatedConversations.length > 0 && (
        <Box sx={styles.section()}>
          <Typography sx={styles.sectionTitle()}>
            {config.copy.relatedConversations.title}
          </Typography>
          <Box sx={styles.relatedList()}>
            {interview.relatedConversations.map((conv) => (
              <Box
                key={conv.id}
                sx={styles.relatedItem()}
                onClick={() => onRelatedConversationClick(conv.id)}
              >
                <Box>
                  <Typography variant="body2" fontWeight={500}>
                    {conv.contactName}
                    {conv.contactCompany && ` • ${conv.contactCompany}`}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {conv.channel} • {conv.category || 'No category'} • {conv.stage || 'No stage'}
                  </Typography>
                  {conv.lastMessageSnippet && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                      {conv.lastMessageSnippet.slice(0, 100)}...
                    </Typography>
                  )}
                </Box>
                <Button size="small" variant="outlined">
                  {config.copy.relatedConversations.view}
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Related Contacts */}
      {interview.relatedContacts.length > 0 && (
        <Box sx={styles.section()}>
          <Typography sx={styles.sectionTitle()}>
            {config.copy.relatedContacts.title}
          </Typography>
          <Box sx={styles.relatedList()}>
            {interview.relatedContacts.map((contact) => (
              <Box
                key={contact.id}
                sx={styles.relatedItem()}
                onClick={() => onRelatedContactClick(contact.id)}
              >
                <Box>
                  <Typography variant="body2" fontWeight={500}>
                    {contact.name}
                  </Typography>
                  {contact.headlineOrRole && (
                    <Typography variant="caption" color="text.secondary">
                      {contact.headlineOrRole}
                    </Typography>
                  )}
                  {contact.company && (
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      {contact.company}
                    </Typography>
                  )}
                </Box>
                <Button size="small" variant="outlined">
                  {config.copy.relatedContacts.view}
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      )}
      </Box>
    </Box>
  );
}

