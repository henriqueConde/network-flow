'use client';

import { Box, Typography, Button, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { ConversationDetailHeaderProps } from './conversation-detail-header.types';
import { styles } from './conversation-detail-header.styles';

export function ConversationDetailHeader({
  contactName,
  contactCompany,
  isOutOfSync,
  config,
  onBack,
}: ConversationDetailHeaderProps) {
  return (
    <Box sx={styles.headerSection()}>
      <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={styles.backButton()}>
        {config.copy.backButton}
      </Button>

      <Box sx={styles.header()}>
        <Box>
          <Typography variant="h4" sx={styles.title()}>
            {contactName}
          </Typography>
          {contactCompany && (
            <Typography variant="body2" color="text.secondary">
              {contactCompany}
            </Typography>
          )}
        </Box>
        {isOutOfSync && <Chip label="Out of sync" color="warning" variant="outlined" />}
      </Box>
    </Box>
  );
}

