import type { STRATEGIES_PAGE_CONFIG, STRATEGIES } from './strategies-page.config';

export interface StrategiesPageViewProps {
  selectedStrategyId: string | null;
  config: typeof STRATEGIES_PAGE_CONFIG;
  strategies: typeof STRATEGIES;
  onStrategySelect: (strategyId: string) => void;
  strategyContent: React.ReactNode;
}

