import type { ConversationDetail } from '../../services/conversations.service';
import type { CONVERSATION_DETAIL_CONFIG } from './conversation-detail.config';
import type { EDIT_MESSAGE_DIALOG_CONFIG } from './components/edit-message-dialog/edit-message-dialog.config';
import type { Stage } from '@/features/stages';
import type { Category } from '@/features/categories';
import type { ChatMessage } from './components/ai-assistant-card/ai-assistant-card.types';

export type ConversationDetailViewProps = {
  conversation: ConversationDetail | null;
  isLoading: boolean;
  error: string | null;
  config: typeof CONVERSATION_DETAIL_CONFIG;
  editMessageDialogConfig: typeof EDIT_MESSAGE_DIALOG_CONFIG;
  // Edit form state
  editValues: {
    categoryId: string | null;
    stageId: string | null;
    nextActionType: string | null;
    nextActionDueAt: string | null;
    priority: 'low' | 'medium' | 'high' | null;
    notes: string | null;
    originalUrl: string | null;
    strategyIds: string[];
    responseReceived: boolean;
    responseReceivedAt: string | null;
    emailSentAt: string | null;
    loomVideoUrl: string | null;
    loomSent: boolean;
    emailFollowUpDates: string[];
    emailStatus: 'no_reply' | 'replied' | 'call_scheduled' | 'rejected' | 'in_process' | null;
    followUp1Date: string | null;
    followUp2Date: string | null;
    followUp3Date: string | null;
  };
  editErrors: Partial<Record<keyof ConversationDetailViewProps['editValues'], string>>;
  isEditingMetadata: boolean;
  isEditingNotes: boolean;
  isSaving: boolean;
  // Callbacks
  onBack: () => void;
  onViewContact: (contactId: string) => void;
  onViewOpportunity: (opportunityId: string) => void;
  onToggleAutoFollowups: (enabled: boolean) => void;
  onChangeEditField: (
    field: keyof ConversationDetailViewProps['editValues'],
    value: string | string[] | boolean | null,
  ) => void;
  onSaveMetadata: () => void;
  onSaveNotes: () => void;
  onCancelMetadata: () => void;
  onCancelNotes: () => void;
  onPasteNewMessages: () => void;
  // Add reply dialog
  isAddReplyOpen: boolean;
  addReplyValues: { body: string; sender: 'user' | 'contact'; sentAt: string; contactId?: string };
  addReplyErrors: Partial<Record<'body' | 'sender' | 'sentAt' | 'contactId', string>>;
  isAddingReply: boolean;
  onOpenAddReply: () => void;
  onCloseAddReply: () => void;
  onChangeAddReplyField: (field: 'body' | 'sender' | 'sentAt' | 'contactId', value: string | 'user' | 'contact') => void;
  onSubmitAddReply: () => void;
  // Contact management
  onAddContact?: () => void;
  onRemoveContact?: (contactId: string) => void;
  isAddingContact?: boolean;
  isRemovingContact?: boolean;
  // Add contact dialog
  isAddContactDialogOpen?: boolean;
  onCloseAddContactDialog?: () => void;
  onConfirmAddContact?: (contactId: string) => void;
  availableContactsForAdd?: Array<{ id: string; name: string; company?: string | null }>;
  isLoadingContactsForAdd?: boolean;
  contactSearchInput?: string;
  onContactSearchInputChange?: (value: string) => void;
  availableStages: Stage[];
  availableCategories: Category[];
  // Contact maps for MessagesCard
  contactColorMap: Map<string, string>;
  contactMap: Map<string, { name: string; company: string | null }>;
  // AI Assistant props (passed to Add Reply dialog)
  aiMessages: ChatMessage[];
  isAiLoading: boolean;
  aiError?: string;
  onSendAiMessage: (message: string) => void;
  onClearAiMessages: () => void;
  onUseAiSuggestion: (suggestion: string) => void;
  onConfirmMessage?: (messageId: string) => void;
  onEditMessage?: (messageId: string) => void;
  onDeleteMessage?: (messageId: string) => void;
  // Edit message dialog
  isEditMessageOpen: boolean;
  editMessageValues: { body: string; sentAt: string };
  editMessageErrors: Partial<Record<'body' | 'sentAt', string>>;
  isUpdatingMessage: boolean;
  onCloseEditMessage: () => void;
  onChangeEditMessageField: (field: 'body' | 'sentAt', value: string) => void;
  onSubmitEditMessage: () => void;
};

