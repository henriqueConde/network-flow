import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createCompany,
  updateCompany,
  deleteCompany,
  type CreateCompanyPayload,
  type UpdateCompanyPayload,
} from './companies.service';
import { companiesKeys } from './companies.keys';

/**
 * Mutation hook for creating a company.
 */
export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCompanyPayload) => createCompany(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companiesKeys.lists() });
    },
  });
}

/**
 * Mutation hook for updating a company.
 */
export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateCompanyPayload }) =>
      updateCompany(id, payload),
    onSuccess: (data) => {
      // Invalidate both the detail and list queries
      queryClient.invalidateQueries({ queryKey: companiesKeys.detail(data.id) });
      queryClient.invalidateQueries({ queryKey: companiesKeys.lists() });
    },
  });
}

/**
 * Mutation hook for deleting a company.
 */
export function useDeleteCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCompany(id),
    onSuccess: () => {
      // Invalidate companies list to remove the deleted company
      queryClient.invalidateQueries({ queryKey: companiesKeys.lists() });
    },
  });
}




