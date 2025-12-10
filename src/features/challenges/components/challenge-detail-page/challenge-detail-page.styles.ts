import { Theme } from '@mui/material/styles';

export const styles = {
  container: () => (theme: Theme) => ({
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  }),
  headerSection: () => (theme: Theme) => ({
    padding: theme.spacing(3, 4),
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    flexShrink: 0,
    maxWidth: 1200,
    margin: '0 auto',
    width: '100%',
  }),
  backButton: () => (theme: Theme) => ({
    marginBottom: theme.spacing(2),
    textTransform: 'none',
  }),
  header: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  title: () => (theme: Theme) => ({
    fontWeight: 600,
    marginBottom: theme.spacing(0.5),
  }),
  scrollableContent: () => (theme: Theme) => ({
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: theme.spacing(4),
    paddingBottom: theme.spacing(10),
    maxWidth: 1200,
    margin: '0 auto',
    width: '100%',
    minHeight: 0,
  }),
  contentGrid: () => (theme: Theme) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: theme.spacing(3),
    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr',
    },
  }),
  mainColumn: () => () => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  }),
  card: () => (theme: Theme) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: 1,
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(3),
  }),
  cardTitle: () => (theme: Theme) => ({
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    fontSize: '1.125rem',
  }),
  fieldRow: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(2),
    '&:last-child': {
      marginBottom: 0,
    },
  }),
  fieldLabel: () => (theme: Theme) => ({
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
  }),
  fieldValue: () => (theme: Theme) => ({
    fontSize: '1rem',
    color: theme.palette.text.primary,
  }),
  emptyValue: () => (theme: Theme) => ({
    fontSize: '1rem',
    color: theme.palette.text.disabled,
    fontStyle: 'italic',
  }),
  actionsRow: () => (theme: Theme) => ({
    display: 'flex',
    gap: theme.spacing(2),
    marginTop: theme.spacing(3),
    justifyContent: 'flex-end',
  }),
  progressCard: () => (theme: Theme) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: 1,
    border: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
  }),
  progressHeader: () => (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  }),
  progressValue: () => (theme: Theme) => ({
    fontSize: '2rem',
    fontWeight: 700,
    color: theme.palette.primary.main,
  }),
  progressBar: () => (theme: Theme) => ({
    height: 24,
    borderRadius: 12,
    marginBottom: theme.spacing(2),
  }),
  metricsGrid: () => (theme: Theme) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
  }),
  metricCard: () => (theme: Theme) => ({
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 1,
    backgroundColor: theme.palette.background.default,
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
  statusBadge: () => (theme: Theme) => ({
    padding: theme.spacing(0.5, 1.5),
    borderRadius: 1,
    fontSize: '0.75rem',
    fontWeight: 500,
  }),
  statusOnTrack: () => (theme: Theme) => ({
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark,
  }),
  statusBehind: () => (theme: Theme) => ({
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.dark,
  }),
  statusAhead: () => (theme: Theme) => ({
    backgroundColor: theme.palette.info.light,
    color: theme.palette.info.dark,
  }),
};

