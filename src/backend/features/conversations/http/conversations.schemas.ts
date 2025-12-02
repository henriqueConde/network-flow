import { z } from 'zod';
import { conversationChannelSchema, prioritySchema, messageSideSchema } from '@/shared/types';

export const listConversationsQuery = z.object({
  search: z.string().trim().optional(),
  status: z.enum(['all', 'needs_attention', 'waiting_on_them']).optional().default('all'),
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(100).default(20),
  sortBy: z
    .enum(['updatedAt', 'lastMessageAt', 'priority'])
    .optional()
    .default('updatedAt'),
  sortDir: z.enum(['asc', 'desc']).optional().default('desc'),
});

export type ListConversationsQuery = z.infer<typeof listConversationsQuery>;

/**
 * Response DTO for a single conversation row in the Inbox.
 * This is intentionally flattened for UI consumption.
 */
export const conversationInboxItemDto = z.object({
  id: z.string().uuid(),
  contactName: z.string(),
  contactCompany: z.string().nullable(),
  channel: z.string(),
  category: z.string().nullable(),
  stage: z.string().nullable(),
  lastMessageAt: z.string().datetime().nullable(),
  lastMessageSnippet: z.string().nullable(),
  lastMessageSide: messageSideSchema.nullable(),
  priority: prioritySchema,
  isOutOfSync: z.boolean(),
  needsAttention: z.boolean(),
});

export type ConversationInboxItemDto = z.infer<typeof conversationInboxItemDto>;

export const conversationInboxListDto = z.array(conversationInboxItemDto);

/**
 * Body schema for creating a new conversation from the Inbox.
 * Conversation creation is manual: user specifies contact + channel + pasted text.
 */
export const createConversationBody = z.object({
  // Either use an existing contact or create a new one
  contactId: z.string().uuid().optional(),
  contactName: z.string().min(1, 'Contact name is required'),
  contactCompany: z.string().optional(),
  channel: conversationChannelSchema.default('linkedin'),

  // Raw pasted conversation text; for v1 we store it as a single message
  pastedText: z.string().min(1, 'Conversation text is required'),

  // Optional initial classification
  categoryId: z.string().uuid().optional(),
  stageId: z.string().uuid().optional(),
  priority: prioritySchema.optional().default('medium'),
});

export type CreateConversationBody = z.infer<typeof createConversationBody>;


