export const CONTACT_DETAIL_CONFIG = {
  copy: {
    backButton: 'Back to Contacts',
    title: 'Contact Details',
    sections: {
      basicInfo: 'Basic Information',
      linkedinInfo: 'LinkedIn Information',
      additionalInfo: 'Additional Information',
      conversations: 'Conversations',
    },
    fields: {
      name: 'Name',
      firstName: 'First Name',
      lastName: 'Last Name',
      headlineOrRole: 'Headline / Role',
      position: 'Position',
      company: 'Company',
      email: 'Email Address',
      linkedinUrl: 'LinkedIn URL',
      connectedOn: 'Connected On',
      primaryPlatform: 'Primary Platform',
      tags: 'Tags',
      category: 'Category',
      stage: 'Stage',
      createdAt: 'Created At',
      updatedAt: 'Updated At',
    },
    buttons: {
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
    },
    empty: {
      noConversations: 'No conversations yet',
      noEmail: 'No email address',
      noLinkedInUrl: 'No LinkedIn URL',
      noConnectedOn: 'Not specified',
    },
    conversations: {
      goToConversation: 'Go to conversation',
      startConversation: 'Start Conversation',
    },
  },
  ui: {
    headerHeight: 80,
  },
} as const;

