import { useState, useCallback, useEffect } from 'react';

interface UseEditGoalModalProps {
  initialGoal: number;
  onSave: (goal: number) => Promise<void>;
  isSaving: boolean;
}

export function useEditGoalModal({ initialGoal, onSave, isSaving }: UseEditGoalModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [goal, setGoal] = useState(initialGoal);
  const [error, setError] = useState<string | null>(null);

  // Update goal when initialGoal changes (e.g., after successful save)
  useEffect(() => {
    if (!isOpen) {
      setGoal(initialGoal);
    }
  }, [initialGoal, isOpen]);

  const handleOpen = useCallback(() => {
    setGoal(initialGoal);
    setError(null);
    setIsOpen(true);
  }, [initialGoal]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setError(null);
    setGoal(initialGoal);
  }, [initialGoal]);

  const handleChangeGoal = useCallback((newGoal: number) => {
    setGoal(newGoal);
    setError(null);
  }, []);

  const handleSave = useCallback(async () => {
    if (goal < 1 || goal > 1000) {
      setError('Goal must be between 1 and 1000');
      return;
    }

    try {
      await onSave(goal);
      setIsOpen(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save goal');
    }
  }, [goal, onSave]);

  return {
    isOpen,
    goal,
    error,
    onOpen: handleOpen,
    onClose: handleClose,
    onChangeGoal: handleChangeGoal,
    onSave: handleSave,
    isSaving,
  };
}

