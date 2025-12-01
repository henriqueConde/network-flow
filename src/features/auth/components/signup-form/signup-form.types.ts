import type { SignupFormValues } from './signup-form.schema';
import type { Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import type { AUTH_ROUTES } from '@/features/auth/constants/auth.constants';
import type { SIGNUP_FORM_CONFIG } from './signup-form.config';

export interface SignupFormViewProps {
  onSubmit: (values: SignupFormValues) => Promise<void>;
  onGoogleSignIn: () => void;
  isLoading: boolean;
  isGoogleLoading: boolean;
  error: string | null;
  successMessage: string | null;
  control: Control<SignupFormValues>;
  handleSubmit: UseFormHandleSubmit<SignupFormValues>;
  errors: FieldErrors<SignupFormValues>;
  config: typeof SIGNUP_FORM_CONFIG;
  routes: typeof AUTH_ROUTES;
}

