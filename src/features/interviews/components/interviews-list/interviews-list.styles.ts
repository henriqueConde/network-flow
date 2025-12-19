import { Theme } from '@mui/material/styles';

export const styles = {
  container: () => (theme: Theme) => ({
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4),
    maxWidth: 1400,
    margin: '0 auto',
    borderRadius: 2,
  }),
  tableCard: () => (theme: Theme) => ({
    backgroundColor: theme.palette.background.paper,
    borderRadius: 1,
    border: '1px solid rgba(148, 163, 184, 0.12)',
    overflow: 'hidden',
  }),
};




