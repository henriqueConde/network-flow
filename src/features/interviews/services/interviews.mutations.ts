import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateInterview, type UpdateInterviewPayload } from './interviews.service';
import { interviewsKeys } from './interviews.keys';
import { conversationsKeys } from '@/features/conversations/services/conversations.keys';
import { pipelineKeys } from '@/features/pipeline/services/pipeline.keys';
import { contactsKeys } from '@/features/contacts/services/contacts.keys';
import { todayKeys } from '@/features/home/services/today.keys';

/**
 * Helper to invalidate all interview-related queries.
 * Used when interviews are updated (since they're conversations).
 */
export function useInvalidateInterviews() {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: interviewsKeys.lists() });
    queryClient.invalidateQueries({ queryKey: conversationsKeys.lists() });
    queryClient.invalidateQueries({ queryKey: pipelineKeys.board() });
    queryClient.invalidateQueries({ queryKey: contactsKeys.lists() });
    queryClient.invalidateQueries({ queryKey: todayKeys.metrics() });
  };
}

/**
 * Mutation hook for updating an interview.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useUpdateInterview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateInterviewPayload }) =>
      updateInterview(id, payload),
    onSuccess: (data) => {
      // Invalidate both the detail and list queries
      queryClient.invalidateQueries({ queryKey: interviewsKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: interviewsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: conversationsKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: conversationsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: pipelineKeys.board() });
      queryClient.invalidateQueries({ queryKey: contactsKeys.lists() });
      queryClient.invalidateQueries({ queryKey: todayKeys.metrics() });
    },
  });
}

