import type { ContactDetail } from '../../../../services/contacts.service';
import type { CONTACT_DETAIL_CONFIG } from '../../contact-detail-page.config';
import type { Category } from '@/features/categories';
import type { Stage } from '@/features/stages';

export type AdditionalInfoCardProps = {
  contact: ContactDetail;
  editValues: {
    primaryPlatform: string | null;
    tags: string[];
  };
  editErrors: Partial<Record<keyof AdditionalInfoCardProps['editValues'], string>>;
  isEditing: boolean;
  isSaving: boolean;
  availableCategories: Category[];
  availableStages: Stage[];
  config: typeof CONTACT_DETAIL_CONFIG;
  onChangeEditField: (
    field: keyof AdditionalInfoCardProps['editValues'],
    value: string | string[] | null,
  ) => void;
};

