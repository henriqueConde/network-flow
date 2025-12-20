export const DESKTOP_ONLY_CHECK_CONFIG = {
  copy: {
    title: 'Desktop Required',
    message: 'At the moment, this application works only on desktop. The mobile version is under construction.',
  },
  breakpoint: 'md' as const, // 960px - MUI default md breakpoint
} as const;

