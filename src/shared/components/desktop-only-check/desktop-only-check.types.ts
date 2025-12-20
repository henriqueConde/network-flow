import type { DESKTOP_ONLY_CHECK_CONFIG } from './desktop-only-check.config';

export type DesktopOnlyCheckConfig = typeof DESKTOP_ONLY_CHECK_CONFIG;

export interface DesktopOnlyCheckViewProps {
  config: DesktopOnlyCheckConfig;
}

