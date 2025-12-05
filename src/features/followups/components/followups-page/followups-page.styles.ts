import { Theme } from '@mui/material';

export const styles = {
    root: () => (theme: Theme) => ({
        p: 3,
        pb: 3,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.background.default,
        overflow: 'hidden', // header fixed, content scrolls
    }),
    header: () => (theme: Theme) => ({
        mb: 4,
        flexShrink: 0,
    }),
    title: () => (theme: Theme) => ({
        mb: 1,
        color: theme.palette.text.primary,
    }),
    subtitle: () => (theme: Theme) => ({
        color: theme.palette.text.secondary,
    }),
    calendar: () => (theme: Theme) => ({
        bgcolor: theme.palette.background.paper,
        borderRadius: 2,
        p: 2,
        boxShadow: theme.shadows[1],
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        minHeight: 0,
    }),
    calendarHeader: () => (theme: Theme) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2,
        flexShrink: 0,
    }),
    monthYear: () => (theme: Theme) => ({
        fontWeight: 600,
        color: theme.palette.text.primary,
    }),
    dayHeadersContainer: () => (theme: Theme) => ({
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 1,
        mb: 1,
        flexShrink: 0,
    }),
    calendarGrid: () => (theme: Theme) => ({
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 1,
        overflowY: 'auto',
        flex: 1,
        minHeight: 0,
        alignItems: 'start',
        alignContent: 'start',
        '&::after': {
            content: '""',
            display: 'block',
            height: theme.spacing(3),
            gridColumn: '1 / -1',
        },
    }),
    dayHeader: () => (theme: Theme) => ({
        textAlign: 'center',
        fontWeight: 600,
        color: theme.palette.text.secondary,
        fontSize: '0.875rem',
        py: 1,
    }),
    dayCell: () => (theme: Theme) => ({
        minHeight: 100,
        p: 1,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        bgcolor: theme.palette.background.paper,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
    }),
    dayCellOtherMonth: () => (theme: Theme) => ({
        ...styles.dayCell()(theme),
        bgcolor: theme.palette.action.hover,
        opacity: 0.5,
    }),
    dayNumber: () => (theme: Theme) => ({
        fontWeight: 600,
        color: theme.palette.text.primary,
        mb: 0.5,
    }),
    followupItem: () => (theme: Theme) => ({
        // font size now controlled by the Typography styles below
        p: 0.5,
        mb: 0.5,
        borderRadius: 0.5,
        bgcolor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        cursor: 'pointer',
        '&:hover': {
            bgcolor: theme.palette.primary.main,
        },
    }),
    followupContactName: () => (theme: Theme) => ({
        display: 'block',
        fontWeight: 600,
        fontSize: '0.85rem', // bigger name
        lineHeight: 1.3,
    }),
    followupNumberText: () => (theme: Theme) => ({
        fontSize: '0.8rem', // also bigger than before
        opacity: 0.9,
        lineHeight: 1.3,
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
};
