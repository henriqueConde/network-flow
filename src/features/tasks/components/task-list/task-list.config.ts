export const TASK_LIST_CONFIG = {
  copy: {
    title: 'Tasks',
    subtitle: 'Track what is due, prioritize, and mark work as done.',
    createButton: 'New task',
    editButton: 'Edit',
    createDialog: {
      title: 'Create task',
      description: 'Add a quick task with a due date and priority.',
      fields: {
        title: 'Title',
        description: 'Description',
        dueDate: 'Due date',
        priority: 'Priority',
      },
      actions: {
        cancel: 'Cancel',
        create: 'Create',
      },
      errors: {
        titleRequired: 'Title is required',
      },
    },
    editDialog: {
      title: 'Edit task',
      description: 'Update task details and priority.',
      fields: {
        title: 'Title',
        description: 'Description',
        dueDate: 'Due date',
        priority: 'Priority',
      },
      actions: {
        cancel: 'Cancel',
        save: 'Save changes',
      },
      errors: {
        titleRequired: 'Title is required',
      },
    },
    filters: {
      completion: {
        label: 'Status',
        options: {
          all: 'All',
          open: 'Open',
          completed: 'Completed',
        },
      },
      dueDate: {
        label: 'Due date',
        options: {
          all: 'Any time',
          today: 'Today',
          overdue: 'Overdue',
          upcoming: 'Upcoming',
        },
      },
      priority: {
        label: 'Priority',
        options: {
          all: 'Any priority',
          low: 'Low',
          medium: 'Medium',
          high: 'High',
        },
      },
    },
    table: {
      columns: {
        title: 'Title',
        dueAt: 'Due',
        priority: 'Priority',
        status: 'Status',
        updatedAt: 'Updated',
        actions: 'Actions',
      },
      empty: 'No tasks match your filters.',
      error: 'Failed to load tasks. Please try again.',
    },
  },
} as const;

