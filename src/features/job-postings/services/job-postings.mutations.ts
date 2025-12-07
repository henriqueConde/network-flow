import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createJobPosting,
  updateJobPosting,
  deleteJobPosting,
  type CreateJobPostingPayload,
  type UpdateJobPostingPayload,
} from './job-postings.service';
import { jobPostingsKeys } from './job-postings.keys';

/**
 * Mutation hook for creating a job posting.
 */
export function useCreateJobPosting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateJobPostingPayload) => createJobPosting(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobPostingsKeys.lists() });
    },
  });
}

/**
 * Mutation hook for updating a job posting.
 */
export function useUpdateJobPosting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateJobPostingPayload }) =>
      updateJobPosting(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: jobPostingsKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: jobPostingsKeys.lists() });
    },
  });
}

/**
 * Mutation hook for deleting a job posting.
 */
export function useDeleteJobPosting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteJobPosting(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: jobPostingsKeys.lists() });
    },
  });
}

