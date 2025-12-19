import { Theme } from '@mui/material';

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
    flexWrap: 'wrap',
    gap: theme.spacing(1.5),
    marginBottom: theme.spacing(3),
  }),
  headerTexts: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
  }),
  filtersRow: () => (theme: Theme) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: theme.spacing(2),
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  }),
  filterLabel: () => (theme: Theme) => ({
    fontWeight: 600,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.5),
    display: 'block',
  }),
  tableCard: () => (theme: Theme) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: 1,
    border: '1px solid rgba(148, 163, 184, 0.12)',
    overflow: 'hidden',
  }),
  loadingState: () => (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(4),
  }),
  errorState: () => (theme: Theme) => ({
    mb: 2,
  }),
  paginationContainer: () => (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    mt: 2,
  }),
  actionsCell: () => (theme: Theme) => ({
    whiteSpace: 'nowrap',
    minWidth: 120,
    textAlign: 'right',
  }),
  formRow: () => (theme: Theme) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: theme.spacing(2),
  }),
  dialogActions: () => (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(1),
    padding: theme.spacing(2, 3, 3),
  }),
  emptyState: () => (theme: Theme) => ({
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }),
  chip: () => (theme: Theme) => ({
    textTransform: 'capitalize',
  }),
  statusStack: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
  }),
  tableRow: () => () => ({
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.02)',
    },
  }),
  actionsRow: () => (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(1),
  }),
  hiddenChip: () => () => ({
    visibility: 'hidden', // Hide content but reserve space
    pointerEvents: 'none', // Disable interactions when hidden
  }),
  toggleButton: () => () => ({
    whiteSpace: 'nowrap', // Prevent text wrapping in toggle buttons
  }),
};

