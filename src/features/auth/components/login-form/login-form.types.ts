import type { LoginFormValues } from './login-form.schema';

export interface LoginFormViewProps {
  onSubmit: (values: LoginFormValues) => Promise<void>;
  onGoogleSignIn: () => void;
  isLoading: boolean;
  isGoogleLoading: boolean;
  error: string | null;
}

