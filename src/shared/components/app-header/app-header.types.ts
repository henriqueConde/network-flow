import type { APP_HEADER_CONFIG } from './app-header.config';

export interface AppHeaderViewProps {
  userEmail?: string | null;
  onSignOut: () => Promise<void>;
  config: typeof APP_HEADER_CONFIG;
}




