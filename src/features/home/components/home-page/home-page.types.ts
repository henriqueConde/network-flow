export interface HomePageViewProps {
  onSignOut: () => Promise<void>;
  userEmail?: string | null;
}

