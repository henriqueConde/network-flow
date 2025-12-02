'use client';

import { useAuthContext } from '@/features/auth/context/AuthContext';
import { useAuthRedirect } from './hooks/use-auth-redirect.state';
import { useLoginFormActions } from './hooks/use-login-form-actions.state';
import { useGoogleSignIn } from './hooks/use-google-sign-in.state';
import { LoginFormView } from './login-form.view';
import { LOGIN_FORM_CONFIG } from './login-form.config';

export function LoginFormContainer({ nextPath }: { nextPath?: string }) {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthContext();
  const { handleSubmit, isLoading, error } = useLoginFormActions(nextPath);
  const { handleGoogleSignIn, isGoogleLoading, googleError } = useGoogleSignIn();

  useAuthRedirect(isAuthenticated, nextPath);

  const displayError = error || googleError;

  // Don't render the form if we're still checking auth or if already authenticated
  if (isAuthLoading || isAuthenticated) {
    return null;
  }

  return (
    <LoginFormView
      config={LOGIN_FORM_CONFIG}
      onSubmit={handleSubmit}
      onGoogleSignIn={handleGoogleSignIn}
      isLoading={isLoading}
      isGoogleLoading={isGoogleLoading}
      error={displayError}
    />
  );
}

