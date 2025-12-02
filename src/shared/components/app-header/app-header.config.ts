export const APP_HEADER_CONFIG = {
  copy: {
    title: 'Network Flow',
    signOut: 'Sign Out',
    navigation: {
      today: 'Today',
      conversations: 'Conversations',
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
    pipeline: '/pipeline',
    contacts: '/contacts',
  },
} as const;

