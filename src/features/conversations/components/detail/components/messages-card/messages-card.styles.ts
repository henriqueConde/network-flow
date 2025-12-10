import { Theme } from '@mui/material';
import { hexToRgba } from '@/shared/utils/color.utils';

export const styles = {
  card: () => (theme: Theme) => ({
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    marginBottom: theme.spacing(5),
  }),
  cardTitle: () => (theme: Theme) => ({
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  }),
  messagesList: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  }),
  messageBubble: (isUser: boolean, contactBgColor?: string) => (theme: Theme) => ({
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    maxWidth: '70%',
    minWidth: '200px', // Minimum width to prevent cramped layout
    padding: theme.spacing(1.5, 2),
    borderRadius: theme.spacing(3),
    backgroundColor: isUser
      ? theme.palette.background.paper
      : contactBgColor || theme.palette.grey[700],
    color: theme.palette.text.primary,
    border: isUser
      ? `1px solid ${theme.palette.primary.light}`
      : contactBgColor
      ? `1px solid ${contactBgColor}`
      : `1px solid ${theme.palette.grey[600]}`,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  }),
  messageHeader: () => (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(0.25),
  }),
  messageSender: () => (theme: Theme) => ({
    fontWeight: 600,
    opacity: 0.9,
    fontSize: '0.75rem',
  }),
  messageActions: () => (theme: Theme) => ({
    display: 'flex',
    gap: theme.spacing(0.25),
  }),
  actionButton: () => (theme: Theme) => ({
    padding: theme.spacing(0.5),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }),
  messageTimestamp: () => (theme: Theme) => ({
    opacity: 0.7,
    fontFamily: 'monospace',
    fontSize: '0.7rem',
    marginBottom: theme.spacing(1),
  }),
  messageBody: () => (theme: Theme) => ({
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    marginBottom: theme.spacing(0.5),
  }),
  statusChipContainer: () => (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(0.5),
  }),
  statusChip: () => (theme: Theme) => ({
    height: '20px',
    fontSize: '0.65rem',
    '& .MuiChip-icon': {
      fontSize: '0.875rem',
    },
  }),
  replyButton: () => (theme: Theme) => ({
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    boxShadow: `0 2px 8px ${hexToRgba(theme.palette.background.paper, 0.5)}`,
    ':hover': {
      backgroundColor: hexToRgba(theme.palette.background.default, 0.8),
      boxShadow: `0 2px 8px ${hexToRgba(theme.palette.background.paper, 0.2)}`,
    },
  }),
};

