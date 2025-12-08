import type { ContactDetail } from '../../../../services/contacts.service';
import type { CONTACT_DETAIL_CONFIG } from '../../contact-detail-page.config';

export type StrategyTrackingCardProps = {
  contact: ContactDetail;
  editValues: {
    warmOrCold: 'warm' | 'cold' | null;
    commonGround: string | null;
    contactType: string | null;
  };
  editErrors: Partial<Record<keyof StrategyTrackingCardProps['editValues'], string>>;
  isEditing: boolean;
  isSaving: boolean;
  config: typeof CONTACT_DETAIL_CONFIG;
  onChangeEditField: (
    field: keyof StrategyTrackingCardProps['editValues'],
    value: string | null,
  ) => void;
};

