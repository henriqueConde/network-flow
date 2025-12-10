import type { ChallengeDetail } from '../../services/challenges.service';
import type { CHALLENGE_DETAIL_CONFIG } from './challenge-detail-page.config';

export type ChallengeDetailViewProps = {
  challenge: ChallengeDetail | null;
  isLoading: boolean;
  error: string | null;
  config: typeof CHALLENGE_DETAIL_CONFIG;
  // Edit form state
  editValues: {
    name: string;
    startDate: string;
    endDate: string;
    goal: number;
    outreachesPerDay: number | null;
    outreachesCount: number;
    acceptsCount: number;
    repliesCount: number;
    callsCount: number;
    interviewsCount: number;
    notes: string;
  };
  editErrors: Partial<Record<keyof ChallengeDetailViewProps['editValues'], string>>;
  isEditing: boolean;
  isSaving: boolean;
  // Callbacks
  onBack: () => void;
  onStartEdit: () => void;
  onChangeEditField: (
    field: keyof ChallengeDetailViewProps['editValues'],
    value: string | number | null,
  ) => void;
  onSave: () => void;
  onCancel: () => void;
};

