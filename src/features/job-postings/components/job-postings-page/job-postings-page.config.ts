export const JOB_POSTINGS_PAGE_CONFIG = {
  copy: {
    title: 'Job Postings',
    subtitle: 'Track job postings you\'re interested in and your outreach progress.',
    searchPlaceholder: 'Search by job title or company',
    createButton: 'New Job Posting',
    editButton: 'Edit',
    deleteButton: 'Delete',
    dialog: {
      createTitle: 'Create Job Posting',
      editTitle: 'Edit Job Posting',
      deleteTitle: 'Delete Job Posting',
      deleteMessage: 'Are you sure you want to delete',
      cancel: 'Cancel',
      save: 'Save',
      create: 'Create',
      delete: 'Delete',
    },
    table: {
      jobTitle: 'Job Title',
      company: 'Company',
      source: 'Source',
      postedAt: 'Posted At',
      applicants: 'Applicants',
      outreachDone: 'Outreach Done',
      actions: 'Actions',
    },
    emptyState: 'No job postings yet. Create your first job posting to get started.',
  },
  ui: {
    defaultPageSize: 20,
  },
} as const;



