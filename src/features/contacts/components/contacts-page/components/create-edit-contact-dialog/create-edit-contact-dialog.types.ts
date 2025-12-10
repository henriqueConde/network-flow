import type { CONTACTS_PAGE_CONFIG } from '../../contacts-page.config';
import type { Category } from '@/features/categories';
import type { Stage } from '@/features/stages';
import type { ContactFormValues } from '../../contacts-page.schema';

export type CreateEditContactDialogProps = {
  isOpen: boolean;
  isEditing: boolean;
  values: ContactFormValues;
  errors: Partial<Record<keyof ContactFormValues, string>>;
  isSubmitting: boolean;
  availableCategories: Category[];
  availableStages: Stage[];
  config: typeof CONTACTS_PAGE_CONFIG;
  onClose: () => void;
  onChangeField: (field: keyof ContactFormValues, value: ContactFormValues[keyof ContactFormValues]) => void;
  onSubmit: () => void;
};


