import { useState } from 'react';
import type { CreateConversationFormValues } from '../conversations-inbox.types';
import { ConversationChannel, MessageSide } from '@/shared/types';

type SubmitHandler = (values: CreateConversationFormValues) => Promise<void> | void;

/**
 * UI state hook for the "New Conversation" dialog.
 * Owns open/close state, form values, and validation errors.
 * The actual submit side-effects (API calls) are delegated via the onSubmit callback.
 */
export function useCreateConversationDialog(onSubmit: SubmitHandler) {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<CreateConversationFormValues>({
    contactId: undefined,
    contactIds: undefined,
    contactName: '',
    contactCompany: '',
    opportunityId: undefined,
    channel: ConversationChannel.LINKEDIN,
    pastedText: '',
    firstMessageSender: MessageSide.CONTACT,
    firstMessageContactId: undefined,
    categoryId: undefined,
    stageId: undefined,
    challengeId: undefined,
  });
  const [contactSearchInput, setContactSearchInput] = useState('');
  const [opportunitySearchInput, setOpportunitySearchInput] = useState('');
  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateConversationFormValues, string>>
  >({});

  const open = (initialOpportunityId?: string) => {
    setValues({
      contactId: undefined,
      contactIds: undefined,
      contactName: '',
      contactCompany: '',
      opportunityId: initialOpportunityId,
      channel: ConversationChannel.LINKEDIN,
      pastedText: '',
      firstMessageSender: MessageSide.CONTACT,
      firstMessageContactId: undefined,
      categoryId: undefined,
      stageId: undefined,
      challengeId: undefined,
    });
    setContactSearchInput('');
    setOpportunitySearchInput('');
    setErrors({});
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const changeField = (
    field: keyof CreateConversationFormValues,
    value: CreateConversationFormValues[keyof CreateConversationFormValues],
  ) => {
    setValues((prev) => {
      const updated = {
        ...prev,
        [field]: value,
      };
      
      // When firstMessageSender changes to "contact" and we have multiple contacts,
      // set a default firstMessageContactId if not already set
      if (field === 'firstMessageSender' && value === MessageSide.CONTACT) {
        if (updated.contactIds && updated.contactIds.length > 1 && !updated.firstMessageContactId) {
          updated.firstMessageContactId = updated.contactIds[0];
        }
      }
      
      return updated;
    });
  };

  const handleContactSearchChange = (inputValue: string) => {
    setContactSearchInput(inputValue);
    // If user is typing, clear the selected contact
    if (inputValue !== values.contactName) {
      setValues((prev) => ({
        ...prev,
        contactId: undefined,
        contactName: inputValue,
      }));
    }
  };

  const handleContactSelect = (contactId: string | null, contactName: string, contactCompany?: string | null) => {
    setValues((prev) => ({
      ...prev,
      contactId: contactId || undefined,
      contactName,
      contactCompany: contactCompany || '',
    }));
    setContactSearchInput(contactName);
  };

  const handleContactsSelect = (selectedContacts: Array<{ id: string; name: string; company?: string | null }>) => {
    if (selectedContacts.length === 0) {
      setValues((prev) => ({
        ...prev,
        contactId: undefined,
        contactIds: undefined,
        contactName: '',
        contactCompany: '',
        firstMessageContactId: undefined,
      }));
      setContactSearchInput('');
      return;
    }

    // Use first contact for backwards compatibility
    const firstContact = selectedContacts[0];
    const allContactIds = selectedContacts.map(c => c.id);

    setValues((prev) => {
      const updated = {
        ...prev,
        contactId: firstContact.id,
        contactIds: allContactIds,
        contactName: firstContact.name,
        contactCompany: firstContact.company || '',
      };
      
      // If firstMessageSender is "contact" and we now have multiple contacts,
      // set default firstMessageContactId to the first contact if not already set
      if (prev.firstMessageSender === MessageSide.CONTACT && allContactIds.length > 1 && !prev.firstMessageContactId) {
        updated.firstMessageContactId = allContactIds[0];
      } else if (allContactIds.length === 1) {
        // If only one contact, clear firstMessageContactId as it's not needed
        updated.firstMessageContactId = undefined;
      }
      
      return updated;
    });
    setContactSearchInput('');
  };

  const handleOpportunitySearchChange = (inputValue: string) => {
    setOpportunitySearchInput(inputValue);
  };

  const handleOpportunitySelect = (opportunityId: string | null) => {
    setValues((prev) => ({
      ...prev,
      opportunityId: opportunityId || undefined,
    }));
  };

  const submit = async () => {
    const fieldErrors: Partial<Record<keyof CreateConversationFormValues, string>> = {};

    // Minimal client-side validation: only block submit when truly required
    // fields are missing. All other constraints are enforced by the backend.
    // Check if we have at least one contact (either via contactIds or contactName)
    const hasContacts = (values.contactIds && values.contactIds.length > 0) || values.contactName.trim();
    if (!hasContacts) {
      fieldErrors.contactName = 'At least one contact is required';
    }
    if (!values.pastedText.trim()) {
      fieldErrors.pastedText = 'Conversation text is required';
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    await onSubmit(values);
  };

  return {
    isOpen,
    values,
    errors,
    contactSearchInput,
    opportunitySearchInput,
    open,
    close,
    changeField,
    submit,
    handleContactSearchChange,
    handleContactSelect,
    handleContactsSelect,
    handleOpportunitySearchChange,
    handleOpportunitySelect,
  };
}


