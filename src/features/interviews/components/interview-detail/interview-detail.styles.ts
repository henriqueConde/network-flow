import { Theme } from '@mui/material/styles';

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
  header: () => (theme: Theme) => ({
    flexShrink: 0,
    paddingBottom: theme.spacing(2),
  }),
  scrollableContent: () => (theme: Theme) => ({
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(3),
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
    borderRadius: 2,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    border: '1px solid rgba(148, 163, 184, 0.12)',
  }),
  sectionTitle: () => (theme: Theme) => ({
    fontSize: '1.125rem',
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    color: theme.palette.text.primary,
  }),
  contactInfo: () => (theme: Theme) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: theme.spacing(2),
  }),
  contactField: () => () => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5,
  }),
  contactLabel: () => (theme: Theme) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    fontWeight: 500,
  }),
  contactValue: () => (theme: Theme) => ({
    fontSize: '1rem',
    color: theme.palette.text.primary,
  }),
  notesTextarea: () => () => ({
    width: '100%',
    minHeight: 120,
  }),
  relatedList: () => () => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  }),
  relatedItem: () => (theme: Theme) => ({
    padding: theme.spacing(1.5),
    borderRadius: 1,
    border: '1px solid rgba(148, 163, 184, 0.12)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }),
  emptyState: () => (theme: Theme) => ({
    textAlign: 'center',
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
  }),
};

