import type { ScheduledFollowupsByDate } from '../../services/followups.service';
import type { FOLLOWUPS_PAGE_CONFIG } from './followups-page.config';
import type { CalendarData } from './hooks/use-followups-calendar.state';

export type FollowupsPageViewProps = {
    followupsByDate: ScheduledFollowupsByDate[];
    isLoading: boolean;
    error: Error | null;
    config: typeof FOLLOWUPS_PAGE_CONFIG;
    calendarData: CalendarData;
    onConversationClick: (conversationId: string) => void;
    onPrevMonth: () => void;
    onNextMonth: () => void;
};

