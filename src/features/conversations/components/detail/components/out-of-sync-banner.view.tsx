'use client';

import { Alert, Button, Box, Typography } from '@mui/material';
import type { OutOfSyncBannerProps } from './out-of-sync-banner.types';
import { styles } from './out-of-sync-banner.styles';

export function OutOfSyncBanner({ snippet, config, onPasteNewMessages }: OutOfSyncBannerProps) {
  return (
    <Alert
      severity="warning"
      sx={styles.banner()}
      action={
        <Button color="inherit" size="small" onClick={onPasteNewMessages}>
          {config.copy.outOfSyncBanner.action}
        </Button>
      }
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 600, marginBottom: 0.5 }}>
        {config.copy.outOfSyncBanner.title}
      </Typography>
      <Typography variant="body2">{config.copy.outOfSyncBanner.message}</Typography>
      {snippet && (
        <Box sx={styles.snippetBox()}>
          <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
            &ldquo;{snippet}&rdquo;
          </Typography>
        </Box>
      )}
    </Alert>
  );
}






