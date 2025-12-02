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
  notesTextarea: () => (theme: Theme) => ({
    width: '100%',
    minHeight: 120,
  }),
  actionsRow: () => (theme: Theme) => ({
    display: 'flex',
    gap: theme.spacing(2),
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),
  }),
};



