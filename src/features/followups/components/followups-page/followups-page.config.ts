export const FOLLOWUPS_PAGE_CONFIG = {
  copy: {
    title: 'Follow-ups',
    subtitle: 'Scheduled automatic follow-up messages',
    empty: 'No follow-ups scheduled',
    calendar: {
      monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    },
    followup: {
      followupNumber: (n: number) => {
        const labels = ['1st', '2nd', '3rd'];
        return `${labels[n]} follow-up`;
      },
      viewConversation: 'View Conversation',
      viewOpportunity: 'View Opportunity',
    },
  },
} as const;




