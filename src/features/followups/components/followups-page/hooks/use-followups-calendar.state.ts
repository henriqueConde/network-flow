import { useState, useMemo } from 'react';
import type { ScheduledFollowupsByDate } from '../../../services/followups.service';

export type CalendarDay = {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  followups: ScheduledFollowupsByDate['followups'];
};

export type CalendarData = {
  days: CalendarDay[];
  year: number;
  month: number;
};

/**
 * UI state hook for followups calendar.
 * Handles month navigation and calendar grid calculation.
 * Component-level hook for local UI state only (no I/O).
 */
export function useFollowupsCalendar(followupsByDate: ScheduledFollowupsByDate[]) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const calendarData = useMemo<CalendarData>(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Get first day of month and how many days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Create a map of follow-ups by date (YYYY-MM-DD)
    const followupsMap = new Map<string, ScheduledFollowupsByDate['followups']>();
    for (const group of followupsByDate) {
      followupsMap.set(group.date, group.followups);
    }

    // Build calendar grid
    const days: CalendarDay[] = [];

    // Add days from previous month to fill the first week
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      const dateKey = date.toISOString().split('T')[0];
      days.push({
        date,
        dayNumber: prevMonthLastDay - i,
        isCurrentMonth: false,
        followups: followupsMap.get(dateKey) || [],
      });
    }

    // Add days from current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateKey = date.toISOString().split('T')[0];
      days.push({
        date,
        dayNumber: day,
        isCurrentMonth: true,
        followups: followupsMap.get(dateKey) || [],
      });
    }

    // Add days from next month to fill the last week (up to 42 days total for 6 weeks)
    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      const dateKey = date.toISOString().split('T')[0];
      days.push({
        date,
        dayNumber: day,
        isCurrentMonth: false,
        followups: followupsMap.get(dateKey) || [],
      });
    }

    return { days, year, month };
  }, [currentMonth, followupsByDate]);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return {
    calendarData,
    currentMonth,
    handlePrevMonth,
    handleNextMonth,
  };
}




