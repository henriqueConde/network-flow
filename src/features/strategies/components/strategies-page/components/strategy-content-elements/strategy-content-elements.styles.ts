import { Theme } from '@mui/material';

export const styles = {
  strategyItemText: () => (theme: Theme) => ({
    mb: 0.5,
    color: theme.palette.text.primary,
  }),
  highlightBox: () => (theme: Theme) => ({
    mb: 1.5,
  }),
  highlightAlert: () => (theme: Theme) => ({
    '& .MuiAlert-message': { width: '100%' },
  }),
  highlightButtonContainer: () => (theme: Theme) => ({
    mt: 1,
  }),
  highlightText: () => (theme: Theme) => ({
    fontWeight: 600,
  }),
  statBox: () => (theme: Theme) => ({
    mb: 1.5,
    p: 2,
    bgcolor: theme.palette.primary.light,
    borderRadius: 1,
    color: theme.palette.primary.contrastText,
  }),
  statText: () => (theme: Theme) => ({
    fontWeight: 600,
    fontSize: '1.1rem',
  }),
  linkText: () => (theme: Theme) => ({
    ml: 1,
    fontWeight: 600,
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline' },
  }),
  sectionTitleContainer: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mb: 2,
  }),
  sectionTitleText: () => (theme: Theme) => ({
    fontWeight: 600,
    color: theme.palette.text.primary,
  }),
  subsectionTitleContainer: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 1.5,
  }),
  subsectionTitleInner: () => (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  }),
  subsectionTitleText: () => (theme: Theme) => ({
    fontWeight: 600,
    color: theme.palette.text.primary,
  }),
  subsectionTitleButton: () => (theme: Theme) => ({
    ml: 2,
  }),
  infoBox: () => (theme: Theme) => ({
    mb: 2,
  }),
  infoBoxLinkContainer: () => (theme: Theme) => ({
    mt: 1,
  }),
  quoteBox: () => (theme: Theme) => ({
    borderLeft: '4px solid',
    borderColor: theme.palette.primary.main,
    pl: 2,
    py: 1,
    mb: 2,
    bgcolor: theme.palette.background.paper,
    borderRadius: 1,
    fontStyle: 'italic',
  }),
  quoteText: (hasAuthor: boolean) => (theme: Theme) => ({
    mb: hasAuthor ? 0.5 : 0,
  }),
  quoteAuthor: () => (theme: Theme) => ({
    // No additional styles needed, using MUI default
  }),
  goalBox: () => (theme: Theme) => ({
    p: 2,
    mb: 2,
    bgcolor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: 1,
  }),
  goalText: () => (theme: Theme) => ({
    fontWeight: 600,
  }),
};

