export type EditMessageDialogProps = {
  isOpen: boolean;
  values: { body: string; sentAt: string };
  errors: Partial<Record<'body' | 'sentAt', string>>;
  isUpdating: boolean;
  config: typeof import('./edit-message-dialog.config').EDIT_MESSAGE_DIALOG_CONFIG;
  onClose: () => void;
  onChangeField: (field: 'body' | 'sentAt', value: string) => void;
  onSubmit: () => void;
};

