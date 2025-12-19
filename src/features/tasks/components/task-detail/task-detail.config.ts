export const TASK_DETAIL_CONFIG = {
  copy: {
    back: 'Back to tasks',
    edit: 'Edit',
    save: 'Save changes',
    cancel: 'Cancel',
    markComplete: 'Mark complete',
    markIncomplete: 'Mark as open',
    delete: 'Delete task',
    loading: 'Loading task...',
    notFound: 'Task not found',
    error: 'Failed to load task. Please try again.',
    metadata: {
      status: 'Status',
      due: 'Due date',
      priority: 'Priority',
      createdAt: 'Created',
      updatedAt: 'Updated',
    },
    fields: {
      title: 'Title',
      description: 'Description',
      dueDate: 'Due date',
      priority: 'Priority',
    },
    emptyDescription: 'No description provided.',
  },
} as const;


