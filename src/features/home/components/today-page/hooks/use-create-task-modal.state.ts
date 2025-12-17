import { useState, useCallback } from 'react';

interface UseCreateTaskModalProps {
  onCreate: (task: {
    title: string;
    description?: string;
    dueAt?: string;
    priority?: 'low' | 'medium' | 'high';
  }) => Promise<void>;
  isCreating: boolean;
}

export function useCreateTaskModal({ onCreate, isCreating }: UseCreateTaskModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = useCallback(() => {
    setError(null);
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    if (!isCreating) {
      setIsOpen(false);
      setError(null);
    }
  }, [isCreating]);

  const handleCreate = useCallback(async (task: {
    title: string;
    description?: string;
    dueAt?: string;
    priority?: 'low' | 'medium' | 'high';
  }) => {
    try {
      await onCreate(task);
      setIsOpen(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
    }
  }, [onCreate]);

  return {
    isOpen,
    error,
    onOpen: handleOpen,
    onClose: handleClose,
    onCreate: handleCreate,
    isCreating,
  };
}


