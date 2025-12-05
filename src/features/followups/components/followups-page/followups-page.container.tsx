'use client';

import { useRouter } from 'next/navigation';
import { useScheduledFollowups } from '../../services/followups.queries';
import { FollowupsPageView } from './followups-page.view';
import { FOLLOWUPS_PAGE_CONFIG } from './followups-page.config';

export function FollowupsPageContainer() {
  const router = useRouter();
  const { data: followupsByDate = [], isLoading, error } = useScheduledFollowups();

  const handleConversationClick = (conversationId: string) => {
    router.push(`/conversations/${conversationId}`);
  };

  const handleOpportunityClick = (opportunityId: string) => {
    router.push(`/opportunities/${opportunityId}`);
  };

  return (
    <FollowupsPageView
      followupsByDate={followupsByDate}
      isLoading={isLoading}
      error={error}
      config={FOLLOWUPS_PAGE_CONFIG}
      onConversationClick={handleConversationClick}
      onOpportunityClick={handleOpportunityClick}
    />
  );
}

