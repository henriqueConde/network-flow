import { Theme } from '@mui/material';

export const styles = {
  headerSection: () => (theme: Theme) => ({
    flexShrink: 0,
    paddingBottom: theme.spacing(2),
  }),
  header: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  backButton: () => (theme: Theme) => ({
    marginBottom: theme.spacing(2),
  }),
  title: () => (theme: Theme) => ({
    marginBottom: theme.spacing(1),
  }),
};



