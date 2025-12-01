/**
 * Authentication routes used throughout the auth feature.
 */
export const AUTH_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  AUTH: '/auth',
} as const;

/**
 * Gets the current origin URL for redirect purposes.
 */
export const getAuthRedirectOrigin = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return '';
};

