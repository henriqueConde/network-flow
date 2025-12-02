import { z } from 'zod';
import { conversationChannelSchema } from '@/shared/types';

export const CreateConversationFormSchema = z.object({
  contactName: z.string().min(1, 'Contact name is required'),
  contactCompany: z.string().optional(),
  channel: conversationChannelSchema,
  pastedText: z.string().min(1, 'Conversation text is required'),
});

export type CreateConversationFormValues = z.infer<typeof CreateConversationFormSchema>;


