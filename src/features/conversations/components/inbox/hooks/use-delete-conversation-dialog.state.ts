import { useState } from 'react';

/**
 * UI state hook for the "Delete Conversation" confirmation dialog.
 * Owns open/close state and the conversation ID/name to delete.
 */
export function useDeleteConversationDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [contactName, setContactName] = useState<string>('');

  const open = (id: string, name: string) => {
    setConversationId(id);
    setContactName(name);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setConversationId(null);
    setContactName('');
  };

  return {
    isOpen,
    conversationId,
    contactName,
    open,
    close,
  };
}





