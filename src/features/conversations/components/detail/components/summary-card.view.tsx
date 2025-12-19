'use client';

import { Card, CardContent, Typography } from '@mui/material';
import type { SummaryCardProps } from './summary-card.types';
import { styles } from './summary-card.styles';

export function SummaryCard({ summary, config }: SummaryCardProps) {
  return (
    <Card sx={styles.card()}>
      <CardContent>
        <Typography variant="h6" sx={styles.cardTitle()}>
          {config.copy.summary.title}
        </Typography>
        <Typography variant="body2" sx={styles.summaryText()}>
          {summary}
        </Typography>
      </CardContent>
    </Card>
  );
}






