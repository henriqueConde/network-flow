import { Theme } from '@mui/material/styles';

export const styles = {
  container: () => (theme: Theme) => ({
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
    maxWidth: 1000,
    margin: '0 auto',
    borderRadius: 2,
  }),
  header: () => (theme: Theme) => ({
    flexShrink: 0,
    marginBottom: theme.spacing(4),
  }),
  scrollableContent: () => (theme: Theme) => ({
    flex: 1,
    overflowY: 'auto',
    paddingRight: theme.spacing(1),
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.divider,
      borderRadius: '4px',
      '&:hover': {
        background: theme.palette.action.hover,
      },
    },
  }),
  title: () => (theme: Theme) => ({
    color: theme.palette.text.primary,
    fontWeight: 600,
    letterSpacing: '-0.02em',
    marginBottom: theme.spacing(0.5),
  }),
  subtitle: () => (theme: Theme) => ({
    color: theme.palette.text.secondary,
    fontSize: '0.9375rem',
  }),
  section: () => (theme: Theme) => ({
    marginBottom: theme.spacing(4),
  }),
  sectionCard: () => (theme: Theme) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: 1,
    border: '1px solid rgba(148, 163, 184, 0.12)',
    padding: theme.spacing(3),
  }),
  sectionTitle: () => (theme: Theme) => ({
    color: theme.palette.text.primary,
    fontWeight: 600,
    marginBottom: theme.spacing(0.5),
  }),
  sectionDescription: () => (theme: Theme) => ({
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
    marginBottom: theme.spacing(3),
  }),
  subsection: () => (theme: Theme) => ({
    marginBottom: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    borderBottom: '1px solid rgba(148, 163, 184, 0.12)',
    '&:last-child': {
      borderBottom: 'none',
      marginBottom: 0,
      paddingBottom: 0,
    },
  }),
  subsectionTitle: () => (theme: Theme) => ({
    color: theme.palette.text.primary,
    fontWeight: 500,
    marginBottom: theme.spacing(0.5),
  }),
  subsectionDescription: () => (theme: Theme) => ({
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
    marginBottom: theme.spacing(2),
  }),
  instructionsList: () => (theme: Theme) => ({
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    '& li': {
      marginBottom: theme.spacing(0.5),
      color: theme.palette.text.secondary,
      fontSize: '0.875rem',
    },
  }),
  statusChip: () => (theme: Theme) => ({
    marginLeft: theme.spacing(1),
  }),
  formField: () => (theme: Theme) => ({
    marginBottom: theme.spacing(2),
  }),
};

