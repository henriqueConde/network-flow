/**
 * Configuration and copy text for the login form component.
 */
export const LOGIN_FORM_CONFIG = {
  copy: {
    title: 'Welcome Back',
    subtitle: 'Sign in to your account',
    fields: {
      email: {
        label: 'Email',
      },
      password: {
        label: 'Password',
      },
    },
    button: {
      loading: 'Logging in...',
      default: 'Log in',
    },
    googleButton: {
      default: 'Continue with Google',
      loading: 'Redirecting...',
    },
    divider: {
      text: 'or',
    },
    link: {
      prompt: "Don't have an account?",
      text: 'Sign up',
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
      severity: 'error' as const,
    },
  },
  messages: {
    error: {
      loginFailed: 'Login failed',
      authenticationFailed: 'Authentication failed. Please try again.',
      genericError: 'Error:',
    },
  },
} as const;

