import type { ContactDetail } from '../../../../services/contacts.service';
import type { CONTACT_DETAIL_CONFIG } from '../../contact-detail-page.config';

export type LinkedInInfoCardProps = {
    contact: ContactDetail;
    editValues: {
        linkedinUrl: string | null;
        connectedOn: string | null;
    };
    editErrors: Partial<Record<keyof LinkedInInfoCardProps['editValues'], string>>;
    isEditing: boolean;
    isSaving: boolean;
    config: typeof CONTACT_DETAIL_CONFIG;
    onChangeEditField: (
        field: keyof LinkedInInfoCardProps['editValues'],
        value: string | null,
    ) => void;
};

