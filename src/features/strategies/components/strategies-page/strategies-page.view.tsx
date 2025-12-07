'use client';

import { Box, Typography } from '@mui/material';
import type { StrategiesPageViewProps } from './strategies-page.types';
import { styles } from './strategies-page.styles';

export function StrategiesPageView({
  selectedStrategyId,
  config,
  strategies,
  onStrategySelect,
  strategyContent,
}: StrategiesPageViewProps) {
  return (
    <Box sx={styles.root()}>
      {/* Sidebar */}
      <Box sx={styles.sidebar()}>
        <Typography variant="h6" sx={styles.sidebarTitle()}>
          {config.copy.sidebar.title}
        </Typography>
        {strategies.map((strategy) => (
          <Box
            key={strategy.id}
            sx={styles.strategyItem(selectedStrategyId === strategy.id)}
            onClick={() => onStrategySelect(strategy.id)}
          >
            <Typography variant="subtitle2" sx={styles.strategyTitle(selectedStrategyId === strategy.id)}>
              {strategy.title}
            </Typography>
            <Typography variant="body2" sx={styles.strategyDescription()}>
              {strategy.description}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Content */}
      <Box sx={styles.content()}>
        <Box sx={styles.contentContainer()}>
          {strategyContent || (
            <Box sx={styles.emptyState()}>
              <Typography variant="h6" color="text.secondary">
                Select a strategy to get started
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

