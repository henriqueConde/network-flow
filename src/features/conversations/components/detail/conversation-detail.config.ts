export const CONVERSATION_DETAIL_CONFIG = {
  copy: {
    title: 'Conversation Detail',
    backButton: 'Back to Inbox',
    outOfSyncBanner: {
      title: 'New messages detected',
      message:
        'This conversation has newer messages on LinkedIn. Open the thread, copy the new messages, and paste them here to sync.',
      action: 'Paste new messages',
    },
    contact: {
      label: 'Contact',
      company: 'Company',
    },
    metadata: {
      category: 'Category',
      stage: 'Stage',
      priority: 'Priority',
      nextAction: 'Next action',
      dueDate: 'Due date',
    },
    summary: {
      title: 'Summary',
      empty: 'No summary available',
    },
    messages: {
      title: 'Messages',
      empty: 'No messages yet',
      userLabel: 'You',
      contactLabel: 'Contact',
      addReply: 'Add Reply',
      actions: {
        edit: 'Edit message',
        delete: 'Delete message',
        deleteConfirmation: 'Are you sure you want to delete this message?',
      },
      status: {
        pending: 'Pending',
        confirmed: 'Confirmed',
        togglePending: 'Click to mark as pending',
        toggleConfirmed: 'Click to confirm',
      },
    },
    addReplyDialog: {
      title: 'Add Reply',
      bodyLabel: 'Message',
      bodyPlaceholder: 'Type the message here...',
      senderLabel: 'From',
      sentAtLabel: 'Date & Time',
      cancel: 'Cancel',
      submit: 'Add Message',
      submitting: 'Adding...',
    },
    notes: {
      title: 'Notes',
      placeholder: 'Add your personal notes about this conversation...',
      label: 'Personal notes',
    },
    actions: {
      save: 'Save changes',
      saving: 'Saving...',
      cancel: 'Cancel',
    },
    priority: {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
    },
    aiAssistant: {
      title: 'AI Assistant',
      suggestedReply: {
        title: 'Suggested Reply',
        copy: 'Copy',
        regenerate: 'Regenerate',
      },
      suggestedNextAction: {
        title: 'Suggested Next Action',
      },
      summary: {
        title: 'Conversation Summary',
      },
      button: {
        reanalyze: 'Re-analyze Conversation',
        getSuggestions: 'Get AI Suggestions',
      },
    },
  },
} as const;

