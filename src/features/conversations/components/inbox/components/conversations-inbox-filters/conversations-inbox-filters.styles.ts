import { Theme } from '@mui/material/styles';

export const styles = {
  filtersRow: () => (theme: Theme) => ({
    display: 'flex',
    gap: theme.spacing(2),
    marginBottom: theme.spacing(2),
    alignItems: 'center',
  }),
};


