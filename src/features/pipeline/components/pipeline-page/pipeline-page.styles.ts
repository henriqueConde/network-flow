import { Theme } from '@mui/material';

export const styles = {
  root: () => (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    bgcolor: theme.palette.background.default,
    overflow: 'hidden',
  }),
  header: () => (theme: Theme) => ({
    p: 3,
    pb: 2,
    flexShrink: 0,
    borderBottom: `1px solid ${theme.palette.divider}`,
    bgcolor: theme.palette.background.paper,
  }),
  title: () => (theme: Theme) => ({
    mb: 1,
    color: theme.palette.text.primary,
  }),
  subtitle: () => (theme: Theme) => ({
    color: theme.palette.text.secondary,
  }),
  boardContainer: () => (theme: Theme) => ({
    flex: 1,
    position: 'relative',
    display: 'flex',
    alignItems: 'stretch',
    overflow: 'hidden',
    minHeight: 0, // Important for flex children to respect overflow
  }),
  board: () => (theme: Theme) => ({
    flex: 1,
    display: 'flex',
    gap: 2,
    overflowX: 'auto',
    overflowY: 'hidden',
    p: 3,
    pt: 2,
    scrollBehavior: 'smooth',
    minHeight: 0, // Important for flex children to respect overflow
    // Hide horizontal scrollbar
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  }),
  scrollButton: (direction: 'left' | 'right') => (theme: Theme) => ({
    position: 'absolute',
    [direction]: theme.spacing(1),
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 10,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      boxShadow: theme.shadows[6],
    },
    width: 40,
    height: 40,
  }),
  column: () => (theme: Theme) => ({
    minWidth: 300,
    width: 300,
    flexShrink: 0,
    bgcolor: theme.palette.background.paper,
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    maxHeight: '100%',
    minHeight: 0, // Important for flex children to respect overflow
    overflow: 'hidden', // Prevent column itself from scrolling
    transition: 'all 0.2s ease-in-out',
  }),
  columnContent: () => (theme: Theme) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    p: 2,
    pb: 8, // Extra bottom padding to ensure last item is fully visible
    overflowY: 'auto',
    overflowX: 'hidden',
    minHeight: 0, // Important for flex children to respect overflow
    // Visible scrollbar for columns
    '&::-webkit-scrollbar': {
      width: 10,
    },
    '&::-webkit-scrollbar-track': {
      background: theme.palette.mode === 'dark'
        ? theme.palette.grey[800]
        : theme.palette.grey[100],
      borderRadius: 5,
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.mode === 'dark'
        ? theme.palette.grey[600]
        : theme.palette.grey[400],
      borderRadius: 5,
      '&:hover': {
        background: theme.palette.mode === 'dark'
          ? theme.palette.grey[500]
          : theme.palette.grey[500],
      },
    },
    scrollbarWidth: 'thin',
    scrollbarColor: `${theme.palette.mode === 'dark'
      ? theme.palette.grey[600]
      : theme.palette.grey[400]} ${theme.palette.mode === 'dark'
        ? theme.palette.grey[800]
        : theme.palette.grey[100]}`,
  }),
  columnDragOver: () => (theme: Theme) => ({
    ...styles.column()(theme),
    border: `2px dashed ${theme.palette.primary.main}`,
    bgcolor: theme.palette.action.hover,
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[4],
  }),
  columnHeader: () => (theme: Theme) => ({
    flexShrink: 0,
    p: 2,
    pb: 1,
    borderBottom: `2px solid ${theme.palette.divider}`,
    bgcolor: theme.palette.background.paper,
  }),
  columnTitle: () => (theme: Theme) => ({
    fontWeight: 600,
    color: theme.palette.text.primary,
  }),
  columnCount: () => (theme: Theme) => ({
    ml: 1,
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
  }),
  opportunityCard: () => (theme: Theme) => ({
    p: 2,
    bgcolor: theme.palette.background.paper,
    borderRadius: 1,
    border: `1px solid ${theme.palette.divider}`,
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    width: '100%',
    minHeight: 'auto',
    height: 'auto',
    maxHeight: 'none',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'visible',
    '& .MuiCardContent-root': {
      padding: 0,
      '&:last-child': {
        paddingBottom: 0,
      },
    },
    '&:hover': {
      boxShadow: theme.shadows[3],
      transform: 'translateY(-2px)',
    },
  }),
  opportunityHeader: () => (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    mb: 1,
  }),
  opportunityName: () => (theme: Theme) => ({
    fontWeight: 600,
    color: theme.palette.text.primary,
    mb: 0.5,
  }),
  opportunityCompany: () => (theme: Theme) => ({
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
  }),
  opportunityContact: () => (theme: Theme) => ({
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
    mt: 0.25,
  }),
  opportunityMeta: () => (theme: Theme) => ({
    mt: 1,
    pt: 1,
    borderTop: `1px solid ${theme.palette.divider}`,
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5,
    flex: '1 1 auto',
    minHeight: 0,
  }),
  opportunityMetaItem: () => (theme: Theme) => ({
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
  }),
  opportunityConversations: () => (theme: Theme) => ({
    mt: 1,
    pt: 1,
    borderTop: `1px dashed ${theme.palette.divider}`,
    display: 'flex',
    flexDirection: 'column',
    gap: 0.5,
    flex: '1 1 auto',
    minHeight: 0,
  }),
  opportunityConversationsHeader: () => (theme: Theme) => ({
    fontSize: '0.75rem',
    fontWeight: 600,
    color: theme.palette.text.secondary,
    mb: 0.25,
  }),
  opportunityConversationItem: () => (theme: Theme) => ({
    borderRadius: 1,
    padding: '4px 8px',
    backgroundColor: theme.palette.action.hover,
    display: 'flex',
    flexDirection: 'column',
    gap: 0.25,
  }),
  opportunityConversationTitle: () => (theme: Theme) => ({
    fontSize: '0.8rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
  }),
  opportunityConversationMeta: () => (theme: Theme) => ({
    fontSize: '0.7rem',
    color: theme.palette.text.secondary,
  }),
  outOfSyncBadge: () => (theme: Theme) => ({
    bgcolor: theme.palette.warning.light,
    color: theme.palette.warning.contrastText,
    fontSize: '0.7rem',
    px: 0.75,
    py: 0.25,
    borderRadius: 1,
  }),
  emptyState: () => (theme: Theme) => ({
    textAlign: 'center',
    py: 4,
    color: theme.palette.text.secondary,
  }),
  loadingState: () => (theme: Theme) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
  }),
  errorState: () => (theme: Theme) => ({
    p: 3,
    textAlign: 'center',
  }),
  menuButton: () => (theme: Theme) => ({
    minWidth: 'auto',
    p: 0.5,
  }),
};

