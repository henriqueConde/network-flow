import { useState } from 'react';
import { ContactFormSchema } from '../contacts-page.schema';
import type { ContactFormValues } from '../contacts-page.schema';
import type { ContactListItem } from '../../../services/contacts.service';

type SubmitHandler = (values: ContactFormValues, editingContact: ContactListItem | null) => Promise<void> | void;

/**
 * UI state hook for the "Create/Edit Contact" dialog.
 * Owns open/close state, form values, and validation errors.
 */
export function useContactDialog(onSubmit: SubmitHandler) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<ContactListItem | null>(null);
  const [values, setValues] = useState<ContactFormValues>({
    name: '',
    headlineOrRole: '',
    company: '',
    primaryPlatform: '',
    tags: [],
    categoryId: null,
    stageId: null,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({});

  const open = (contact?: ContactListItem) => {
    if (contact) {
      setEditingContact(contact);
      setValues({
        name: contact.name,
        headlineOrRole: contact.headlineOrRole || '',
        company: contact.company || '',
        primaryPlatform: contact.primaryPlatform || '',
        tags: contact.tags || [],
        categoryId: contact.categoryId || null,
        stageId: contact.stageId || null,
      });
    } else {
      setEditingContact(null);
      setValues({
        name: '',
        headlineOrRole: '',
        company: '',
        primaryPlatform: '',
        tags: [],
        categoryId: null,
        stageId: null,
      });
    }
    setErrors({});
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setEditingContact(null);
  };

  const changeField = (
    field: keyof ContactFormValues,
    value: ContactFormValues[keyof ContactFormValues],
  ) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submit = async () => {
    const parsed = ContactFormSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof ContactFormValues, string>> = {};
      parsed.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof ContactFormValues | undefined;
        if (path && !fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    // Capture editingContact at submission time to avoid closure issues
    // Use the current state value, not the closure value
    const currentEditingContact = editingContact;
    await onSubmit(parsed.data, currentEditingContact);
  };

  return {
    isOpen,
    editingContact,
    values,
    errors,
    open,
    close,
    changeField,
    submit,
  };
}

