import { Theme } from '@mui/material/styles';

export const styles = {
  container: () => (theme: Theme) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
  }),
  content: () => (theme: Theme) => ({
    textAlign: 'center',
    maxWidth: 600,
  }),
  title: () => (theme: Theme) => ({
    marginBottom: theme.spacing(2),
    background: 'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(200, 220, 255, 0.9))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }),
  subtitle: () => (theme: Theme) => ({
    marginBottom: theme.spacing(4),
    color: 'rgba(255, 255, 255, 0.7)',
  }),
  button: () => () => ({
    minWidth: 200,
  }),
};

