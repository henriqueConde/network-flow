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
  suggestedReplyBox: () => (theme: Theme) => ({
    p: theme.spacing(2),
    bgcolor: 'grey.50',
    borderRadius: theme.spacing(1),
    border: '1px solid',
    borderColor: 'grey.300',
    maxHeight: '300px',
    overflow: 'auto',
  }),
};




