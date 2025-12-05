import type { ContactDetail } from '../../../../services/contacts.service';
import type { CONTACT_DETAIL_CONFIG } from '../../contact-detail-page.config';
import type { Category } from '@/features/categories';
import type { Stage } from '@/features/stages';

export type ContactDetailContentProps = {
  contact: ContactDetail;
  editValues: {
    firstName: string;
    lastName: string;
    headlineOrRole: string | null;
    position: string | null;
    company: string | null;
    email: string | null;
    linkedinUrl: string | null;
    connectedOn: string | null;
    primaryPlatform: string | null;
    tags: string[];
    categoryId: string | null;
    stageId: string | null;
  };
  editErrors: Partial<Record<keyof ContactDetailContentProps['editValues'], string>>;
  isEditing: boolean;
  isSaving: boolean;
  availableCategories: Category[];
  availableStages: Stage[];
  config: typeof CONTACT_DETAIL_CONFIG;
  onChangeEditField: (
    field: keyof ContactDetailContentProps['editValues'],
    value: string | string[] | null,
  ) => void;
  onGoToConversation: (conversationId: string) => void;
  onStartConversation: () => void;
};

