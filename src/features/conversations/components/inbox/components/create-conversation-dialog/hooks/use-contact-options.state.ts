import { useMemo } from 'react';
import type { ContactListItem } from '@/features/contacts/services/contacts.service';

export type ContactOption = ContactListItem | (ContactListItem & { isNewContact: true });

/**
 * UI state hook for contact options in create conversation dialog.
 * Handles creating contact options including "New contact" option.
 * Component-level hook for derived state only (no I/O).
 */
export function useContactOptions(
  contacts: ContactListItem[],
  contactSearchInput: string,
  selectedContactId: string | undefined,
  newContactOptionText: string,
) {
  const contactOptions = useMemo(() => contacts || [], [contacts]);
  const searchInputTrimmed = contactSearchInput.trim();

  const hasExactMatch = useMemo(
    () =>
      contactOptions.some(
        (contact) => contact.name.toLowerCase() === searchInputTrimmed.toLowerCase(),
      ),
    [contactOptions, searchInputTrimmed],
  );

  const showNewContactOption =
    searchInputTrimmed.length > 0 && !hasExactMatch && !selectedContactId;

  const newContactOption = useMemo<ContactOption | null>(() => {
    if (!showNewContactOption) return null;

    return {
      id: '__NEW_CONTACT__',
      name: `${searchInputTrimmed} ${newContactOptionText}`,
      company: null,
      companyId: null,
      headlineOrRole: null,
      primaryPlatform: null,
      profileLinks: null,
      tags: [],
      categoryId: null,
      stageId: null,
      email: null,
      warmOrCold: null,
      connectionStatus: null,
      contactType: null,
      strategyIds: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      latestConversation: null,
      createdAtDate: new Date(),
      updatedAtDate: new Date(),
      isNewContact: true as const,
    } as ContactListItem & { isNewContact: true };
  }, [showNewContactOption, searchInputTrimmed, newContactOptionText]);

  const allOptions = useMemo<ContactOption[]>(() => {
    return newContactOption ? [...contactOptions, newContactOption] : contactOptions;
  }, [contactOptions, newContactOption]);

  return {
    contactOptions,
    allOptions,
    newContactOption,
    showNewContactOption,
    searchInputTrimmed,
  };
}

