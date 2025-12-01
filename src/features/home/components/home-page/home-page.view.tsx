'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import type { HomePageViewProps } from './home-page.types';
import { styles } from './home-page.styles';

export function HomePageView({ onSignOut, userEmail }: HomePageViewProps) {
  return (
    <Container maxWidth="lg" sx={styles.container()}>
      <Box sx={styles.content()}>
        <Typography variant="h1" sx={styles.title()}>
          Welcome to Your App
        </Typography>
        <Typography variant="body1" sx={styles.subtitle()}>
          {userEmail ? `Logged in as: ${userEmail}` : 'You are logged in'}
        </Typography>
        <Button
          variant="contained"
          onClick={onSignOut}
          sx={styles.button()}
        >
          Sign Out
        </Button>
      </Box>
    </Container>
  );
}

