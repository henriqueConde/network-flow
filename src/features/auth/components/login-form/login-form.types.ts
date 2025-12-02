import type { LoginFormValues } from './login-form.schema';
import type { LOGIN_FORM_CONFIG } from './login-form.config';

export interface LoginFormViewProps {
  config: typeof LOGIN_FORM_CONFIG;
  onSubmit: (values: LoginFormValues) => Promise<void>;
  onGoogleSignIn: () => void;
  isLoading: boolean;
  isGoogleLoading: boolean;
  error: string | null;
}

