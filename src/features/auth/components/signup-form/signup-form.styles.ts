import { Theme } from '@mui/material/styles';

export const styles = {
  container: () => (theme: Theme) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent',
    position: 'relative',
    padding: theme.spacing(3),
  }),
  root: () => (theme: Theme) => ({
    maxWidth: 480,
    width: '100%',
    padding: theme.spacing(4),
    background: `linear-gradient(135deg, rgba(13, 12, 34, 0.8), rgba(49, 35, 89, 0.85))`,
    backdropFilter: 'blur(20px)',
    borderRadius: 12,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 8px 32px 0 rgba(138, 43, 226, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 2,
  }),
  header: () => () => ({
    textAlign: 'center',
    marginBottom: '8px',
  }),
  title: () => (theme: Theme) => ({
    background: 'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(200, 220, 255, 0.9))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 2px 8px rgba(138, 43, 226, 0.3)',
  }),
  subtitle: () => (theme: Theme) => ({
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: theme.spacing(3),
    fontSize: '0.95rem',
    letterSpacing: '0.025em',
  }),
  form: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2.5),
    marginTop: theme.spacing(3),
  }),
  textField: () => (theme: Theme) => ({
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
      },
    },
  }),
  button: () => () => ({
    height: '48px',
    marginTop: '8px',
  }),
  googleButton: () => () => ({
    height: '48px',
    marginTop: '16px',
  }),
  divider: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2, 0),
    '&::before, &::after': {
      content: '""',
      flex: 1,
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
  }),
  dividerText: () => () => ({
    padding: '0 16px',
    color: 'rgba(255, 255, 255, 0.6)',
  }),
  linkContainer: () => (theme: Theme) => ({
    textAlign: 'center',
    marginTop: theme.spacing(2),
  }),
  link: () => () => ({
    color: '#8A2BE2',
    textDecoration: 'none',
    '&:hover': {
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

