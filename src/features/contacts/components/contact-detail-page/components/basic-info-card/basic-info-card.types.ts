import type { ContactDetail } from '../../../../services/contacts.service';
import type { CONTACT_DETAIL_CONFIG } from '../../contact-detail-page.config';

export type BasicInfoCardProps = {
  contact: ContactDetail;
  editValues: {
    firstName: string;
    lastName: string;
    headlineOrRole: string | null;
    position: string | null;
    company: string | null;
    email: string | null;
  };
  editErrors: Partial<Record<keyof BasicInfoCardProps['editValues'], string>>;
  isEditing: boolean;
  isSaving: boolean;
  config: typeof CONTACT_DETAIL_CONFIG;
  onChangeEditField: (
    field: keyof BasicInfoCardProps['editValues'],
    value: string | null,
  ) => void;
};

