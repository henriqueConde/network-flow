'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import type { AppHeaderViewProps } from './app-header.types';
import { styles } from './app-header.styles';

export function AppHeaderView({ userEmail, onSignOut, config }: AppHeaderViewProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <AppBar position="sticky" sx={styles.appBar()}>
      <Toolbar sx={styles.toolbar()}>
        <Typography component={Link} href="/" sx={styles.title()}>
          {config.copy.title}
        </Typography>
        <Box sx={styles.navLinks()}>
          <Link
            href={config.routes.today}
            style={{ textDecoration: 'none' }}
            className={isActive(config.routes.today) ? 'active' : ''}
          >
            <Typography
              component="span"
              sx={[
                styles.navLink(),
                isActive(config.routes.today) && styles.navLinkActive(),
              ]}
            >
              {config.copy.navigation.today}
            </Typography>
          </Link>
          <Link
            href={config.routes.conversations}
            style={{ textDecoration: 'none' }}
            className={isActive(config.routes.conversations) ? 'active' : ''}
          >
            <Typography
              component="span"
              sx={[
                styles.navLink(),
                isActive(config.routes.conversations) && styles.navLinkActive(),
              ]}
            >
              {config.copy.navigation.conversations}
            </Typography>
          </Link>
          <Link
            href={config.routes.interviews}
            style={{ textDecoration: 'none' }}
            className={isActive(config.routes.interviews) ? 'active' : ''}
          >
            <Typography
              component="span"
              sx={[
                styles.navLink(),
                isActive(config.routes.interviews) && styles.navLinkActive(),
              ]}
            >
              {config.copy.navigation.interviews}
            </Typography>
          </Link>
          <Link
            href={config.routes.opportunities}
            style={{ textDecoration: 'none' }}
            className={isActive(config.routes.opportunities) ? 'active' : ''}
          >
            <Typography
              component="span"
              sx={[
                styles.navLink(),
                isActive(config.routes.opportunities) && styles.navLinkActive(),
              ]}
            >
              {config.copy.navigation.opportunities}
            </Typography>
          </Link>
          <Link
            href={config.routes.pipeline}
            style={{ textDecoration: 'none' }}
            className={isActive(config.routes.pipeline) ? 'active' : ''}
          >
            <Typography
              component="span"
              sx={[
                styles.navLink(),
                isActive(config.routes.pipeline) && styles.navLinkActive(),
              ]}
            >
              {config.copy.navigation.pipeline}
            </Typography>
          </Link>
          <Link
            href={config.routes.followups}
            style={{ textDecoration: 'none' }}
            className={isActive(config.routes.followups) ? 'active' : ''}
          >
            <Typography
              component="span"
              sx={[
                styles.navLink(),
                isActive(config.routes.followups) && styles.navLinkActive(),
              ]}
            >
              {config.copy.navigation.followups}
            </Typography>
          </Link>
          <Link
            href={config.routes.contacts}
            style={{ textDecoration: 'none' }}
            className={isActive(config.routes.contacts) ? 'active' : ''}
          >
            <Typography
              component="span"
              sx={[
                styles.navLink(),
                isActive(config.routes.contacts) && styles.navLinkActive(),
              ]}
            >
              {config.copy.navigation.contacts}
            </Typography>
          </Link>
          <Link
            href={config.routes.strategies}
            style={{ textDecoration: 'none' }}
            className={isActive(config.routes.strategies) ? 'active' : ''}
          >
            <Typography
              component="span"
              sx={[
                styles.navLink(),
                isActive(config.routes.strategies) && styles.navLinkActive(),
              ]}
            >
              {config.copy.navigation.strategies}
            </Typography>
          </Link>
          <Link
            href={config.routes.analytics}
            style={{ textDecoration: 'none' }}
            className={isActive(config.routes.analytics) ? 'active' : ''}
          >
            <Typography
              component="span"
              sx={[
                styles.navLink(),
                isActive(config.routes.analytics) && styles.navLinkActive(),
              ]}
            >
              {config.copy.navigation.analytics}
            </Typography>
          </Link>
        </Box>
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
