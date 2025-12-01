import { Theme } from '@mui/material/styles';

export const styles = {
  container: () => (theme: Theme) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.default,
    position: 'relative',
    padding: theme.spacing(3),
  }),
  root: () => (theme: Theme) => ({
    maxWidth: 440,
    width: '100%',
    padding: theme.spacing(5),
    backgroundColor: theme.palette.background.paper,
    backdropFilter: 'blur(12px)',
    borderRadius: 4,
    border: '1px solid rgba(148, 163, 184, 0.12)',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 2,
  }),
  header: () => () => ({
    textAlign: 'center',
    marginBottom: '8px',
  }),
  title: () => (theme: Theme) => ({
    color: theme.palette.text.primary,
    fontWeight: 600,
    letterSpacing: '-0.02em',
  }),
  subtitle: () => (theme: Theme) => ({
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(3),
    fontSize: '0.9375rem',
    letterSpacing: '0.01em',
    lineHeight: 1.5,
  }),
  form: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2.5),
    marginTop: theme.spacing(3),
  }),
  textField: () => (theme: Theme) => ({
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(30, 41, 59, 0.6)',
      '&:hover': {
        backgroundColor: 'rgba(30, 41, 59, 0.8)',
      },
    },
  }),
  button: () => () => ({
    height: '44px',
    marginTop: '8px',
    fontWeight: 500,
  }),
  googleButton: () => () => ({
    height: '44px',
    marginTop: '16px',
    fontWeight: 500,
  }),
  divider: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2.5, 0),
    '&::before, &::after': {
      content: '""',
      flex: 1,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  }),
  dividerText: () => (theme: Theme) => ({
    padding: '0 16px',
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
  }),
  linkContainer: () => (theme: Theme) => ({
    textAlign: 'center',
    marginTop: theme.spacing(2.5),
  }),
  link: () => (theme: Theme) => ({
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontWeight: 500,
    transition: 'color 0.2s ease',
    '&:hover': {
      color: theme.palette.primary.light,
      textDecoration: 'underline',
    },
  }),
  error: () => () => ({
    marginTop: '8px',
  }),
  success: () => () => ({
    marginTop: '8px',
  }),
};

