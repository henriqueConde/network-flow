import type { ContactDetail } from '../../services/contacts.service';
import type { CONTACT_DETAIL_CONFIG } from './contact-detail-page.config';
import type { Category } from '@/features/categories';
import type { Stage } from '@/features/stages';

export type ContactDetailViewProps = {
  contact: ContactDetail | null;
  isLoading: boolean;
  error: string | null;
  config: typeof CONTACT_DETAIL_CONFIG;
  availableCategories: Category[];
  availableStages: Stage[];
  // Edit form state
  editValues: {
    name: string;
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
  editErrors: Partial<Record<keyof ContactDetailViewProps['editValues'], string>>;
  isEditing: boolean;
  isSaving: boolean;
  // Callbacks
  onBack: () => void;
  onStartEdit: () => void;
  onChangeEditField: (
    field: keyof ContactDetailViewProps['editValues'],
    value: string | string[] | null,
  ) => void;
  onSave: () => void;
  onCancel: () => void;
  onGoToConversation: (conversationId: string) => void;
  onStartConversation: () => void;
};

