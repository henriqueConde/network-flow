/**
 * Configuration and copy text for the signup form component.
 */
export const SIGNUP_FORM_CONFIG = {
  copy: {
    title: 'Create Account',
    subtitle: 'Sign up to get started',
    fields: {
      email: {
        label: 'Email',
      },
      password: {
        label: 'Password',
      },
      confirmPassword: {
        label: 'Confirm password',
      },
    },
    button: {
      loading: 'Creating account...',
      default: 'Sign up',
    },
    googleButton: {
      default: 'Continue with Google',
      loading: 'Redirecting...',
    },
    divider: {
      text: 'or',
    },
    link: {
      prompt: 'Already have an account?',
      text: 'Log in',
    },
  },
  fields: {
    email: {
      name: 'email' as const,
      type: 'email' as const,
    },
    password: {
      name: 'password' as const,
      type: 'password' as const,
    },
    confirmPassword: {
      name: 'confirmPassword' as const,
      type: 'password' as const,
    },
  },
  ui: {
    title: {
      variant: 'h1' as const,
      component: 'h1' as const,
    },
    subtitle: {
      variant: 'body1' as const,
    },
    linkText: {
      variant: 'body2' as const,
    },
    button: {
      type: 'submit' as const,
      variant: 'contained' as const,
    },
    alert: {
      error: {
        severity: 'error' as const,
      },
      success: {
        severity: 'success' as const,
      },
    },
  },
  messages: {
    error: {
      signupFailed: 'Signup failed',
      userAlreadyExists: 'User already exists',
    },
    success: {
      signupSuccess: 'Account created. Redirecting…',
    },
  },
} as const;

