export const CHALLENGES_PAGE_CONFIG = {
  copy: {
    title: 'Challenges',
    subtitle: 'Track your networking challenges and goals.',
    searchPlaceholder: 'Search by challenge name',
    createButton: 'New Challenge',
    editButton: 'Edit',
    deleteButton: 'Delete',
    dialog: {
      createTitle: 'Create Challenge',
      editTitle: 'Edit Challenge',
      deleteTitle: 'Delete Challenge',
      deleteMessage: 'Are you sure you want to delete',
      cancel: 'Cancel',
      save: 'Save',
      create: 'Create',
      delete: 'Delete',
    },
    table: {
      name: 'Name',
      startDate: 'Start Date',
      endDate: 'End Date',
      goal: 'Goal',
      outreaches: 'Outreaches',
      accepts: 'Accepts',
      replies: 'Replies',
      calls: 'Calls',
      interviews: 'Interviews',
      progress: 'Progress',
      actions: 'Actions',
    },
    emptyState: 'No challenges yet. Create your first challenge to get started.',
  },
  ui: {
    defaultPageSize: 20,
  },
} as const;

