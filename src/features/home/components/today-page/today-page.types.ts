import type { TODAY_PAGE_CONFIG } from './today-page.config';
import type { ConversationChannelType } from '@/shared/types';

export type TodayPageMetrics = {
    activeOpportunities: number;
    interviewsInProgress: number;
    overdueFollowUps: number;
};

export type TodayAction = {
    id: string;
    type: 'reply' | 'follow_up' | 'outreach';
    title: string;
    description?: string;
    conversationId?: string;
    contactName: string;
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
    conversationId: string;
    contactName: string;
    contactCompany?: string;
    actionType: string;
    dueDate: Date;
    daysOverdue: number;
};

export interface TodayPageViewProps {
    metrics: TodayPageMetrics;
    prioritizedActions: TodayAction[];
    newMessages: NewMessage[];
    overdueItems: OverdueItem[];
    isLoading: boolean;
    error: string | null;
    config: typeof TODAY_PAGE_CONFIG;
    onActionClick: (actionId: string, conversationId?: string) => void;
    onMessageClick: (messageId: string, conversationId: string) => void;
    onOverdueClick: (itemId: string, conversationId: string) => void;
}
