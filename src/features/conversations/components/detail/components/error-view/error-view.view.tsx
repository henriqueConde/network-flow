'use client';

import { Box, Alert } from '@mui/material';
import { ConversationDetailHeader } from '../conversation-detail-header';
import type { ErrorViewProps } from './error-view.types';
import { styles } from './error-view.styles';

export function ErrorView({ error, isNotFound, config, onBack }: ErrorViewProps) {
  return (
    <Box sx={styles.container()}>
      <ConversationDetailHeader
        contactId=""
        contactName=""
        contactCompany={null}
        opportunityId={null}
        opportunityTitle={null}
        isOutOfSync={false}
        config={config}
        onBack={onBack}
        onViewContact={() => {}}
        onViewOpportunity={() => {}}
        autoFollowupsEnabled={true}
        onToggleAutoFollowups={() => {}}
      />
      <Alert severity={isNotFound ? 'info' : 'error'} sx={styles.errorContainer()}>
        {isNotFound ? 'Conversation not found' : error}
      </Alert>
    </Box>
  );
}

