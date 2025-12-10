'use client';

import { useState, useMemo } from 'react';
import { StrategiesPageView } from './strategies-page.view';
import {
  STRATEGIES_PAGE_CONFIG,
  STRATEGIES,
  SMART_STRATEGY_CONFIG,
  RECENTLY_FUNDED_STARTUP_STRATEGY_CONFIG,
  PROOF_OF_WORK_OUTREACH_STRATEGY_CONFIG,
  LOOM_EMAIL_OUTREACH_STRATEGY_CONFIG,
  JOB_BOARD_LEAD_SNIPING_STRATEGY_CONFIG,
  THE_100_CONNECTION_WEEK_STRATEGY_CONFIG,
} from './strategies-page.config';
import {
  SmartStrategyContent,
  RecentlyFundedStartupStrategyContent,
  ProofOfWorkOutreachStrategyContent,
  LoomEmailOutreachStrategyContent,
  JobBoardLeadSnipingStrategyContent,
  The100ConnectionWeekStrategyContent,
} from './components';

export function StrategiesPageContainer() {
  const [selectedStrategyId, setSelectedStrategyId] = useState<string | null>('smart');

  const strategyContent = useMemo(() => {
    if (!selectedStrategyId) {
      return null;
    }

    switch (selectedStrategyId) {
      case 'smart':
        return <SmartStrategyContent config={SMART_STRATEGY_CONFIG} />;
      case 'recently-funded-startup':
        return <RecentlyFundedStartupStrategyContent config={RECENTLY_FUNDED_STARTUP_STRATEGY_CONFIG} />;
      case 'proof-of-work-outreach':
        return <ProofOfWorkOutreachStrategyContent config={PROOF_OF_WORK_OUTREACH_STRATEGY_CONFIG} />;
      case 'loom-email-outreach':
        return <LoomEmailOutreachStrategyContent config={LOOM_EMAIL_OUTREACH_STRATEGY_CONFIG} />;
      case 'job-board-lead-sniping':
        return <JobBoardLeadSnipingStrategyContent config={JOB_BOARD_LEAD_SNIPING_STRATEGY_CONFIG} />;
      case '100-connection-week':
        return <The100ConnectionWeekStrategyContent config={THE_100_CONNECTION_WEEK_STRATEGY_CONFIG} />;
      default:
        return null;
    }
  }, [selectedStrategyId]);

  return (
    <StrategiesPageView
      selectedStrategyId={selectedStrategyId}
      config={STRATEGIES_PAGE_CONFIG}
      strategies={STRATEGIES}
      onStrategySelect={setSelectedStrategyId}
      strategyContent={strategyContent}
    />
  );
}

