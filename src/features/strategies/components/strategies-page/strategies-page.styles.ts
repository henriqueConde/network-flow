import { Theme } from '@mui/material';

export const styles = {
  root: () => (theme: Theme) => ({
    display: 'flex',
    height: 'calc(100vh - 64px)', // Subtract header height
    bgcolor: theme.palette.background.default,
    overflow: 'hidden',
  }),
  sidebar: () => (theme: Theme) => ({
    width: 280,
    flexShrink: 0,
    borderRight: `1px solid ${theme.palette.divider}`,
    bgcolor: theme.palette.background.paper,
    overflowY: 'auto',
    p: 2,
  }),
  sidebarTitle: () => (theme: Theme) => ({
    mb: 2,
    fontWeight: 600,
    color: theme.palette.text.primary,
  }),
  strategyItem: (isSelected: boolean) => (theme: Theme) => ({
    p: 1.5,
    mb: 1,
    borderRadius: 1,
    cursor: 'pointer',
    bgcolor: isSelected ? theme.palette.action.selected : 'transparent',
    '&:hover': {
      bgcolor: theme.palette.action.hover,
    },
    transition: 'background-color 0.2s',
  }),
  strategyTitle: (isSelected: boolean) => (theme: Theme) => ({
    fontWeight: isSelected ? 600 : 500,
    color: isSelected ? theme.palette.primary.main : theme.palette.text.primary,
    mb: 0.5,
  }),
  strategyDescription: () => (theme: Theme) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
  }),
  content: () => (theme: Theme) => ({
    flex: 1,
    overflowY: 'auto',
    bgcolor: theme.palette.background.default,
  }),
  contentContainer: () => (theme: Theme) => ({
    maxWidth: 900,
    mx: 'auto',
    p: 4,
  }),
  strategyHeader: () => (theme: Theme) => ({
    mb: 4,
  }),
  mainStrategyTitle: () => (theme: Theme) => ({
    mb: 1,
    color: theme.palette.text.primary,
  }),
  strategySubtitle: () => (theme: Theme) => ({
    color: theme.palette.text.secondary,
  }),
  section: () => (theme: Theme) => ({
    mb: 4,
  }),
  sectionTitle: () => (theme: Theme) => ({
    mb: 2,
    fontWeight: 600,
    color: theme.palette.text.primary,
  }),
  sectionContent: () => (theme: Theme) => ({
    color: theme.palette.text.primary,
    lineHeight: 1.7,
    '& p': {
      mb: 1.5,
    },
    '& ul, & ol': {
      mb: 2,
      pl: 3,
    },
    '& li': {
      mb: 0.5,
    },
  }),
  subsection: () => (theme: Theme) => ({
    mb: 3,
  }),
  subsectionTitle: () => (theme: Theme) => ({
    mb: 1.5,
    fontWeight: 600,
    color: theme.palette.text.primary,
  }),
  templateBox: () => (theme: Theme) => ({
    p: 2,
    mb: 2,
    borderRadius: 1,
    bgcolor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    fontFamily: 'monospace',
    fontSize: '0.875rem',
    whiteSpace: 'pre-wrap',
    color: theme.palette.text.primary,
  }),
  listItem: () => (theme: Theme) => ({
    mb: 0.5,
    color: theme.palette.text.primary,
  }),
  nestedList: () => (theme: Theme) => ({
    pl: 3,
    mt: 0.5,
  }),
  emptyState: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: theme.palette.text.secondary,
  }),
} as const;

