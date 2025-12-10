export const CHALLENGE_DETAIL_CONFIG = {
  copy: {
    backButton: 'Back to Challenges',
    title: 'Challenge Details',
    sections: {
      basicInfo: 'Basic Information',
      progress: 'Progress Tracking',
      metrics: 'Metrics',
      notes: 'Notes',
    },
    fields: {
      name: 'Challenge Name',
      startDate: 'Start Date',
      endDate: 'End Date',
      goal: 'Goal',
      outreachesPerDay: 'Outreaches Per Day',
      outreachesCount: 'Outreaches',
      acceptsCount: 'Accepts',
      repliesCount: 'Replies',
      callsCount: 'Screenings Scheduled',
      interviewsCount: 'Interviews',
      notes: 'Notes',
      createdAt: 'Created At',
      updatedAt: 'Updated At',
    },
    buttons: {
      edit: 'Edit',
      save: 'Save',
      cancel: 'Cancel',
    },
    progress: {
      overallProgress: 'Overall Progress',
      daysRemaining: 'Days Remaining',
      daysElapsed: 'Days Elapsed',
      completionRate: 'Completion Rate',
      onTrack: 'On Track',
      behind: 'Behind Schedule',
      ahead: 'Ahead of Schedule',
    },
    empty: {
      noNotes: 'No notes added yet',
    },
  },
  ui: {
    headerHeight: 80,
  },
} as const;

