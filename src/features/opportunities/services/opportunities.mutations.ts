import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
  type CreateOpportunityPayload,
  type UpdateOpportunityPayload,
} from './opportunities.service';
import { opportunitiesKeys } from './opportunities.keys';
import { pipelineKeys } from '@/features/pipeline/services/pipeline.keys';
import { contactsKeys } from '@/features/contacts/services/contacts.keys';

/**
 * Mutation hook for creating a new opportunity.
 */
export function useCreateOpportunity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOpportunityPayload) => createOpportunity(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: opportunitiesKeys.lists() });
      // Invalidate contacts list to refresh latest opportunity info
      queryClient.invalidateQueries({ queryKey: contactsKeys.lists() });
      // Invalidate pipeline board
      queryClient.invalidateQueries({ queryKey: pipelineKeys.board() });
    },
  });
}

/**
 * Mutation hook for updating an opportunity.
 */
export function useUpdateOpportunity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateOpportunityPayload }) =>
      updateOpportunity(id, payload),
    onSuccess: (data) => {
      // Invalidate both the detail and list queries, and pipeline
      queryClient.invalidateQueries({ queryKey: opportunitiesKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: opportunitiesKeys.lists() });
      queryClient.invalidateQueries({ queryKey: pipelineKeys.board() });
      // Invalidate contacts list to refresh latest opportunity info
      queryClient.invalidateQueries({ queryKey: contactsKeys.lists() });
      // Invalidate today page
      queryClient.invalidateQueries({ queryKey: ['today'] });
    },
  });
}

/**
 * Mutation hook for deleting an opportunity.
 */
export function useDeleteOpportunity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteOpportunity(id),
    onSuccess: () => {
      // Invalidate opportunities list to remove the deleted opportunity
      queryClient.invalidateQueries({ queryKey: opportunitiesKeys.lists() });
      // Invalidate contacts list to refresh latest opportunity info
      queryClient.invalidateQueries({ queryKey: contactsKeys.lists() });
      // Invalidate pipeline board
      queryClient.invalidateQueries({ queryKey: pipelineKeys.board() });
      // Invalidate today page
      queryClient.invalidateQueries({ queryKey: ['today'] });
    },
  });
}




