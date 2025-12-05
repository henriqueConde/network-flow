import { useState } from 'react';
import { CreateConversationFormSchema } from '../conversations-inbox.schema';
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
    contactName: '',
    contactCompany: '',
    opportunityId: undefined,
    channel: ConversationChannel.LINKEDIN,
    pastedText: '',
    firstMessageSender: MessageSide.CONTACT,
  });
  const [contactSearchInput, setContactSearchInput] = useState('');
  const [opportunitySearchInput, setOpportunitySearchInput] = useState('');
  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateConversationFormValues, string>>
  >({});

  const open = (initialOpportunityId?: string) => {
    setValues({
      contactId: undefined,
      contactName: '',
      contactCompany: '',
      opportunityId: initialOpportunityId,
      channel: ConversationChannel.LINKEDIN,
      pastedText: '',
      firstMessageSender: MessageSide.CONTACT,
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
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
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
    const parsed = CreateConversationFormSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof CreateConversationFormValues, string>> = {};
      parsed.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof CreateConversationFormValues | undefined;
        if (path && !fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    await onSubmit(parsed.data);
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
    handleOpportunitySearchChange,
    handleOpportunitySelect,
  };
}


