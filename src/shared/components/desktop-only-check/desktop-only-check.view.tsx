'use client';

import { Box, Typography } from '@mui/material';
import { styles } from './desktop-only-check.styles';
import type { DesktopOnlyCheckViewProps } from './desktop-only-check.types';

export function DesktopOnlyCheckView({ config }: DesktopOnlyCheckViewProps) {
  return (
    <Box sx={styles.overlay()}>
      <Box sx={styles.container()}>
        <Typography variant="h4" sx={styles.title()}>
          {config.copy.title}
        </Typography>
        <Typography sx={styles.message()}>
          {config.copy.message}
        </Typography>
      </Box>
    </Box>
  );
}

