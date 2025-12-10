import { Theme } from '@mui/material/styles';

export const styles = {
  appBar: () => (theme: Theme) => ({
    backgroundColor: theme.palette.background.paper,
    borderBottom: '1px solid rgba(148, 163, 184, 0.12)',
    boxShadow: 'none',
    zIndex: theme.zIndex.drawer + 1,
  }),
  toolbar: () => (theme: Theme) => ({
    minHeight: 64,
    padding: theme.spacing(0, 3),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  title: () => (theme: Theme) => ({
    color: theme.palette.text.primary,
    fontWeight: 600,
    fontSize: '1.25rem',
    letterSpacing: '-0.02em',
    textDecoration: 'none',
    '&:hover': {
      opacity: 0.8,
    },
  }),
  rightSection: () => () => ({
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  }),
  profileButton: () => (theme: Theme) => ({
    padding: theme.spacing(0.5),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  }),
  avatar: () => (theme: Theme) => ({
    width: 32,
    height: 32,
    fontSize: '0.875rem',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    cursor: 'pointer',
  }),
  menuPaper: () => (theme: Theme) => ({
    marginTop: theme.spacing(1),
    minWidth: 200,
    boxShadow: theme.shadows[3],
  }),
  menuItem: () => (theme: Theme) => ({
    padding: theme.spacing(1, 2),
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    '&.Mui-disabled': {
      opacity: 1,
    },
  }),
  menuEmail: () => (theme: Theme) => ({
    color: theme.palette.text.primary,
    fontWeight: 500,
  }),
  menuIcon: () => (theme: Theme) => ({
    fontSize: '1.125rem',
    color: theme.palette.text.secondary,
  }),
  navLinks: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    ml: 4,
  }),
  navLink: () => (theme: Theme) => ({
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: 500,
    padding: theme.spacing(0.75, 1.5),
    borderRadius: 1,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      color: theme.palette.text.primary,
      bgcolor: theme.palette.action.hover,
    },
  }),
  navLinkActive: () => (theme: Theme) => ({
    color: theme.palette.primary.main,
    bgcolor: theme.palette.action.selected,
  }),
};

