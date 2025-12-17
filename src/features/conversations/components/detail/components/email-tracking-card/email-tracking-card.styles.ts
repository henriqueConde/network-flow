import { Theme } from '@mui/material';

export const styles = {
  card: () => (theme: Theme) => ({
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
  }),
  cardTitle: () => (theme: Theme) => ({
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  }),
  fieldRow: () => (theme: Theme) => ({
    marginBottom: theme.spacing(2),
  }),
  fieldLabel: () => (theme: Theme) => ({
    marginBottom: theme.spacing(0.5),
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
  }),
  fieldValue: () => (theme: Theme) => ({
    fontSize: '0.875rem',
  }),
  emptyValue: () => (theme: Theme) => ({
    fontStyle: 'italic',
    color: theme.palette.text.disabled,
  }),
  actionsRow: () => (theme: Theme) => ({
    display: 'flex',
    gap: theme.spacing(2),
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),
  }),
};



