import type { CreateConversationFormValues } from '../../conversations-inbox.schema';
import type { CREATE_CONVERSATION_DIALOG_CONFIG } from './create-conversation-dialog.config';
import type { ContactListItem } from '@/features/contacts/services/contacts.service';
import type { OpportunityListItem } from '@/features/opportunities/services/opportunities.service';
import type { ContactOption } from './hooks/use-contact-options.state';
import type { Category } from '@/features/categories';
import type { Stage } from '@/features/stages';

export interface CreateConversationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  values: CreateConversationFormValues;
  errors: Partial<Record<keyof CreateConversationFormValues, string>>;
  onChangeField: (
    field: keyof CreateConversationFormValues,
    value: CreateConversationFormValues[keyof CreateConversationFormValues],
  ) => void;
  onSubmit: () => void;
  isCreating: boolean;
  config: typeof CREATE_CONVERSATION_DIALOG_CONFIG;
  contactSearchInput: string;
  onContactSearchChange: (value: string) => void;
  onContactSelect: (contactId: string | null, contactName: string, contactCompany?: string | null) => void;
  contacts: ContactListItem[];
  contactOptions: ContactListItem[];
  allContactOptions: ContactOption[];
  contactSearchInputTrimmed: string;
  onContactScroll: (event: React.UIEvent<HTMLUListElement>) => void;
  isSearchingContacts: boolean;
  opportunitySearchInput: string;
  onOpportunitySearchChange: (value: string) => void;
  onOpportunitySelect: (opportunityId: string | null) => void;
  opportunities: OpportunityListItem[];
  isSearchingOpportunities: boolean;
  availableCategories: Category[];
  availableStages: Stage[];
}

