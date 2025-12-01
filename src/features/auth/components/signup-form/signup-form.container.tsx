'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthContext } from '@/features/auth/context/AuthContext';
import { useAuthRedirect } from '../login-form/hooks/use-auth-redirect.state';
import { useSignupFormActions } from './hooks/use-signup-form-actions.state';
import { useSignInWithGoogleMutation } from '@/features/auth/services/auth.mutations';
import { SignupFormSchema, type SignupFormValues } from './signup-form.schema';
import { SIGNUP_FORM_CONFIG } from './signup-form.config';
import { AUTH_ROUTES } from '@/features/auth/constants/auth.constants';
import { SignupFormView } from './signup-form.view';

export function SignupFormContainer({ nextPath }: { nextPath?: string }) {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuthContext();
  const {
    handleSubmit: handleFormSubmit,
    isLoading,
    error,
    successMessage,
  } = useSignupFormActions(nextPath);
  const googleSignInMutation = useSignInWithGoogleMutation();

  const {
    control,
    handleSubmit: formHandleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useAuthRedirect(isAuthenticated, nextPath);

  const handleGoogleSignIn = () => {
    googleSignInMutation.mutate(undefined);
  };

  // Don't render the form if we're still checking auth or if already authenticated
  if (isAuthLoading || isAuthenticated) {
    return null;
  }

  return (
    <SignupFormView
      onSubmit={handleFormSubmit}
      onGoogleSignIn={handleGoogleSignIn}
      isLoading={isLoading}
      isGoogleLoading={googleSignInMutation.isPending}
      error={error}
      successMessage={successMessage}
      control={control}
      handleSubmit={formHandleSubmit}
      errors={errors}
      config={SIGNUP_FORM_CONFIG}
      routes={AUTH_ROUTES}
    />
  );
}

