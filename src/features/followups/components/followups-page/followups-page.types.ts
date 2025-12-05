import type { ScheduledFollowupsByDate } from '../../services/followups.service';
import type { FOLLOWUPS_PAGE_CONFIG } from './followups-page.config';

export type FollowupsPageViewProps = {
  followupsByDate: ScheduledFollowupsByDate[];
  isLoading: boolean;
  error: Error | null;
  config: typeof FOLLOWUPS_PAGE_CONFIG;
  onConversationClick: (conversationId: string) => void;
  onOpportunityClick: (opportunityId: string) => void;
};

