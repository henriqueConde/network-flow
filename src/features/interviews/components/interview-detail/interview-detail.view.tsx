'use client';

import { Box, Typography, Button, TextField, CircularProgress, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import type { InterviewDetailViewProps } from './interview-detail.types';
import { styles } from './interview-detail.styles';
import { MessagesCard } from '@/features/conversations/components/detail/components/messages-card';

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

      {/* Conversation/Messages Section */}
      <Box sx={styles.section()}>
        <Typography sx={styles.sectionTitle()}>
          {config.copy.conversation.title}
        </Typography>
        <MessagesCard
          messages={interview.messages.map(msg => ({
            ...msg,
            contactId: msg.sender === 'contact' ? interview.contactId : null,
            contactName: msg.sender === 'contact' ? interview.contactName : null,
          }))}
          contacts={[{
            id: interview.contactId,
            name: interview.contactName,
            company: interview.contactCompany,
          }]}
          onOpenAddReply={() => {}}
          config={{
            copy: {
              title: 'Conversation Detail' as const,
              backButton: 'Back to Inbox' as const,
              outOfSyncBanner: {
                title: 'New messages detected' as const,
                message: 'This conversation has newer messages on LinkedIn. Open the thread, copy the new messages, and paste them here to sync.' as const,
                action: 'Paste new messages' as const,
              },
              contact: {
                label: 'Contact' as const,
                company: 'Company' as const,
              },
              metadata: {
                category: 'Category' as const,
                stage: 'Stage' as const,
                priority: 'Priority' as const,
                nextAction: 'Next action' as const,
                dueDate: 'Due date' as const,
                originalUrl: {
                  label: 'Original URL' as const,
                  placeholder: 'https://...' as const,
                  helperText: 'Link to the original conversation (e.g., LinkedIn)' as const,
                  goToButton: 'Go to conversation' as const,
                },
              },
              summary: {
                title: 'Summary' as const,
                empty: 'No summary available' as const,
              },
              messages: {
                title: 'Messages' as const,
                empty: config.copy.conversation.empty,
                userLabel: 'You' as const,
                contactLabel: 'Contact' as const,
                addReply: 'Add Reply' as const,
                actions: {
                  edit: 'Edit message' as const,
                  delete: 'Delete message' as const,
                  deleteConfirmation: 'Are you sure you want to delete this message?' as const,
                },
                status: {
                  pending: 'Pending' as const,
                  confirmed: 'Confirmed' as const,
                  togglePending: 'Click to mark as pending' as const,
                  toggleConfirmed: 'Click to confirm' as const,
                },
              },
              addReplyDialog: {
                title: 'Add Reply' as const,
                bodyLabel: 'Message' as const,
                bodyPlaceholder: 'Type the message here...' as const,
                senderLabel: 'From' as const,
                sentAtLabel: 'Date & Time' as const,
                cancel: 'Cancel' as const,
                submit: 'Add Message' as const,
                submitting: 'Adding...' as const,
              },
              notes: {
                title: 'Notes' as const,
                placeholder: 'Add your personal notes about this conversation...' as const,
                label: 'Personal notes' as const,
              },
              actions: {
                save: 'Save changes' as const,
                saving: 'Saving...' as const,
                cancel: 'Cancel' as const,
              },
              priority: {
                low: 'Low' as const,
                medium: 'Medium' as const,
                high: 'High' as const,
              },
              aiAssistant: {
                title: 'AI Assistant' as const,
                suggestedReply: {
                  title: 'Suggested Reply' as const,
                  copy: 'Copy' as const,
                  regenerate: 'Regenerate' as const,
                },
                suggestedNextAction: {
                  title: 'Suggested Next Action' as const,
                },
                summary: {
                  title: 'Conversation Summary' as const,
                },
                button: {
                  reanalyze: 'Re-analyze Conversation' as const,
                  getSuggestions: 'Get AI Suggestions' as const,
                },
              },
              autoFollowups: {
                label: 'Auto follow-ups' as const,
                helper:
                  'Automatically draft follow-up messages every 2 days (up to 3) when this opportunity is not moving forward.' as const,
              },
              contacts: {
                title: 'Participants' as const,
                addContact: 'Add Contact' as const,
                removeContact: 'Remove' as const,
                empty: 'No contacts' as const,
              },
              addContactDialog: {
                title: 'Add Contact to Conversation' as const,
                contactLabel: 'Contact' as const,
                contactPlaceholder: 'Search for a contact...' as const,
                cancel: 'Cancel' as const,
                add: 'Add' as const,
                allContactsAdded: 'All your contacts are already in this conversation.' as const,
              },
            },
          }}
          onConfirmMessage={() => {}}
          onEditMessage={() => {}}
          onDeleteMessage={() => {}}
        />
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

