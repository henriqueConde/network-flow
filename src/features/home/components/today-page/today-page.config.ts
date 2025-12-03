export const TODAY_PAGE_CONFIG = {
    copy: {
        title: 'Today',
        subtitle: 'Your daily action plan',
        metrics: {
            activeOpportunities: {
                label: 'Active Opportunities',
                singular: 'opportunity',
                plural: 'opportunities',
            },
            interviewsInProgress: {
                label: 'Interviews in Progress',
                singular: 'interview',
                plural: 'interviews',
            },
            overdueFollowUps: {
                label: 'Overdue Follow-ups',
                singular: 'overdue',
                plural: 'overdue',
            },
        },
        sections: {
            prioritizedActions: {
                title: 'Prioritized Actions',
                empty: 'No actions for today. Great job!',
                seekOpportunities: {
                    title: (count: number) => `Seek ${count} new ${count === 1 ? 'opportunity' : 'opportunities'} today`,
                    description: (current: number, goal: number, toSeek: number) => 
                        `You have ${current} out of ${goal} active opportunities. Aim to add ${toSeek} more today.`,
                },
            },
            newMessages: {
                title: 'New Messages',
                empty: 'No new messages',
            },
            overdueItems: {
                title: 'Overdue',
                empty: 'All caught up!',
            },
        },
        actions: {
            viewAll: 'View All',
            markComplete: 'Mark Complete',
        },
    },
    ui: {
        maxActionsToShow: 8,
        metrics: {
            variant: 'h6' as const,
            color: 'text.secondary' as const,
        },
    },
} as const;
