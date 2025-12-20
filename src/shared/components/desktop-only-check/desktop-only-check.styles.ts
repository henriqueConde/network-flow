import { Theme } from '@mui/material/styles';

export const styles = {
  overlay: () => (theme: Theme) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  }),
  container: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing(3),
    padding: theme.spacing(4),
    maxWidth: 600,
    textAlign: 'center',
  }),
  title: () => (theme: Theme) => ({
    fontSize: '2rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
  }),
  message: () => (theme: Theme) => ({
    fontSize: '1rem',
    color: theme.palette.text.secondary,
    lineHeight: 1.6,
  }),
};

