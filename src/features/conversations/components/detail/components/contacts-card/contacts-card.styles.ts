import { Theme } from '@mui/material';

export const styles = {
  card: () => (theme: Theme) => ({
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
    mb: 2,
  }),
  header: () => (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  }),
  title: () => (theme: Theme) => ({
    fontWeight: 600,
  }),
  contactsList: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    mt: 2,
  }),
  contactItem: () => (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    p: 1.5,
    borderRadius: 1,
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
  }),
  contactInfo: () => (theme: Theme) => ({
    flex: 1,
  }),
  contactNameRow: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mb: 0.5,
  }),
  primaryChip: () => (theme: Theme) => ({
    height: 20,
    fontSize: '0.7rem',
  }),
  contactActions: () => (theme: Theme) => ({
    display: 'flex',
    gap: 0.5,
  }),
  actionButton: () => (theme: Theme) => ({
    padding: 0.5,
  }),
};


