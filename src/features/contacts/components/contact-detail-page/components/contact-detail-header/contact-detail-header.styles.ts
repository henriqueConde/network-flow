import { Theme } from '@mui/material/styles';

export const styles = {
  headerSection: () => (theme: Theme) => ({
    padding: theme.spacing(3, 4),
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    flexShrink: 0,
  }),
  backButton: () => (theme: Theme) => ({
    marginBottom: theme.spacing(2),
    textTransform: 'none',
  }),
  header: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  title: () => (theme: Theme) => ({
    fontWeight: 600,
    marginBottom: theme.spacing(0.5),
  }),
};


