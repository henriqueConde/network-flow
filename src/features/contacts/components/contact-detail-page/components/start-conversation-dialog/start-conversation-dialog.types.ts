import type { CreateConversationFormValues } from './start-conversation-dialog.schema';
import type { START_CONVERSATION_DIALOG_CONFIG } from './start-conversation-dialog.config';

export type StartConversationDialogProps = {
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
  contactName: string;
  contactCompany: string | null;
  config: typeof START_CONVERSATION_DIALOG_CONFIG;
};

