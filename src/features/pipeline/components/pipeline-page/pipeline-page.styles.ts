import { Theme } from '@mui/material';

export const styles = {
  root: () => (theme: Theme) => ({
    p: 3,
    minHeight: '100vh',
    bgcolor: theme.palette.background.default,
  }),
  header: () => (theme: Theme) => ({
    mb: 4,
  }),
  title: () => (theme: Theme) => ({
    mb: 1,
    color: theme.palette.text.primary,
  }),
  subtitle: () => (theme: Theme) => ({
    color: theme.palette.text.secondary,
  }),
  board: () => (theme: Theme) => ({
    display: 'flex',
    gap: 2,
    overflowX: 'auto',
    pb: 2,
    // Hide scrollbar but keep functionality
    '&::-webkit-scrollbar': {
      height: 8,
    },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.grey[100],
      borderRadius: 4,
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.grey[400],
      borderRadius: 4,
      '&:hover': {
        background: theme.palette.grey[600],
      },
    },
  }),
  column: () => (theme: Theme) => ({
    minWidth: 300,
    flexShrink: 0,
    bgcolor: theme.palette.background.paper,
    borderRadius: 2,
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    maxHeight: 'calc(100vh - 200px)',
    overflowY: 'auto',
    transition: 'all 0.2s ease-in-out',
  }),
  columnDragOver: () => (theme: Theme) => ({
    ...styles.column()(theme),
    border: `2px dashed ${theme.palette.primary.main}`,
    bgcolor: theme.palette.action.hover,
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[4],
  }),
  columnHeader: () => (theme: Theme) => ({
    mb: 1,
    pb: 1,
    borderBottom: `2px solid ${theme.palette.divider}`,
  }),
  columnTitle: () => (theme: Theme) => ({
    fontWeight: 600,
    color: theme.palette.text.primary,
  }),
  columnCount: () => (theme: Theme) => ({
    ml: 1,
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
  }),
  opportunityCard: () => (theme: Theme) => ({
    p: 2,
    bgcolor: theme.palette.background.paper,
    borderRadius: 1,
    border: `1px solid ${theme.palette.divider}`,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      boxShadow: theme.shadows[3],
      transform: 'translateY(-2px)',
    },
  }),
  opportunityHeader: () => (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    mb: 1,
  }),
  opportunityName: () => (theme: Theme) => ({
    fontWeight: 600,
    color: theme.palette.text.primary,
    mb: 0.5,
  }),
  opportunityCompany: () => (theme: Theme) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
  }),
  opportunityMeta: () => (theme: Theme) => ({
    mt: 1,
    pt: 1,
    borderTop: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5,
  }),
  opportunityMetaItem: () => (theme: Theme) => ({
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
  }),
  outOfSyncBadge: () => (theme: Theme) => ({
    bgcolor: theme.palette.warning.light,
    color: theme.palette.warning.contrastText,
    fontSize: '0.7rem',
    px: 0.75,
    py: 0.25,
    borderRadius: 1,
  }),
  emptyState: () => (theme: Theme) => ({
    textAlign: 'center',
    py: 4,
    color: theme.palette.text.secondary,
  }),
  loadingState: () => (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
  }),
  errorState: () => (theme: Theme) => ({
    p: 3,
    textAlign: 'center',
  }),
  menuButton: () => (theme: Theme) => ({
    minWidth: 'auto',
    p: 0.5,
  }),
};

