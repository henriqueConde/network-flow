import { useState, useEffect, useRef } from 'react';
import type { ContactListItem } from '@/features/contacts/services/contacts.service';

/**
 * UI state hook for contacts pagination in create conversation dialog.
 * Handles pagination state, contact accumulation, and infinite scroll logic.
 * Component-level hook for local UI state only (no I/O).
 */
export function useContactsPagination(
  contactsData: { contacts: ContactListItem[]; totalPages: number } | undefined,
  isSearchingContacts: boolean,
  isDialogOpen: boolean,
  debouncedSearch: string,
) {
  const [contactPage, setContactPage] = useState(1);
  const [accumulatedContacts, setAccumulatedContacts] = useState<ContactListItem[]>([]);
  const [hasMoreContacts, setHasMoreContacts] = useState(true);
  const previousPageRef = useRef(1);
  const CONTACTS_PAGE_SIZE = 50;

  // Reset pagination when search changes or dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      setContactPage(1);
      setAccumulatedContacts([]);
      setHasMoreContacts(true);
      previousPageRef.current = 1;
    }
  }, [debouncedSearch, isDialogOpen]);

  // Accumulate contacts from fetched pages
  useEffect(() => {
    if (contactsData) {
      const currentPage = contactPage;
      if (currentPage === 1) {
        // First page: replace accumulated contacts
        setAccumulatedContacts(contactsData.contacts);
      } else if (currentPage > previousPageRef.current) {
        // Subsequent pages: append to accumulated contacts
        setAccumulatedContacts((prev) => {
          // Avoid duplicates by checking IDs
          const existingIds = new Set(prev.map((c) => c.id));
          const newContacts = contactsData.contacts.filter((c) => !existingIds.has(c.id));
          return [...prev, ...newContacts];
        });
      }
      // Check if there are more pages
      setHasMoreContacts(currentPage < contactsData.totalPages);
      previousPageRef.current = currentPage;
    }
  }, [contactsData, contactPage]);

  // Function to load more contacts
  const loadMoreContacts = () => {
    if (!isSearchingContacts && hasMoreContacts) {
      setContactPage((prev) => prev + 1);
    }
  };

  return {
    contactPage,
    accumulatedContacts,
    hasMoreContacts,
    loadMoreContacts,
    CONTACTS_PAGE_SIZE,
  };
}

