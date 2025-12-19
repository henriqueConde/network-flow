import type { TODAY_PAGE_CONFIG } from './today-page.config';
import type { FOLLOWUPS_PAGE_CONFIG } from '@/features/followups/components/followups-page/followups-page.config';
import type { ConversationChannelType } from '@/shared/types';
import type { ScheduledFollowup } from '@/features/followups';

export type TodayPageMetrics = {
    activeOpportunities: number;
    interviewsInProgress: number;
    overdueFollowUps: number;
};

export type TodayAction = {
    id: string;
    type: 'reply' | 'follow_up' | 'outreach' | 'seek_opportunities' | 'task';
    title: string;
    description?: string;
    conversationId?: string;
    contactName?: string;
    contactCompany?: string;
    dueAt: Date;
    priority: 'high' | 'medium' | 'low' | null;
    category?: string;
    stage?: string;
    source?: 'derived' | 'task';
    taskId?: string;
    completed?: boolean;
};

export type NewMessage = {
    id: string;
    conversationId: string;
    contactName: string;
    contactCompany?: string;
    snippet: string;
    receivedAt: Date;
    channel: ConversationChannelType;
    isOutOfSync: boolean;
};

export type OverdueItem = {
    id: string;
    conversationId?: string;
    contactName: string;
    contactCompany?: string;
    actionType: string;
    dueDate: Date;
    daysOverdue: number;
    messagePreview?: string; // Preview of pending message if applicable
};

export interface EditGoalModalState {
    isOpen: boolean;
    goal: number;
    error: string | null;
    onOpen: () => void;
    onClose: () => void;
    onChangeGoal: (goal: number) => void;
    onSave: () => Promise<void>;
    isSaving: boolean;
}

export interface CreateTaskModalState {
    isOpen: boolean;
    error: string | null;
    onOpen: () => void;
    onClose: () => void;
    onCreate: (task: {
        title: string;
        description?: string;
        dueAt?: string;
        priority?: 'low' | 'medium' | 'high';
    }) => Promise<void>;
    isCreating: boolean;
}

export interface FollowupsModalState {
    isOpen: boolean;
    onClose: () => void;
    onConversationClick: (conversationId: string) => void;
}

export interface TodayPageViewProps {
    metrics: TodayPageMetrics;
    prioritizedActions: TodayAction[];
    overdueItems: OverdueItem[];
    followupsForTodayAndOverdue: ScheduledFollowup[];
    isLoading: boolean;
    error: string | null;
    config: typeof TODAY_PAGE_CONFIG;
    followupsConfig: typeof FOLLOWUPS_PAGE_CONFIG;
    onActionClick: (actionId: string, conversationId?: string) => void;
    onOverdueClick: (itemId: string, conversationId?: string) => void;
    onInterviewsClick: () => void;
    onFollowupsClick: () => void;
    activeOpportunitiesGoal: number;
    onEditGoalClick: () => void;
    editGoalModal: EditGoalModalState;
    onActionToggle: (action: TodayAction) => void;
    onRemoveAction: (action: TodayAction) => void;
    isCompletingTask: boolean;
    onCreateTaskClick: () => void;
    createTaskModal: CreateTaskModalState;
    deleteTaskDialog: {
        isOpen: boolean;
        actionTitle: string | null;
        isDeleting: boolean;
        onConfirm: () => void;
        onCancel: () => void;
    };
    followupsModal: FollowupsModalState;
}
