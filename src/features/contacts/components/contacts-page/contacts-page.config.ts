export const CONTACTS_PAGE_CONFIG = {
  copy: {
    title: 'Contacts Directory',
    subtitle: 'All your networking contacts in one place.',
    searchPlaceholder: 'Search by name, role, or company',
    createButton: 'New Contact',
    editButton: 'Edit',
    deleteButton: 'Delete',
    dialog: {
      createTitle: 'Create Contact',
      editTitle: 'Edit Contact',
      deleteTitle: 'Delete Contact',
      deleteMessage: 'Are you sure you want to delete',
      cancel: 'Cancel',
      save: 'Save',
      create: 'Create',
      delete: 'Delete',
    },
    table: {
      name: 'Name',
      role: 'Role',
      company: 'Company',
      platform: 'Platform',
      stage: 'Stage',
      category: 'Category',
      lastTouch: 'Last touch',
      actions: 'Actions',
    },
    emptyState: 'No contacts yet. Create your first contact to get started.',
  },
  ui: {
    defaultPageSize: 20,
  },
} as const;

