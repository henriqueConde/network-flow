import { Theme } from '@mui/material/styles';

export const styles = {
  createDialogContent: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  }),
  listbox: {
    maxHeight: '300px',
  },
};

