import type { ChallengeListItem } from '../../services/challenges.service';
import type { CHALLENGES_PAGE_CONFIG } from './challenges-page.config';
import type { ChallengeFormValues } from './challenges-page.schema';

export interface ChallengesPageViewProps {
  challenges: ChallengeListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  search: string;
  active: boolean | null;
  sortBy: 'name' | 'startDate' | 'endDate' | 'updatedAt' | 'createdAt';
  sortDir: 'asc' | 'desc';
  config: typeof CHALLENGES_PAGE_CONFIG;
  onSearchChange: (value: string) => void;
  onActiveChange: (value: boolean | null) => void;
  onPageChange: (page: number) => void;
  onSortChange: (sortBy: 'name' | 'startDate' | 'endDate' | 'updatedAt' | 'createdAt', sortDir: 'asc' | 'desc') => void;
  onRowClick: (challengeId: string) => void;
  // Create/Edit dialog
  isDialogOpen: boolean;
  isEditing: boolean;
  dialogValues: ChallengeFormValues;
  dialogErrors: Partial<Record<keyof ChallengeFormValues, string>>;
  onOpenCreate: () => void;
  onOpenEdit: (challenge: ChallengeListItem) => void;
  onCloseDialog: () => void;
  onChangeDialogField: (field: keyof ChallengeFormValues, value: ChallengeFormValues[keyof ChallengeFormValues]) => void;
  onSubmitDialog: () => void;
  isSubmitting: boolean;
  // Delete dialog
  isDeleteDialogOpen: boolean;
  deleteChallengeName: string;
  onOpenDelete: (challenge: ChallengeListItem) => void;
  onCloseDeleteDialog: () => void;
  onConfirmDelete: () => void;
  isDeleting: boolean;
}




