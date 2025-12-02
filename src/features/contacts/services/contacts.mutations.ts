import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createContact,
  updateContact,
  deleteContact,
  type CreateContactPayload,
  type UpdateContactPayload,
} from './contacts.service';
import { contactsKeys } from './contacts.keys';
import { conversationsKeys } from '@/features/conversations/services/conversations.keys';

/**
 * Mutation hook for creating a contact.
 */
export function useCreateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateContactPayload) => createContact(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: contactsKeys.lists() });
    },
  });
}

/**
 * Mutation hook for updating a contact.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useUpdateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateContactPayload }) =>
      updateContact(id, payload),
    onSuccess: (data) => {
      // Invalidate both the detail and list queries
      queryClient.invalidateQueries({ queryKey: contactsKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: contactsKeys.lists() });
    },
  });
}

/**
 * Mutation hook for deleting a contact.
 */
export function useDeleteContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteContact(id),
    onSuccess: () => {
      // Invalidate contacts list to remove the deleted contact
      queryClient.invalidateQueries({ queryKey: contactsKeys.lists() });
      // Invalidate conversations list since all conversations with this contact were also deleted (cascade)
      queryClient.invalidateQueries({ queryKey: conversationsKeys.lists() });
    },
  });
}

