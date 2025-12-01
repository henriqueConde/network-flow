'use client';

import { useState, useCallback } from 'react';

/**
 * Hook for managing auth form state (error messages, success messages, etc.)
 */
export function useAuthFormState() {
  const [error, setErrorState] = useState<string | null>(null);
  const [successMessage, setSuccessMessageState] = useState<string | null>(null);

  const setError = useCallback((message: string) => {
    setErrorState(message);
    setSuccessMessageState(null);
  }, []);

  const setSuccessMessage = useCallback((message: string) => {
    setSuccessMessageState(message);
    setErrorState(null);
  }, []);

  const clearMessages = useCallback(() => {
    setErrorState(null);
    setSuccessMessageState(null);
  }, []);

  return {
    error,
    successMessage,
    setError,
    setSuccessMessage,
    clearMessages,
  };
}

