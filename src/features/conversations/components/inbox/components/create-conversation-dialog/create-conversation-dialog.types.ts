import type { CreateConversationFormValues } from '../../conversations-inbox.schema';

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
}

