import { Theme } from '@mui/material/styles';

export const styles = {
  scrollableContent: () => (theme: Theme) => ({
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: theme.spacing(4),
    paddingBottom: theme.spacing(10),
    maxWidth: 1200,
    margin: '0 auto',
    width: '100%',
    minHeight: 0,
  }),
  contentGrid: () => (theme: Theme) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: theme.spacing(3),
    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr',
    },
  }),
  mainColumn: () => () => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  }),
};

