'use client';

import { useMediaQuery, useTheme } from '@mui/material';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { DESKTOP_ONLY_CHECK_CONFIG } from './desktop-only-check.config';
import { DesktopOnlyCheckView } from './desktop-only-check.view';

export function DesktopOnlyCheckContainer() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up(DESKTOP_ONLY_CHECK_CONFIG.breakpoint));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isDesktop) {
    return null;
  }

  const portalRoot = typeof document !== 'undefined' ? document.body : null;
  if (!portalRoot) {
    return null;
  }

  return createPortal(
    <DesktopOnlyCheckView config={DESKTOP_ONLY_CHECK_CONFIG} />,
    portalRoot
  );
}

