import { Theme } from '@mui/material/styles';

export const styles = {
  card: () => (theme: Theme) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: 1,
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(3),
  }),
  cardTitle: () => (theme: Theme) => ({
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    fontSize: '1.125rem',
  }),
  emptyValue: () => (theme: Theme) => ({
    fontSize: '1rem',
    color: theme.palette.text.disabled,
    fontStyle: 'italic',
  }),
  conversationsList: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  }),
  conversationItem: () => (theme: Theme) => ({
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 1,
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }),
};




