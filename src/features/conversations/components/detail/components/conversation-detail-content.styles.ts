import { Theme } from '@mui/material';

export const styles = {
  scrollableContent: () => (theme: Theme) => ({
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(3),
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[600],
      borderRadius: '4px',
      '&:hover': {
        backgroundColor: theme.palette.grey[500],
      },
    },
  }),
  contentGrid: () => (theme: Theme) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 400px',
    gap: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },
  }),
  mainColumn: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  }),
};


