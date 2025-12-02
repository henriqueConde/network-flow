import { Theme } from '@mui/material/styles';

export const styles = {
  tableRow: (clickable: boolean) => (theme: Theme) => ({
    cursor: clickable ? 'pointer' : 'default',
    '&:hover': clickable
      ? {
          backgroundColor: 'rgba(59, 130, 246, 0.04)',
        }
      : undefined,
  }),
  chipNeedsAttention: () => (theme: Theme) => ({
    backgroundColor: 'rgba(248, 113, 113, 0.1)',
    color: '#FCA5A5',
  }),
  chipWaiting: () => (theme: Theme) => ({
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
    color: '#60A5FA',
  }),
  chipOutOfSync: () => () => ({
    marginLeft: 8,
  }),
};

