'use client';

import { Box, Typography, Button, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { CONTACT_DETAIL_CONFIG } from '../contact-detail-page.config';

type ErrorViewProps = {
  error: string;
  isNotFound: boolean;
  config: typeof CONTACT_DETAIL_CONFIG;
  onBack: () => void;
};

export function ErrorView({ error, isNotFound, config, onBack }: ErrorViewProps) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        gap: 2,
      }}
    >
      <Alert severity={isNotFound ? 'warning' : 'error'} sx={{ maxWidth: 600 }}>
        {error}
      </Alert>
      <Button startIcon={<ArrowBackIcon />} onClick={onBack} variant="outlined">
        {config.copy.backButton}
      </Button>
    </Box>
  );
}




