export type HttpError = {
  status: number;
  message: string;
  data?: unknown;
};

/**
 * Normalizes axios errors to a consistent shape
 */
export function normalizeHttpError(error: unknown): HttpError {
  if (error && typeof error === 'object' && 'status' in error && 'message' in error) {
    return error as HttpError;
  }

  // Fallback for unexpected error shapes
  return {
    status: 0,
    message: error instanceof Error ? error.message : 'An unexpected error occurred',
    data: error,
  };
}

/**
 * Checks if an error is an authentication error (401, 403)
 */
export function isAuthError(error: HttpError): boolean {
  return error.status === 401 || error.status === 403;
}

/**
 * Gets a user-friendly error message from an HttpError
 */
export function getErrorMessage(error: HttpError | null | undefined): string {
  if (!error) return 'An unexpected error occurred';
  return error.message || `HTTP error! status: ${error.status}`;
}

