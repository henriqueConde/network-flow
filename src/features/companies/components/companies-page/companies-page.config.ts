export const COMPANIES_PAGE_CONFIG = {
  copy: {
    title: 'Companies Directory',
    subtitle: 'Track companies you\'re interested in and their funding status.',
    searchPlaceholder: 'Search by name or industry',
    createButton: 'New Company',
    editButton: 'Edit',
    deleteButton: 'Delete',
    dialog: {
      createTitle: 'Create Company',
      editTitle: 'Edit Company',
      deleteTitle: 'Delete Company',
      deleteMessage: 'Are you sure you want to delete',
      cancel: 'Cancel',
      save: 'Save',
      create: 'Create',
      delete: 'Delete',
    },
    table: {
      name: 'Name',
      industry: 'Industry',
      fundingRound: 'Funding Round',
      fundingDate: 'Funding Date',
      hasRelevantRole: 'Has Role',
      applied: 'Applied',
      actions: 'Actions',
    },
    emptyState: 'No companies yet. Create your first company to get started.',
  },
  ui: {
    defaultPageSize: 20,
  },
} as const;




