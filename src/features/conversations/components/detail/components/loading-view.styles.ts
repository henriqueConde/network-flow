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
  }),
  loadingContainer: () => (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  }),
};






