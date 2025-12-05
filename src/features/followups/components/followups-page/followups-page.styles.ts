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
  calendar: () => (theme: Theme) => ({
    bgcolor: theme.palette.background.paper,
    borderRadius: 2,
    p: 2,
    boxShadow: theme.shadows[1],
  }),
  calendarHeader: () => (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
  }),
  monthYear: () => (theme: Theme) => ({
    fontWeight: 600,
    color: theme.palette.text.primary,
  }),
  calendarGrid: () => (theme: Theme) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: 1,
  }),
  dayHeader: () => (theme: Theme) => ({
    textAlign: 'center',
    fontWeight: 600,
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
    py: 1,
  }),
  dayCell: () => (theme: Theme) => ({
    minHeight: 100,
    p: 1,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 1,
    bgcolor: theme.palette.background.paper,
    position: 'relative',
  }),
  dayCellOtherMonth: () => (theme: Theme) => ({
    ...styles.dayCell()(theme),
    bgcolor: theme.palette.action.hover,
    opacity: 0.5,
  }),
  dayNumber: () => (theme: Theme) => ({
    fontWeight: 600,
    color: theme.palette.text.primary,
    mb: 0.5,
  }),
  followupItem: () => (theme: Theme) => ({
    fontSize: '0.75rem',
    p: 0.5,
    mb: 0.5,
    borderRadius: 0.5,
    bgcolor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    cursor: 'pointer',
    '&:hover': {
      bgcolor: theme.palette.primary.main,
    },
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
};

