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
  fieldRow: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
    '&:last-child': {
      marginBottom: 0,
    },
  }),
  fieldLabel: () => (theme: Theme) => ({
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
  }),
  fieldValue: () => (theme: Theme) => ({
    fontSize: '1rem',
    color: theme.palette.text.primary,
  }),
  emptyValue: () => (theme: Theme) => ({
    fontSize: '1rem',
    color: theme.palette.text.disabled,
    fontStyle: 'italic',
  }),
};


