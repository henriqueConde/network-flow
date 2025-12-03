import type { InterviewInboxItem } from '../../services/interviews.service';
import type { INTERVIEWS_LIST_CONFIG } from './interviews-list.config';
import type { Category } from '@/features/categories';

export type InterviewsListFilterStatus = 'all' | 'needs_attention' | 'waiting_on_them';

export interface InterviewsListViewProps {
  interviews: InterviewInboxItem[];
  isLoading: boolean;
  error: string | null;
  search: string;
  page: number;
  sortBy: 'updatedAt' | 'lastMessageAt' | 'priority';
  sortDir: 'asc' | 'desc';
  status: InterviewsListFilterStatus;
  categoryId: string | null;
  availableCategories: Category[];
  config: typeof INTERVIEWS_LIST_CONFIG;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: InterviewsListFilterStatus) => void;
  onCategoryChange: (value: string | null) => void;
  onPageChange: (page: number) => void;
  onSortChange: (sortBy: 'updatedAt' | 'lastMessageAt' | 'priority', sortDir: 'asc' | 'desc') => void;
  onRowClick: (conversationId: string) => void;
}

