import { useState } from 'react';

/**
 * UI state hook for the delete contact confirmation dialog.
 */
export function useDeleteContactDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [contactId, setContactId] = useState<string | null>(null);
  const [contactName, setContactName] = useState<string>('');

  const open = (id: string, name: string) => {
    setContactId(id);
    setContactName(name);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setContactId(null);
    setContactName('');
  };

  return {
    isOpen,
    contactId,
    contactName,
    open,
    close,
  };
}


