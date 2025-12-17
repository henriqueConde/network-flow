import { Theme } from '@mui/material/styles';

export const styles = {
  header: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(3),
  }),
  titleBlock: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(0.5),
  }),
  title: () => (theme: Theme) => ({
    color: theme.palette.text.primary,
    fontWeight: 600,
    letterSpacing: '-0.02em',
  }),
  subtitle: () => (theme: Theme) => ({
    color: theme.palette.text.secondary,
    fontSize: '0.9375rem',
  }),
};



