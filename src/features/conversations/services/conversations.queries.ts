import { useQuery } from '@tanstack/react-query';
import { listConversations, getConversationDetail } from './conversations.service';
import { conversationsKeys } from './conversations.keys';

/**
 * Query hook for fetching conversations list (inbox).
 * Defined in services layer for reusability and separation of concerns.
 */
export function useConversationsInbox(params: {
  search?: string;
  status?: 'all' | 'needs_attention' | 'waiting_on_them';
  page: number;
  pageSize: number;
  sortBy: 'updatedAt' | 'lastMessageAt' | 'priority';
  sortDir: 'asc' | 'desc';
}) {
  return useQuery({
    queryKey: conversationsKeys.list(params),
    queryFn: () => listConversations(params),
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });
}

/**
 * Query hook for fetching a single conversation detail.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useConversationDetail(id: string) {
  return useQuery({
    queryKey: conversationsKeys.detail(id),
    queryFn: () => getConversationDetail(id),
    enabled: !!id,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });
}


