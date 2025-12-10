import { Theme } from '@mui/material';

export const styles = {
  container: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
  }),

  header: () => (theme: Theme) => ({
    padding: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  }),

  title: () => (theme: Theme) => ({
    fontWeight: 600,
    marginBottom: theme.spacing(0.5),
    color: theme.palette.text.primary,
  }),

  subtitle: () => (theme: Theme) => ({
    color: theme.palette.text.secondary,
  }),

  scrollableContent: () => (theme: Theme) => ({
    flex: 1,
    overflowY: 'auto',
    padding: theme.spacing(3),
  }),

  loadingContainer: () => (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  }),

  errorContainer: () => (theme: Theme) => ({
    marginTop: theme.spacing(2),
  }),

  dateRangeContainer: () => (theme: Theme) => ({
    marginBottom: theme.spacing(3),
    display: 'flex',
    gap: theme.spacing(2),
    flexWrap: 'wrap',
    alignItems: 'center',
  }),

  metricsGrid: () => (theme: Theme) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(4),
  }),

  metricCard: () => (theme: Theme) => ({
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
  }),

  metricLabel: () => (theme: Theme) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.5),
  }),

  metricValue: () => (theme: Theme) => ({
    fontSize: '1.5rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
  }),

  chartCard: () => (theme: Theme) => ({
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    marginBottom: theme.spacing(3),
  }),

  chartTitle: () => (theme: Theme) => ({
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: theme.spacing(0.5),
    color: theme.palette.text.primary,
  }),

  chartSubtitle: () => (theme: Theme) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
  }),

  chartContainer: () => (theme: Theme) => ({
    width: '100%',
    height: 300,
    marginTop: theme.spacing(2),
  }),
};


