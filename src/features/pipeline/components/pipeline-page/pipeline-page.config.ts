export const PIPELINE_PAGE_CONFIG = {
  copy: {
    title: 'Pipeline',
    subtitle: 'Your networking and interview funnel',
    categoryFilter: {
      label: 'Category',
      all: 'All categories',
    },
    stageFilter: {
      label: 'Stage',
      all: 'All stages',
    },
    empty: {
      noStages: 'No stages configured yet. Create stages to organize your opportunities, or assign stages to conversations from the Conversations page.',
      noOpportunities: 'No opportunities in this stage',
      noData: 'No conversations yet. Start by creating a conversation from the Conversations page.',
    },
    opportunity: {
      outOfSync: 'New messages',
      noCategory: 'No category',
      noNextAction: 'No next action',
      viewDetails: 'View Details',
      moveTo: 'Move to',
    },
  },
  ui: {
    columns: {
      minWidth: 300,
      spacing: 2,
    },
    card: {
      elevation: 1,
      hoverElevation: 3,
    },
  },
} as const;

