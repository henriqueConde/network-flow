'use client';

import { Box, Alert } from '@mui/material';
import { ConversationDetailHeader } from './conversation-detail-header/conversation-detail-header.view';
import type { ErrorViewProps } from './error-view.types';
import { styles } from './error-view.styles';

export function ErrorView({ error, isNotFound, config, onBack }: ErrorViewProps) {
  return (
    <Box sx={styles.container()}>
      <ConversationDetailHeader
        contactName=""
        contactCompany={null}
        isOutOfSync={false}
        config={config}
        onBack={onBack}
      />
      <Alert severity={isNotFound ? 'info' : 'error'} sx={styles.errorContainer()}>
        {isNotFound ? 'Conversation not found' : error}
      </Alert>
    </Box>
  );
}

