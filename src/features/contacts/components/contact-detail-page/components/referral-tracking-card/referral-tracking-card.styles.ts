import { SxProps, Theme } from '@mui/material';

export const styles = {
  card: (): SxProps<Theme> => ({
    backgroundColor: 'background.paper',
    borderRadius: 2,
    padding: 2,
    boxShadow: 1,
  }),
  cardTitle: (): SxProps<Theme> => ({
    marginBottom: 2,
    fontWeight: 600,
  }),
  fieldRow: (): SxProps<Theme> => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    marginBottom: 2,
    '&:last-child': {
      marginBottom: 0,
    },
  }),
  fieldLabel: (): SxProps<Theme> => ({
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'text.secondary',
  }),
  fieldValue: (): SxProps<Theme> => ({
    fontSize: '0.875rem',
    color: 'text.primary',
  }),
  emptyValue: (): SxProps<Theme> => ({
    fontSize: '0.875rem',
    fontStyle: 'italic',
    color: 'text.disabled',
  }),
};

