import type { ContactDetail } from '../../../../services/contacts.service';
import type { CONTACT_DETAIL_CONFIG } from '../../contact-detail-page.config';

export type ReferralTrackingCardProps = {
  contact: ContactDetail;
  editValues: {
    referralGiven: boolean;
    referralGivenAt: string | null;
    referralDetails: string | null;
  };
  editErrors: Partial<Record<keyof ReferralTrackingCardProps['editValues'], string>>;
  isEditing: boolean;
  isSaving: boolean;
  config: typeof CONTACT_DETAIL_CONFIG;
  onChangeEditField: (
    field: keyof ReferralTrackingCardProps['editValues'],
    value: string | boolean | null,
  ) => void;
};

