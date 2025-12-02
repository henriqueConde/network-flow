import { Theme } from '@mui/material';

export const styles = {
  sidebarColumn: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  }),
};

