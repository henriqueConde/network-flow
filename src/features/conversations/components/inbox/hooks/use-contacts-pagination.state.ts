import { useState, useEffect, useRef } from 'react';
import type { ContactListItem } from '@/features/contacts';

/**
 * UI state hook for contacts pagination in create conversation dialog.
 * Handles contact accumulation and infinite scroll logic.
 * Component-level hook for local UI state only (no I/O).
 * Page state should be managed externally and passed in.
 */
export function useContactsPagination(
  contactsData: { contacts: ContactListItem[]; totalPages: number } | undefined,
  currentPage: number,
  isSearchingContacts: boolean,
  isDialogOpen: boolean,
  debouncedSearch: string,
) {
  const [accumulatedContacts, setAccumulatedContacts] = useState<ContactListItem[]>([]);
  const [hasMoreContacts, setHasMoreContacts] = useState(true);
  const previousPageRef = useRef(0);
  const previousSearchRef = useRef(debouncedSearch);
  const wasDialogOpenRef = useRef(isDialogOpen);
  const processedPagesRef = useRef<Set<number>>(new Set());
  const CONTACTS_PAGE_SIZE = 50;

  // Reset pagination when search changes or dialog opens
  useEffect(() => {
    const searchChanged = previousSearchRef.current !== debouncedSearch;
    const dialogJustOpened = isDialogOpen && !wasDialogOpenRef.current;
    
    if (searchChanged || dialogJustOpened) {
      setAccumulatedContacts([]);
      setHasMoreContacts(true);
      previousPageRef.current = 0;
      processedPagesRef.current = new Set();
      previousSearchRef.current = debouncedSearch;
    }
    
    wasDialogOpenRef.current = isDialogOpen;
  }, [debouncedSearch, isDialogOpen]);

  // Accumulate contacts from fetched pages
  useEffect(() => {
    if (contactsData && Array.isArray(contactsData.contacts)) {
      // Only process if we haven't already processed this page
      if (!processedPagesRef.current.has(currentPage)) {
        if (currentPage === 1) {
          // First page: replace accumulated contacts
          setAccumulatedContacts(contactsData.contacts);
        } else {
          // Subsequent pages: append to accumulated contacts
          setAccumulatedContacts((prev) => {
            // Avoid duplicates by checking IDs
            const existingIds = new Set(prev.map((c) => c.id));
            const newContacts = contactsData.contacts.filter((c) => !existingIds.has(c.id));
            return [...prev, ...newContacts];
          });
        }
        processedPagesRef.current.add(currentPage);
        previousPageRef.current = currentPage;
      }
      // Check if there are more pages
      setHasMoreContacts(currentPage < contactsData.totalPages);
    } else if (contactsData && !Array.isArray(contactsData.contacts)) {
      // Safety check: if contactsData exists but contacts is not an array, reset
      console.warn('contactsData.contacts is not an array:', contactsData);
      setAccumulatedContacts([]);
    }
  }, [contactsData, currentPage]);

  return {
    accumulatedContacts,
    hasMoreContacts,
    CONTACTS_PAGE_SIZE,
  };
}

