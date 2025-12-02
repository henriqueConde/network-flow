export const CONVERSATIONS_INBOX_CONFIG = {
  copy: {
    title: 'Conversations Inbox',
    subtitle: 'All your networking conversations in one place.',
    searchPlaceholder: 'Search by name or company',
    createButton: 'New Conversation',
    statusFilter: {
      all: 'All',
      needs_attention: 'Needs attention',
      waiting_on_them: 'Waiting on them',
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
    emptyState: 'No conversations yet. Create your first one to get started.',
  },
} as const;


