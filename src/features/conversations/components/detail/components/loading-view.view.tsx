'use client';

import { Box, CircularProgress } from '@mui/material';
import type { LoadingViewProps } from './loading-view.types';
import { styles } from './loading-view.styles';

export function LoadingView(_props: LoadingViewProps) {
  return (
    <Box sx={styles.container()}>
      <Box sx={styles.loadingContainer()}>
        <CircularProgress />
      </Box>
    </Box>
  );
}


