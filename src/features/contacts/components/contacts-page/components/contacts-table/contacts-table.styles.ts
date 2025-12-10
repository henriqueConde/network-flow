import { Theme } from '@mui/material/styles';

export const styles = {
  tableCard: () => (theme: Theme) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: 1,
    border: '1px solid rgba(148, 163, 184, 0.12)',
    overflow: 'hidden',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    marginBottom: theme.spacing(8),
  }),
  tableWrapper: () => (theme: Theme) => ({
    flex: 1,
    overflowY: 'auto',
    overflowX: 'auto',
    minHeight: 0,
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


