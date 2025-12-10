import { z } from 'zod';
import { conversationChannelSchema, messageSideSchema } from '@/shared/types';

export const CreateConversationFormSchema = z.object({
  contactId: z.string().uuid().optional(), // Primary contact (for backwards compat)
  contactIds: z.array(z.string().uuid()).optional(), // All contacts
  contactName: z.string().min(1, 'Contact name is required'),
  contactCompany: z.string().optional(),
  // Opportunity is optional in the UI. When not selected, we send no ID and let
  // the backend either link an existing opportunity or create a new one.
  // We intentionally allow any string here (including empty) so that client-side
  // validation never blocks submit solely because of this field; the backend
  // will still enforce UUID format via its own schema.
  opportunityId: z.string().optional(),
  channel: conversationChannelSchema,
  pastedText: z.string().min(1, 'Conversation text is required'),
  firstMessageSender: messageSideSchema.default('contact'),
  firstMessageContactId: z.string().uuid().optional(), // Which contact sent the first message (if sender is "contact" and multiple contacts exist)
  categoryId: z.string().uuid().optional(),
  stageId: z.string().uuid().optional(),
  challengeId: z.string().uuid().optional(), // Assigns the opportunity that owns the conversation to this challenge
});

export type CreateConversationFormValues = z.infer<typeof CreateConversationFormSchema>;


