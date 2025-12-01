'use client';

import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import type { AppHeaderViewProps } from './app-header.types';
import { styles } from './app-header.styles';

export function AppHeaderView({ userEmail, onSignOut, config }: AppHeaderViewProps) {
  return (
    <AppBar position="sticky" sx={styles.appBar()}>
      <Toolbar sx={styles.toolbar()}>
        <Typography component={Link} href="/" sx={styles.title()}>
          {config.copy.title}
        </Typography>
        <Box sx={styles.rightSection()}>
          {userEmail && (
            <Typography sx={styles.userEmail()} component="span">
              {userEmail}
            </Typography>
          )}
          <Button
            variant="outlined"
            onClick={onSignOut}
            startIcon={<LogoutIcon />}
            sx={styles.signOutButton()}
          >
            {config.copy.signOut}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
