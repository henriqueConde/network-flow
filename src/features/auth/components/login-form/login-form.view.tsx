'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Stack, Alert, Typography, Link, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { LoginFormSchema, type LoginFormValues } from './login-form.schema';
import type { LoginFormViewProps } from './login-form.types';
import { styles } from './login-form.styles';
import { AUTH_ROUTES } from '@/features/auth/constants/auth.constants';

export function LoginFormView({
  config,
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
      [config.fields.email.name]: '',
      [config.fields.password.name]: '',
    },
  });

  return (
    <Box sx={styles.container()}>
      <Box sx={styles.root()}>
        <Box sx={styles.header()}>
          <Typography
            variant={config.ui.title.variant}
            component={config.ui.title.component}
            sx={styles.title()}
          >
            {config.copy.title}
          </Typography>
          <Typography variant={config.ui.subtitle.variant} sx={styles.subtitle()}>
            {config.copy.subtitle}
          </Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} sx={styles.form()}>
            <Controller
              name={config.fields.email.name}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={config.copy.fields.email.label}
                  type={config.fields.email.type}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  required
                  fullWidth
                  sx={styles.textField()}
                />
              )}
            />
            <Controller
              name={config.fields.password.name}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={config.copy.fields.password.label}
                  type={config.fields.password.type}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  required
                  fullWidth
                  sx={styles.textField()}
                />
              )}
            />
            <Button
              type={config.ui.button.type}
              variant={config.ui.button.variant}
              disabled={isLoading || isGoogleLoading}
              fullWidth
              sx={styles.button()}
            >
              {isLoading
                ? config.copy.button.loading
                : config.copy.button.default}
            </Button>
            {error && (
              <Alert severity={config.ui.alert.severity} sx={styles.error()}>
                {error}
              </Alert>
            )}
          </Stack>
        </form>
        <Box sx={styles.divider()}>
          <Typography variant="body2" sx={styles.dividerText()}>
            {config.copy.divider.text}
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
            ? config.copy.googleButton.loading
            : config.copy.googleButton.default}
        </Button>
        <Box sx={styles.linkContainer()}>
          <Typography variant={config.ui.linkText.variant}>
            {config.copy.link.prompt}{' '}
            <Link href={AUTH_ROUTES.SIGNUP} sx={styles.link()}>
              {config.copy.link.text}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

