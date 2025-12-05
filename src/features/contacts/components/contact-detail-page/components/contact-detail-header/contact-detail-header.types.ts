import type { CONTACT_DETAIL_CONFIG } from '../../contact-detail-page.config';

export type ContactDetailHeaderProps = {
  contactName: string;
  contactCompany: string | null;
  isEditing: boolean;
  isSaving: boolean;
  editValues: {
    name: string;
    company: string | null;
  };
  editErrors: {
    name?: string;
    company?: string;
  };
  config: typeof CONTACT_DETAIL_CONFIG;
  onBack: () => void;
  onStartEdit: () => void;
  onChangeEditField: (field: 'name' | 'company', value: string | null) => void;
  onSave: () => void;
  onCancel: () => void;
};

