export const OPPORTUNITIES_INBOX_CONFIG = {
  copy: {
    title: 'Opportunities',
    subtitle: 'All your job-hunting and networking opportunities in one place.',
    searchPlaceholder: 'Search by name, company, or title',
    createButton: 'New Opportunity',
    categoryFilter: {
      label: 'Category',
      all: 'All categories',
    },
    stageFilter: {
      label: 'Stage',
      all: 'All stages',
    },
    table: {
      contact: 'Contact',
      title: 'Title',
      stage: 'Stage',
      category: 'Category',
      nextAction: 'Next Action',
      priority: 'Priority',
      lastMessage: 'Last Message',
      warmOrCold: 'Warm/Cold',
      challenge: 'Challenge',
    },
    emptyState: 'No opportunities yet. Create your first one to get started.',
    deleteConfirm: 'Are you sure you want to delete this opportunity?',
  },
} as const;

