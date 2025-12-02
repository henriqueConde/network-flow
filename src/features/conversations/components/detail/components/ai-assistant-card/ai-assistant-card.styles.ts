import { Theme } from '@mui/material';

export const styles = {
  card: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '600px',
    maxHeight: '600px',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    overflow: 'hidden',
  }),
  cardTitle: () => (theme: Theme) => ({
    fontWeight: 600,
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
  }),
  chatContainer: () => (theme: Theme) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  }),
  messagesArea: () => (theme: Theme) => ({
    flex: 1,
    overflowY: 'auto',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  }),
  messageBubble: (isUser: boolean) => (theme: Theme) => ({
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    maxWidth: '80%',
    padding: theme.spacing(1.5, 2),
    borderRadius: theme.spacing(2),
    backgroundColor: isUser
      ? theme.palette.primary.main
      : theme.palette.grey[100],
    color: isUser
      ? theme.palette.primary.contrastText
      : theme.palette.text.primary,
  }),
  messageContent: () => (theme: Theme) => ({
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  }),
  suggestedReplyBox: () => (theme: Theme) => ({
    mt: theme.spacing(1),
    p: theme.spacing(1.5),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(1),
    border: `1px solid ${theme.palette.primary.light}`,
  }),
  inputArea: () => (theme: Theme) => ({
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
  }),
  inputField: () => (theme: Theme) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: theme.spacing(2),
    },
  }),
  sendButton: () => (theme: Theme) => ({
    borderRadius: theme.spacing(2),
    minWidth: '80px',
  }),
  loadingIndicator: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(1.5, 2),
    color: theme.palette.text.secondary,
  }),
};

