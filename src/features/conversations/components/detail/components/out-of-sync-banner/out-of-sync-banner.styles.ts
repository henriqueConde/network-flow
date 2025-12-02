import { Theme } from '@mui/material';

export const styles = {
  banner: () => (theme: Theme) => ({
    marginBottom: theme.spacing(3),
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.contrastText,
    flexShrink: 0,
  }),
  snippetBox: () => (theme: Theme) => ({
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: theme.spacing(1),
  }),
};

