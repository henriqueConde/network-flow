'use client';

import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import type { ContactsPageHeaderProps } from './contacts-page-header.types';
import { styles } from './contacts-page-header.styles';

export function ContactsPageHeader({
  config,
  onOpenCreate,
  onStartImport,
  isImporting,
}: ContactsPageHeaderProps) {
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
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<LinkedInIcon />}
          onClick={onStartImport}
          disabled={isImporting}
        >
          {config.copy.importLinkedInButton}
        </Button>
        <Button variant="contained" startIcon={<AddIcon />} onClick={onOpenCreate}>
          {config.copy.createButton}
        </Button>
      </Box>
    </Box>
  );
}


