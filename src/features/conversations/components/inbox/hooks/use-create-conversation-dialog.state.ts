import { useState } from 'react';
import { CreateConversationFormSchema } from '../conversations-inbox.schema';
import type { CreateConversationFormValues } from '../conversations-inbox.types';
import { ConversationChannel } from '@/shared/types';

type SubmitHandler = (values: CreateConversationFormValues) => Promise<void> | void;

/**
 * UI state hook for the "New Conversation" dialog.
 * Owns open/close state, form values, and validation errors.
 * The actual submit side-effects (API calls) are delegated via the onSubmit callback.
 */
export function useCreateConversationDialog(onSubmit: SubmitHandler) {
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState<CreateConversationFormValues>({
    contactName: '',
    contactCompany: '',
    channel: ConversationChannel.LINKEDIN,
    pastedText: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateConversationFormValues, string>>
  >({});

  const open = () => {
    setValues({
      contactName: '',
      contactCompany: '',
      channel: ConversationChannel.LINKEDIN,
      pastedText: '',
    });
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
    open,
    close,
    changeField,
    submit,
  };
}


