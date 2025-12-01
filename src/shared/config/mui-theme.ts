import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3B82F6', // Professional blue - trustworthy, modern
      light: '#60A5FA',
      dark: '#2563EB',
    },
    secondary: {
      main: '#06B6D4', // Teal accent - for actions and highlights
      light: '#22D3EE',
      dark: '#0891B2',
    },
    error: {
      main: '#F87171',
      light: '#FCA5A5',
      dark: '#DC2626',
    },
    warning: {
      main: '#FBBF24',
      light: '#FCD34D',
      dark: '#D97706',
    },
    info: {
      main: '#60A5FA',
      light: '#93C5FD',
      dark: '#3B82F6',
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    background: {
      default: '#0F172A', // Slate-900 - warm dark background
      paper: '#1E293B', // Slate-800 - card/panel background
    },
    text: {
      primary: 'rgba(248, 250, 252, 0.95)', // Slate-50 - high contrast for readability
      secondary: 'rgba(203, 213, 225, 0.7)', // Slate-300 - softer secondary text
    },
    divider: 'rgba(148, 163, 184, 0.12)', // Subtle dividers
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0.025em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '0.02em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.43,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: '0.5px',
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html': {
          overflow: 'hidden',
          height: '100%',
        },
        'body': {
          overflow: 'hidden',
          height: '100%',
          margin: 0,
          padding: 0,
        },
        '#__next': {
          height: '100%',
          overflow: 'hidden',
        },
        '*, *::before, *::after': {
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(59, 130, 246, 0.4) rgba(30, 41, 59, 0.2)',
        },
        '::-webkit-scrollbar': {
          width: 8,
          height: 8,
        },
        '::-webkit-scrollbar-track': {
          background: 'rgba(30, 41, 59, 0.2)',
          borderRadius: 4,
        },
        '::-webkit-scrollbar-thumb': {
          background: 'rgba(59, 130, 246, 0.4)',
          borderRadius: 4,
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: 'rgba(59, 130, 246, 0.6)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          textTransform: 'none',
          fontWeight: 500,
          letterSpacing: '0.025em',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        contained: {
          backgroundColor: '#3B82F6',
          color: '#FFFFFF',
          boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
          '&:hover': {
            backgroundColor: '#2563EB',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
          },
          '&:disabled': {
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            color: 'rgba(248, 250, 252, 0.4)',
          },
        },
        outlined: {
          borderColor: 'rgba(59, 130, 246, 0.5)',
          color: '#60A5FA',
          '&:hover': {
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease',
            '& fieldset': {
              borderColor: 'rgba(148, 163, 184, 0.2)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(59, 130, 246, 0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3B82F6',
              borderWidth: '1.5px',
              boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
            },
            '& input': {
              color: 'rgba(248, 250, 252, 0.95)',
              '&::placeholder': {
                color: 'rgba(203, 213, 225, 0.5)',
                opacity: 1,
              },
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(203, 213, 225, 0.7)',
            '&.Mui-focused': {
              color: '#3B82F6',
            },
          },
          '& .MuiFormHelperText-root': {
            color: 'rgba(203, 213, 225, 0.6)',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backdropFilter: 'blur(8px)',
        },
        standardError: {
          backgroundColor: 'rgba(248, 113, 113, 0.15)',
          border: '1px solid rgba(248, 113, 113, 0.25)',
          color: '#FCA5A5',
        },
        standardSuccess: {
          backgroundColor: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          color: '#34D399',
        },
        standardInfo: {
          backgroundColor: 'rgba(59, 130, 246, 0.15)',
          border: '1px solid rgba(59, 130, 246, 0.25)',
          color: '#93C5FD',
        },
        standardWarning: {
          backgroundColor: 'rgba(251, 191, 36, 0.15)',
          border: '1px solid rgba(251, 191, 36, 0.25)',
          color: '#FCD34D',
        },
      },
    },
  },
});

