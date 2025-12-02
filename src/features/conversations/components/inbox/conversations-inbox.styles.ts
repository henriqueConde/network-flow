import { Theme } from '@mui/material/styles';

export const styles = {
  container: () => (theme: Theme) => ({
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
    maxWidth: 1400,
    margin: '0 auto',
    borderRadius: 2,
  }),
  header: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3),
  }),
  titleBlock: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
  }),
  title: () => (theme: Theme) => ({
    color: theme.palette.text.primary,
    fontWeight: 600,
    letterSpacing: '-0.02em',
  }),
  subtitle: () => (theme: Theme) => ({
    color: theme.palette.text.secondary,
    fontSize: '0.9375rem',
  }),
  filtersRow: () => (theme: Theme) => ({
    display: 'flex',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
    alignItems: 'center',
  }),
  tableCard: () => (theme: Theme) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: 1,
    border: '1px solid rgba(148, 163, 184, 0.12)',
    overflow: 'hidden',
  }),
  tableRow: (clickable: boolean) => (theme: Theme) => ({
    cursor: clickable ? 'pointer' : 'default',
    '&:hover': clickable
      ? {
        backgroundColor: 'rgba(59, 130, 246, 0.04)',
      }
      : undefined,
  }),
  emptyState: () => (theme: Theme) => ({
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }),
  chipNeedsAttention: () => (theme: Theme) => ({
    backgroundColor: 'rgba(248, 113, 113, 0.1)',
    color: '#FCA5A5',
  }),
  chipWaiting: () => (theme: Theme) => ({
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    color: '#60A5FA',
  }),
  chipOutOfSync: () => () => ({
    marginLeft: 8,
  }),
  createDialogContent: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  }),
};


