import type { TODAY_PAGE_CONFIG } from './today-page.config';
import type { ConversationChannelType } from '@/shared/types';

export type TodayPageMetrics = {
    activeOpportunities: number;
    interviewsInProgress: number;
    overdueFollowUps: number;
};

export type TodayAction = {
    id: string;
    type: 'reply' | 'follow_up' | 'outreach' | 'seek_opportunities';
    title: string;
    description?: string;
    conversationId?: string;
    contactName?: string;
    contactCompany?: string;
    dueAt: Date;
    priority: 'high' | 'medium' | 'low' | null;
    category?: string;
    stage?: string;
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

export interface TodayPageViewProps {
    metrics: TodayPageMetrics;
    prioritizedActions: TodayAction[];
    overdueItems: OverdueItem[];
    isLoading: boolean;
    error: string | null;
    config: typeof TODAY_PAGE_CONFIG;
    onActionClick: (actionId: string, conversationId?: string) => void;
    onOverdueClick: (itemId: string, conversationId?: string) => void;
    onInterviewsClick: () => void;
    activeOpportunitiesGoal: number;
    onEditGoalClick: () => void;
    editGoalModal: EditGoalModalState;
}
