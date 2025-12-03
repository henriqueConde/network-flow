export const EDIT_MESSAGE_DIALOG_CONFIG = {
  copy: {
    title: 'Edit Message',
    fields: {
      body: {
        label: 'Message',
      },
      sentAt: {
        label: 'Sent At',
      },
    },
    buttons: {
      cancel: 'Cancel',
      save: 'Save',
    },
  },
} as const;

