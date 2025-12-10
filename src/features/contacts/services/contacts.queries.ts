import { useQuery } from '@tanstack/react-query';
import { listContacts, getContactDetail } from './contacts.service';
import { contactsKeys } from './contacts.keys';

/**
 * Query hook for fetching contacts list (directory).
 * Defined in services layer for reusability and separation of concerns.
 */
export function useContactsList(params: {
  search?: string;
  company?: string;
  categoryId?: string;
  stageId?: string;
  primaryPlatform?: string;
  warmOrCold?: 'warm' | 'cold';
  connectionStatus?: 'not_connected' | 'request_sent' | 'connected';
  contactType?: string;
  page: number;
  pageSize: number;
  sortBy: 'name' | 'company' | 'updatedAt' | 'createdAt';
  sortDir: 'asc' | 'desc';
  enabled?: boolean;
}) {
  // Extract enabled from params to avoid passing it to API and query key
  const { enabled, ...queryParams } = params;
  
  return useQuery({
    queryKey: contactsKeys.list(queryParams),
    queryFn: () => listContacts(queryParams),
    staleTime: 30_000,
    refetchOnWindowFocus: true,
    enabled: enabled !== false,
  });
}

/**
 * Query hook for fetching a single contact detail.
 * Defined in services layer for reusability and separation of concerns.
 */
export function useContactDetail(id: string) {
  return useQuery({
    queryKey: contactsKeys.detail(id),
    queryFn: () => getContactDetail(id),
    enabled: !!id,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });
}



