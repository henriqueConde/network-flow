import { Theme } from '@mui/material/styles';

export const styles = {
    container: () => (theme: Theme) => ({
        height: '100vh',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    }),
    headerSection: () => (theme: Theme) => ({
        padding: theme.spacing(3, 4),
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        flexShrink: 0,
    }),
    backButton: () => (theme: Theme) => ({
        marginBottom: theme.spacing(2),
        textTransform: 'none',
    }),
    header: () => (theme: Theme) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }),
    title: () => (theme: Theme) => ({
        fontWeight: 600,
        marginBottom: theme.spacing(0.5),
    }),
    scrollableContent: () => (theme: Theme) => ({
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: theme.spacing(4),
        paddingBottom: theme.spacing(10), // Extra padding at bottom
        maxWidth: 1200,
        margin: '0 auto',
        width: '100%',
        minHeight: 0, // Important for flexbox scrolling
    }),
    contentGrid: () => (theme: Theme) => ({
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: theme.spacing(3),
        [theme.breakpoints.down('lg')]: {
            gridTemplateColumns: '1fr',
        },
    }),
    mainColumn: () => () => ({
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
    }),
    card: () => (theme: Theme) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: 1,
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(3),
    }),
    cardTitle: () => (theme: Theme) => ({
        fontWeight: 600,
        marginBottom: theme.spacing(2),
        fontSize: '1.125rem',
    }),
    fieldRow: () => (theme: Theme) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
        marginBottom: theme.spacing(2),
        '&:last-child': {
            marginBottom: 0,
        },
    }),
    fieldLabel: () => (theme: Theme) => ({
        fontSize: '0.875rem',
        fontWeight: 500,
        color: theme.palette.text.secondary,
    }),
    fieldValue: () => (theme: Theme) => ({
        fontSize: '1rem',
        color: theme.palette.text.primary,
    }),
    emptyValue: () => (theme: Theme) => ({
        fontSize: '1rem',
        color: theme.palette.text.disabled,
        fontStyle: 'italic',
    }),
    actionsRow: () => (theme: Theme) => ({
        display: 'flex',
        gap: theme.spacing(2),
        marginTop: theme.spacing(3),
        justifyContent: 'flex-end',
    }),
    conversationsList: () => (theme: Theme) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1),
    }),
    conversationItem: () => (theme: Theme) => ({
        padding: theme.spacing(2),
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        transition: 'background-color 0.2s',
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    }),
};

