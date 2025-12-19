import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'today-completed-actions';
const STORAGE_DATE_KEY = 'today-completed-actions-date';

/**
 * Hook to manage completion state for non-task actions.
 * Uses localStorage to persist completion state across page refreshes.
 * Clears completed actions at the start of a new day.
 */
export function useCompletedActions() {
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());

  // Load completed actions from localStorage on mount
  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem(STORAGE_DATE_KEY);
    
    // Clear if it's a new day
    if (storedDate !== today) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(STORAGE_DATE_KEY, today);
      setCompletedActions(new Set());
      return;
    }

    // Load completed actions
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const actionIds = JSON.parse(stored) as string[];
        setCompletedActions(new Set(actionIds));
      } catch (e) {
        // Invalid data, clear it
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save to localStorage whenever completedActions changes
  useEffect(() => {
    if (completedActions.size > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(completedActions)));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [completedActions]);

  const markCompleted = useCallback((actionId: string) => {
    setCompletedActions((prev) => new Set([...prev, actionId]));
  }, []);

  const markIncomplete = useCallback((actionId: string) => {
    setCompletedActions((prev) => {
      const next = new Set(prev);
      next.delete(actionId);
      return next;
    });
  }, []);

  const removeAction = useCallback((actionId: string) => {
    setCompletedActions((prev) => {
      const next = new Set(prev);
      next.delete(actionId);
      return next;
    });
  }, []);

  const isCompleted = useCallback((actionId: string) => {
    return completedActions.has(actionId);
  }, [completedActions]);

  return {
    isCompleted,
    markCompleted,
    markIncomplete,
    removeAction,
  };
}



