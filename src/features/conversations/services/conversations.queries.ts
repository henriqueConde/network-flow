import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createConversation,
  listConversations,
  type CreateConversationPayload,
} from './conversations.service';
import { conversationsKeys } from './conversations.keys';

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

export function useCreateConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateConversationPayload) => createConversation(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: conversationsKeys.lists() });
    },
  });
}


