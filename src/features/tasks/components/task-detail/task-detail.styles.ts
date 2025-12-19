import { Theme } from '@mui/material';

export const styles = {
  container: () => (theme: Theme) => ({
    maxWidth: 1200,
    margin: '0 auto',
    padding: theme.spacing(3),
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.default,
  }),
  headerSection: () => (theme: Theme) => ({
    flexShrink: 0,
    paddingBottom: theme.spacing(2),
  }),
  headerActions: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2),
  }),
  title: () => (theme: Theme) => ({
    marginBottom: theme.spacing(1),
  }),
  scrollableContent: () => (theme: Theme) => ({
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(10), // Extra padding at bottom for action buttons
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[600],
      borderRadius: '4px',
      '&:hover': {
        backgroundColor: theme.palette.grey[500],
      },
    },
  }),
  section: () => (theme: Theme) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    boxShadow: theme.shadows[1],
  }),
  sectionTitle: () => (theme: Theme) => ({
    fontSize: '1.125rem',
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
  }),
  metadataGrid: () => (theme: Theme) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: theme.spacing(2),
  }),
  fieldGrid: () => (theme: Theme) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }),
  label: () => (theme: Theme) => ({
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.5),
    display: 'block',
  }),
  value: () => (theme: Theme) => ({
    fontSize: '1rem',
    color: theme.palette.text.primary,
  }),
  descriptionBox: () => (theme: Theme) => ({
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
    whiteSpace: 'pre-wrap',
    minHeight: 60,
  }),
  actionsRow: () => (theme: Theme) => ({
    display: 'flex',
    gap: theme.spacing(2),
    flexWrap: 'wrap',
    marginTop: theme.spacing(2),
  }),
  chip: () => (theme: Theme) => ({
    textTransform: 'capitalize',
  }),
  loadingContainer: () => (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  }),
  errorContainer: () => (theme: Theme) => ({
    padding: theme.spacing(3),
  }),
};


