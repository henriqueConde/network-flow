import { Theme } from '@mui/material';
import { hexToRgba } from '@/shared/utils/color.utils';

export const styles = {
    container: () => (theme: Theme) => ({
        maxWidth: 1200,
        margin: '0 auto',
        padding: theme.spacing(3),
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    }),
    headerSection: () => (theme: Theme) => ({
        flexShrink: 0,
        paddingBottom: theme.spacing(2),
    }),
    header: () => (theme: Theme) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    }),
    backButton: () => (theme: Theme) => ({
        marginBottom: theme.spacing(2),
    }),
    scrollableContent: () => (theme: Theme) => ({
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingRight: theme.spacing(1),
        paddingBottom: theme.spacing(3),
        '&::-webkit-scrollbar': {
            width: '8px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.grey[600],
            borderRadius: '4px',
            '&:hover': {
                backgroundColor: theme.palette.grey[500],
            },
        },
    }),
    title: () => (theme: Theme) => ({
        marginBottom: theme.spacing(1),
    }),
    outOfSyncBanner: () => (theme: Theme) => ({
        marginBottom: theme.spacing(3),
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.contrastText,
        flexShrink: 0,
    }),
    contentGrid: () => (theme: Theme) => ({
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: theme.spacing(3),
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '1fr',
        },
    }),
    mainColumn: () => (theme: Theme) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(3),
    }),
    sidebarColumn: () => (theme: Theme) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(3),
    }),
    card: () => (theme: Theme) => ({
        padding: theme.spacing(3),
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
    }),
    messagesCard: () => (theme: Theme) => ({
        padding: theme.spacing(3),
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper, // Dark blue background
        boxShadow: theme.shadows[1],
        marginBottom: theme.spacing(5),
    }),
    cardTitle: () => (theme: Theme) => ({
        marginBottom: theme.spacing(2),
        fontWeight: 600,
    }),
    contactInfo: () => (theme: Theme) => ({
        marginBottom: theme.spacing(2),
    }),
    metadataGrid: () => (theme: Theme) => ({
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }),
    summaryText: () => (theme: Theme) => ({
        color: theme.palette.text.secondary,
        lineHeight: 1.6,
    }),
    messagesList: () => (theme: Theme) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
    }),
    messageBubble: (isUser: boolean) => (theme: Theme) => ({
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        maxWidth: '70%',
        padding: theme.spacing(1.5, 2),
        borderRadius: theme.spacing(3), // Smaller border radius (8px)
        backgroundColor: isUser
            ? theme.palette.background.paper // User messages: dark slate background
            : theme.palette.grey[700], // Contact messages: lighter grey background
        color: isUser
            ? theme.palette.text.primary
            : theme.palette.text.primary,
        border: isUser
            ? `1px solid ${theme.palette.primary.light}`
            : `1px solid ${theme.palette.grey[600]}`,
    }),
    replyButton: () => (theme: Theme) => ({
        marginTop: theme.spacing(2),
        backgroundColor: theme.palette.background.default,
        boxShadow: `0 2px 8px ${hexToRgba(theme.palette.background.paper, 0.5)}`,
        ':hover': {
            backgroundColor: hexToRgba(theme.palette.background.default, 0.8),
            boxShadow: `0 2px 8px ${hexToRgba(theme.palette.background.paper, 0.2)}`,
        },
    }),
    messageHeader: () => (theme: Theme) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing(0.5),
        fontSize: '0.75rem',
        opacity: 0.8,
    }),
    messageSender: () => (theme: Theme) => ({
        fontWeight: 600,
        opacity: 0.9,
    }),
    messageTimestamp: () => (theme: Theme) => ({
        opacity: 0.7,
        fontFamily: 'monospace',
    }),
    messageBody: () => (theme: Theme) => ({
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
    }),
    notesTextarea: () => (theme: Theme) => ({
        width: '100%',
        minHeight: 120,
    }),
    actionsRow: () => (theme: Theme) => ({
        display: 'flex',
        gap: theme.spacing(2),
        justifyContent: 'flex-end',
        marginTop: theme.spacing(2),
    }),
    loadingContainer: () => (theme: Theme) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 400,
    }),
    errorContainer: () => (theme: Theme) => ({
        padding: theme.spacing(3),
    }),
};

