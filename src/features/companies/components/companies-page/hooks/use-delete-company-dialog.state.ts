import { useState } from 'react';

/**
 * UI state hook for the delete company confirmation dialog.
 */
export function useDeleteCompanyDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string>('');

  const open = (id: string, name: string) => {
    setCompanyId(id);
    setCompanyName(name);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setCompanyId(null);
    setCompanyName('');
  };

  return {
    isOpen,
    companyId,
    companyName,
    open,
    close,
  };
}



