import { Theme } from '@mui/material/styles';

export const styles = {
  emptyState: () => (theme: Theme) => ({
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }),
};




