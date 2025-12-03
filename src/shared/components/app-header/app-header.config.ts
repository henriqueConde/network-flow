export const APP_HEADER_CONFIG = {
  copy: {
    title: 'Network Flow',
    signOut: 'Sign Out',
    navigation: {
      today: 'Today',
      conversations: 'Conversations',
      interviews: 'Interviews',
      opportunities: 'Opportunities',
      pipeline: 'Pipeline',
      contacts: 'Contacts',
    },
  },
  ui: {
    height: 64,
  },
  routes: {
    today: '/',
    conversations: '/conversations',
    interviews: '/interviews',
    opportunities: '/opportunities',
    pipeline: '/pipeline',
    contacts: '/contacts',
  },
} as const;

