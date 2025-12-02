import type { CONVERSATIONS_INBOX_CONFIG } from '../../conversations-inbox.config';
import type { ConversationsInboxFilterStatus } from '../../conversations-inbox.types';
import type { Category } from '@/features/categories';
import type { Stage } from '@/features/stages';

export interface ConversationsInboxFiltersProps {
  search: string;
  status: ConversationsInboxFilterStatus;
  categoryId: string | null;
  stageId: string | null;
  availableCategories: Category[];
  availableStages: Stage[];
  config: typeof CONVERSATIONS_INBOX_CONFIG;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ConversationsInboxFilterStatus) => void;
  onCategoryChange: (value: string | null) => void;
  onStageChange: (value: string | null) => void;
}

