import { z } from 'zod';
import { conversationChannelSchema, messageSideSchema } from '@/shared/types';

export const CreateConversationFormSchema = z.object({
  contactId: z.string().uuid().optional(),
  contactName: z.string().min(1, 'Contact name is required'),
  contactCompany: z.string().optional(),
  opportunityId: z.string().uuid().optional(),
  channel: conversationChannelSchema,
  pastedText: z.string().min(1, 'Conversation text is required'),
  firstMessageSender: messageSideSchema.default('contact'),
});

export type CreateConversationFormValues = z.infer<typeof CreateConversationFormSchema>;


