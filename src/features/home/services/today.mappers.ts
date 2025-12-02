import type {
  TodayPageMetrics,
  TodayAction,
  NewMessage,
  OverdueItem,
} from '../components/today-page/today-page.types';
import type { ConversationChannelType } from '@/shared/types';

/**
 * Mappers to convert API DTOs (with ISO string dates) to domain types (with Date objects).
 * This keeps the frontend domain types clean and handles the conversion at the service boundary.
 */

type TodayActionDto = {
  id: string;
  type: 'reply' | 'follow_up' | 'outreach';
  title: string;
  description?: string;
  conversationId?: string;
  contactName: string;
  contactCompany?: string;
  dueAt: string; // ISO string
  priority: 'high' | 'medium' | 'low';
  category?: string;
  stage?: string;
};

type NewMessageDto = {
  id: string;
  conversationId: string;
  contactName: string;
  contactCompany?: string;
  snippet: string;
  receivedAt: string; // ISO string
  channel: ConversationChannelType;
  isOutOfSync: boolean;
};

type OverdueItemDto = {
  id: string;
  conversationId: string;
  contactName: string;
  contactCompany?: string;
  actionType: string;
  dueDate: string; // ISO string
  daysOverdue: number;
};

export function toTodayAction(dto: TodayActionDto): TodayAction {
  return {
    ...dto,
    dueAt: new Date(dto.dueAt),
  };
}

export function toNewMessage(dto: NewMessageDto): NewMessage {
  return {
    ...dto,
    receivedAt: new Date(dto.receivedAt),
  };
}

export function toOverdueItem(dto: OverdueItemDto): OverdueItem {
  return {
    ...dto,
    dueDate: new Date(dto.dueDate),
  };
}

