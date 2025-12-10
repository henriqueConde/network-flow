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
    padding: theme.spacing(3),
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    flexShrink: 0,
    maxWidth: 1200,
    margin: '0 auto',
    width: '100%',
  }),
  scrollableContent: () => (theme: Theme) => ({
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(10), // Extra padding at bottom
    maxWidth: 1200,
    margin: '0 auto',
    width: '100%',
    minHeight: 0, // Important for flexbox scrolling
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
  headerActions: () => () => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: 2,
  }),
  title: () => () => ({
    marginBottom: 2,
  }),
};

