import { useState, useEffect } from 'react';

/**
 * UI state hook for interview notes editing.
 * Component-level; no data fetching or I/O.
 */
export function useInterviewNotes(initialNotes: string | null) {
  const [notes, setNotes] = useState(initialNotes || '');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setNotes(initialNotes || '');
  }, [initialNotes]);

  const startEdit = () => {
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setNotes(initialNotes || '');
    setIsEditing(false);
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
  };

  return {
    notes,
    isEditing,
    startEdit,
    cancelEdit,
    handleNotesChange,
  };
}

