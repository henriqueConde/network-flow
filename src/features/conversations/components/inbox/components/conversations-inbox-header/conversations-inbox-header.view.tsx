'use client';

import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type { ConversationsInboxHeaderProps } from './conversations-inbox-header.types';
import { styles } from './conversations-inbox-header.styles';

export function ConversationsInboxHeader({
  config,
  onOpenCreate,
}: ConversationsInboxHeaderProps) {
  return (
    <Box sx={styles.header()}>
      <Box sx={styles.titleBlock()}>
        <Typography variant="h4" sx={styles.title()}>
          {config.copy.title}
        </Typography>
        <Typography variant="body2" sx={styles.subtitle()}>
          {config.copy.subtitle}
        </Typography>
      </Box>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onOpenCreate}
      >
        {config.copy.createButton}
      </Button>
    </Box>
  );
}



