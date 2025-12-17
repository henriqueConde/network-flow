import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createChallenge,
  updateChallenge,
  deleteChallenge,
  type CreateChallengePayload,
  type UpdateChallengePayload,
} from './challenges.service';
import { challengesKeys } from './challenges.keys';

/**
 * Mutation hook for creating a challenge.
 */
export function useCreateChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateChallengePayload) => createChallenge(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: challengesKeys.lists() });
    },
  });
}

/**
 * Mutation hook for updating a challenge.
 */
export function useUpdateChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateChallengePayload }) =>
      updateChallenge(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: challengesKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: challengesKeys.lists() });
    },
  });
}

/**
 * Mutation hook for deleting a challenge.
 */
export function useDeleteChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteChallenge(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: challengesKeys.lists() });
    },
  });
}



