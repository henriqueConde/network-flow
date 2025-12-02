import type { Stage } from '@/features/stages';
import type { Category } from '@/features/categories';
import type { CONVERSATION_DETAIL_CONFIG } from '../conversation-detail.config';

export type MetadataCardProps = {
  editValues: {
    categoryId: string | null;
    stageId: string | null;
    nextActionType: string | null;
    nextActionDueAt: string | null;
    priority: 'low' | 'medium' | 'high' | null;
  };
  editErrors: Partial<Record<keyof MetadataCardProps['editValues'], string>>;
  isEditing: boolean;
  isSaving: boolean;
  availableStages: Stage[];
  availableCategories: Category[];
  config: typeof CONVERSATION_DETAIL_CONFIG;
  onChangeEditField: (
    field: keyof MetadataCardProps['editValues'],
    value: string | null,
  ) => void;
  onSave: () => void;
  onCancel: () => void;
};



