import { z } from 'zod';
import { conversationChannelSchema, messageSideSchema } from '@/shared/types';

export const StartConversationFormSchema = z.object({
  channel: conversationChannelSchema,
  pastedText: z.string().min(1, 'Message text is required'),
  firstMessageSender: messageSideSchema.default('contact'),
});

export type CreateConversationFormValues = z.infer<typeof StartConversationFormSchema>;

