'use client';

import { useRouter } from 'next/navigation';
import { useScheduledFollowups } from '../../services/followups.queries';
import { FollowupsPageView } from './followups-page.view';
import { FOLLOWUPS_PAGE_CONFIG } from './followups-page.config';
import { useFollowupsCalendar } from './hooks/use-followups-calendar.state';

export function FollowupsPageContainer() {
  const router = useRouter();
  const { data: followupsByDate = [], isLoading, error } = useScheduledFollowups();

  const { calendarData, handlePrevMonth, handleNextMonth } = useFollowupsCalendar(followupsByDate);

  const handleConversationClick = (conversationId: string) => {
    router.push(`/conversations/${conversationId}`);
  };

  return (
    <FollowupsPageView
      followupsByDate={followupsByDate}
      isLoading={isLoading}
      error={error}
      config={FOLLOWUPS_PAGE_CONFIG}
      calendarData={calendarData}
      onConversationClick={handleConversationClick}
      onPrevMonth={handlePrevMonth}
      onNextMonth={handleNextMonth}
    />
  );
}

