import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createConversation,
  updateConversation,
  addMessage,
  updateMessage,
  deleteMessage,
  toggleMessageStatus,
  deleteConversation,
  type CreateConversationPayload,
  type UpdateConversationPayload,
  type AddMessagePayload,
} from './conversations.service';
import { conversationsKeys } from './conversations.keys';
import { pipelineKeys } from '@/features/pipeline/services/pipeline.keys';
import { contactsKeys } from '@/features/contacts/services/contacts.keys';
import { interviewsKeys } from '@/features/interviews/services/interviews.keys';
import { opportunitiesKeys } from '@/features/opportunities/services/opportunities.keys';

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
      // Invalidate contacts list to refresh latest conversation info
      queryClient.invalidateQueries({ queryKey: contactsKeys.lists() });
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
      // Invalidate both the detail and list queries, and pipeline
      queryClient.invalidateQueries({ queryKey: conversationsKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: conversationsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: pipelineKeys.board() });
      // Invalidate contacts list to refresh latest conversation info
      queryClient.invalidateQueries({ queryKey: contactsKeys.lists() });
      // Invalidate interviews lists (conversation might have moved to/from Interviewing stage)
      queryClient.invalidateQueries({ queryKey: interviewsKeys.lists() });
      // Invalidate all opportunity details (conversation might be linked to an opportunity or same contact)
      queryClient.invalidateQueries({ queryKey: opportunitiesKeys.details() });
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
      // Invalidate contacts list to refresh latest conversation info
      queryClient.invalidateQueries({ queryKey: contactsKeys.lists() });
    },
  });
}

/**
 * Mutation hook for updating a message.
 */
export function useUpdateMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ 
      conversationId, 
      messageId, 
      payload 
    }: { 
      conversationId: string; 
      messageId: string; 
      payload: { body?: string; sentAt?: string } 
    }) =>
      updateMessage(conversationId, messageId, payload),
    onSuccess: (data) => {
      // Invalidate both the detail and list queries, and today page
      queryClient.invalidateQueries({ queryKey: conversationsKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: conversationsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ['today'] });
      // Invalidate contacts list to refresh latest conversation info
      queryClient.invalidateQueries({ queryKey: contactsKeys.lists() });
    },
  });
}

/**
 * Mutation hook for deleting a message.
 */
export function useDeleteMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ conversationId, messageId }: { conversationId: string; messageId: string }) =>
      deleteMessage(conversationId, messageId),
    onSuccess: (data) => {
      // Invalidate both the detail and list queries, and today page
      queryClient.invalidateQueries({ queryKey: conversationsKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: conversationsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ['today'] });
      // Invalidate contacts list to refresh latest conversation info
      queryClient.invalidateQueries({ queryKey: contactsKeys.lists() });
    },
  });
}

/**
 * Mutation hook for toggling message status.
 */
export function useToggleMessageStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ conversationId, messageId }: { conversationId: string; messageId: string }) =>
      toggleMessageStatus(conversationId, messageId),
    onSuccess: (data) => {
      // Invalidate both the detail and list queries, and today page
      queryClient.invalidateQueries({ queryKey: conversationsKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: conversationsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ['today'] });
      // Invalidate contacts list to refresh latest conversation info
      queryClient.invalidateQueries({ queryKey: contactsKeys.lists() });
    },
  });
}

/**
 * Mutation hook for deleting a conversation.
 */
export function useDeleteConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteConversation(id),
    onSuccess: () => {
      // Invalidate conversations list to remove the deleted conversation
      queryClient.invalidateQueries({ queryKey: conversationsKeys.lists() });
      // Invalidate contacts list to refresh latest conversation info
      queryClient.invalidateQueries({ queryKey: contactsKeys.lists() });
      // Invalidate pipeline board
      queryClient.invalidateQueries({ queryKey: pipelineKeys.board() });
      // Invalidate interviews lists (deleted conversation might have been an interview)
      queryClient.invalidateQueries({ queryKey: interviewsKeys.lists() });
      // Invalidate all opportunity details (deleted conversation might have been linked)
      queryClient.invalidateQueries({ queryKey: opportunitiesKeys.details() });
    },
  });
}

