import type { ContactDetail } from '../../../../services/contacts.service';
import type { CONTACT_DETAIL_CONFIG } from '../../contact-detail-page.config';

export type ConnectionLifecycleCardProps = {
  contact: ContactDetail;
  editValues: {
    connectionStatus: 'not_connected' | 'request_sent' | 'connected' | null;
    connectionRequestSentAt: string | null;
    connectionAcceptedAt: string | null;
    dmSentAt: string | null;
    firstMessageDate: string | null;
    lastFollowUpAt: string | null;
  };
  editErrors: Partial<Record<keyof ConnectionLifecycleCardProps['editValues'], string>>;
  isEditing: boolean;
  isSaving: boolean;
  config: typeof CONTACT_DETAIL_CONFIG;
  onChangeEditField: (
    field: keyof ConnectionLifecycleCardProps['editValues'],
    value: string | null,
  ) => void;
};

