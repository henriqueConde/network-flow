import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createConversation,
  updateConversation,
  addMessage,
  type CreateConversationPayload,
  type UpdateConversationPayload,
  type AddMessagePayload,
} from './conversations.service';
import { conversationsKeys } from './conversations.keys';

/**
 * Mutation hook for creating a new conversation.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useCreateConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateConversationPayload) => createConversation(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: conversationsKeys.lists() });
    },
  });
}

/**
 * Mutation hook for updating a conversation.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useUpdateConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateConversationPayload }) =>
      updateConversation(id, payload),
    onSuccess: (data) => {
      // Invalidate both the detail and list queries
      queryClient.invalidateQueries({ queryKey: conversationsKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: conversationsKeys.lists() });
    },
  });
}

/**
 * Mutation hook for adding a message to a conversation.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useAddMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ conversationId, payload }: { conversationId: string; payload: AddMessagePayload }) =>
      addMessage(conversationId, payload),
    onSuccess: (data) => {
      // Invalidate both the detail and list queries
      queryClient.invalidateQueries({ queryKey: conversationsKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: conversationsKeys.lists() });
    },
  });
}

