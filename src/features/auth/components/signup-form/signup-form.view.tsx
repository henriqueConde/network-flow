'use client';

import { Controller } from 'react-hook-form';
import { TextField, Button, Stack, Alert, Typography, Link, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import type { SignupFormViewProps } from './signup-form.types';
import { styles } from './signup-form.styles';

export function SignupFormView({
  onSubmit,
  onGoogleSignIn,
  isLoading,
  isGoogleLoading,
  error,
  successMessage,
  control,
  handleSubmit,
  errors,
  config,
  routes,
}: SignupFormViewProps) {
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
            <Controller
              name={config.fields.confirmPassword.name}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={config.copy.fields.confirmPassword.label}
                  type={config.fields.confirmPassword.type}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
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
              {isLoading ? config.copy.button.loading : config.copy.button.default}
            </Button>
            {error && (
              <Alert severity={config.ui.alert.error.severity} sx={styles.error()}>
                {error}
              </Alert>
            )}
            {successMessage && (
              <Alert severity={config.ui.alert.success.severity} sx={styles.success()}>
                {successMessage}
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
            <Link href={routes.LOGIN} sx={styles.link()}>
              {config.copy.link.text}
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

