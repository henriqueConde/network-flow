import type { DELETE_MESSAGE_DIALOG_CONFIG } from './delete-message-dialog.config';

export type DeleteMessageDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  config: typeof DELETE_MESSAGE_DIALOG_CONFIG;
};

