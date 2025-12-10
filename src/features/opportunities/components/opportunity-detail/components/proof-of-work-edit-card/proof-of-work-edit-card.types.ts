import type { OpportunityDetail } from '../../../../services/opportunities.service';
import type { Category } from '@/features/categories';
import type { Stage } from '@/features/stages';

export type ProofOfWorkEditCardProps = {
  opportunity: OpportunityDetail;
  editValues: {
    strategyIds: string[];
    proofOfWorkType: 'proof_of_work_bugs' | 'proof_of_work_build' | 'other' | null;
    issuesFound: any;
    projectDetails: string | null;
    loomVideoUrl: string | null;
    githubRepoUrl: string | null;
    liveDemoUrl: string | null;
    sharedChannels: string[];
    teamResponses: any;
  };
  editErrors: Partial<Record<keyof ProofOfWorkEditCardProps['editValues'], string>>;
  isEditing: boolean;
  isSaving: boolean;
  availableCategories: Category[];
  availableStages: Stage[];
  onChangeEditField: (
    field: keyof ProofOfWorkEditCardProps['editValues'],
    value: string | string[] | any | null,
  ) => void;
  onSave: () => void;
  onCancel: () => void;
};


