'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Stack, Alert, Typography, Link, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { LoginFormSchema, type LoginFormValues } from './login-form.schema';
import type { LoginFormViewProps } from './login-form.types';
import { styles } from './login-form.styles';
import { LOGIN_FORM_CONFIG } from './login-form.config';
import { AUTH_ROUTES } from '@/features/auth/constants/auth.constants';

export function LoginFormView({
  onSubmit,
  onGoogleSignIn,
  isLoading,
  isGoogleLoading,
  error,
}: LoginFormViewProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      [LOGIN_FORM_CONFIG.fields.email.name]: '',
      [LOGIN_FORM_CONFIG.fields.password.name]: '',
    },
  });

  return (
    <Box sx={styles.container()}>
      <Box sx={styles.root()}>
        <Box sx={styles.header()}>
          <Typography
            variant={LOGIN_FORM_CONFIG.ui.title.variant}
            component={LOGIN_FORM_CONFIG.ui.title.component}
            sx={styles.title()}
          >
            {LOGIN_FORM_CONFIG.copy.title}
          </Typography>
          <Typography variant={LOGIN_FORM_CONFIG.ui.subtitle.variant} sx={styles.subtitle()}>
            {LOGIN_FORM_CONFIG.copy.subtitle}
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} sx={styles.form()}>
            <Controller
              name={LOGIN_FORM_CONFIG.fields.email.name}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={LOGIN_FORM_CONFIG.copy.fields.email.label}
                  type={LOGIN_FORM_CONFIG.fields.email.type}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  required
                  fullWidth
                  sx={styles.textField()}
                />
              )}
            />
            <Controller
              name={LOGIN_FORM_CONFIG.fields.password.name}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={LOGIN_FORM_CONFIG.copy.fields.password.label}
                  type={LOGIN_FORM_CONFIG.fields.password.type}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  required
                  fullWidth
                  sx={styles.textField()}
                />
              )}
            />
            <Button
              type={LOGIN_FORM_CONFIG.ui.button.type}
              variant={LOGIN_FORM_CONFIG.ui.button.variant}
              disabled={isLoading || isGoogleLoading}
              fullWidth
              sx={styles.button()}
            >
              {isLoading
                ? LOGIN_FORM_CONFIG.copy.button.loading
                : LOGIN_FORM_CONFIG.copy.button.default}
            </Button>
            {error && (
              <Alert severity={LOGIN_FORM_CONFIG.ui.alert.severity} sx={styles.error()}>
                {error}
              </Alert>
            )}
          </Stack>
        </form>
        <Box sx={styles.divider()}>
          <Typography variant="body2" sx={styles.dividerText()}>
            {LOGIN_FORM_CONFIG.copy.divider.text}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          fullWidth
          onClick={onGoogleSignIn}
          disabled={isLoading || isGoogleLoading}
          startIcon={<GoogleIcon />}
          sx={styles.googleButton()}
        >
          {isGoogleLoading
            ? LOGIN_FORM_CONFIG.copy.googleButton.loading
            : LOGIN_FORM_CONFIG.copy.googleButton.default}
        </Button>
        <Box sx={styles.linkContainer()}>
          <Typography variant={LOGIN_FORM_CONFIG.ui.linkText.variant}>
            {LOGIN_FORM_CONFIG.copy.link.prompt}{' '}
            <Link href={AUTH_ROUTES.SIGNUP} sx={styles.link()}>
              {LOGIN_FORM_CONFIG.copy.link.text}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

