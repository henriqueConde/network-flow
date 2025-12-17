import { Theme } from '@mui/material';

export const styles = {
  card: () => (theme: Theme) => ({
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
  }),
  cardTitle: () => (theme: Theme) => ({
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  }),
  summaryText: () => (theme: Theme) => ({
    color: theme.palette.text.secondary,
    lineHeight: 1.6,
  }),
};





