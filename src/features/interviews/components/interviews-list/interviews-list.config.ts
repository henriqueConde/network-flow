export const INTERVIEWS_LIST_CONFIG = {
  copy: {
    title: 'Interviews',
    subtitle: 'All your interviews in progress.',
    searchPlaceholder: 'Search by name or company',
    statusFilter: {
      all: 'All',
      needs_attention: 'Needs attention',
      waiting_on_them: 'Waiting on them',
    },
    categoryFilter: {
      label: 'Category',
      all: 'All categories',
    },
    table: {
      contact: 'Contact',
      stage: 'Stage',
      category: 'Category',
      channel: 'Channel',
      lastMessage: 'Last message',
      priority: 'Priority',
      status: 'Status',
    },
    emptyState: 'No interviews in progress. Move conversations to the "Interviewing" stage to see them here.',
  },
} as const;

