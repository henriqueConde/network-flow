import { Theme } from '@mui/material/styles';

export const styles = {
  container: () => (theme: Theme) => ({
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
    maxWidth: 1400,
    margin: '0 auto',
    borderRadius: 2,
    overflow: 'hidden',
  }),
  header: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3),
    flexShrink: 0,
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
    flexWrap: 'wrap',
    flexShrink: 0,
  }),
  tableCard: () => (theme: Theme) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: 1,
    border: '1px solid rgba(148, 163, 184, 0.12)',
    overflow: 'hidden',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0, // Important for flex children to allow scrolling
    marginBottom: theme.spacing(8),
  }),
  tableWrapper: () => (theme: Theme) => ({
    flex: 1,
    overflowY: 'auto',
    overflowX: 'auto',
    minHeight: 0,
    // Ensure scrollbar styling
    '&::-webkit-scrollbar': {
      width: 8,
      height: 8,
    },
    '&::-webkit-scrollbar-track': {
      background: 'rgba(30, 41, 59, 0.2)',
      borderRadius: 4,
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(59, 130, 246, 0.4)',
      borderRadius: 4,
      '&:hover': {
        background: 'rgba(59, 130, 246, 0.6)',
      },
    },
  }),
  table: () => (theme: Theme) => ({
    // Ensure table doesn't create its own scrollbar
    width: '100%',
    tableLayout: 'auto',
  }),
  paginationWrapper: () => (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    flexShrink: 0,
    borderTop: '1px solid rgba(148, 163, 184, 0.12)',
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
  chip: () => (theme: Theme) => ({
    fontSize: '0.75rem',
  }),
};



