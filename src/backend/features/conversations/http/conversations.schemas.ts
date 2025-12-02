import { z } from 'zod';
import { conversationChannelSchema, prioritySchema, messageSideSchema } from '@/shared/types';

export const listConversationsQuery = z.object({
  search: z.string().trim().optional(),
  status: z.enum(['all', 'needs_attention', 'waiting_on_them']).optional().default('all'),
  categoryId: z.string().uuid().optional(),
  stageId: z.string().uuid().optional(),
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

/**
 * Response DTO for creating a conversation.
 */
export const createConversationResponseDto = z.object({
  id: z.string().uuid(),
});

export type CreateConversationResponseDto = z.infer<typeof createConversationResponseDto>;

/**
 * Message DTO for conversation detail.
 */
export const messageDto = z.object({
  id: z.string().uuid(),
  sender: messageSideSchema,
  body: z.string(),
  sentAt: z.string().datetime(),
  source: z.string(),
});

export type MessageDto = z.infer<typeof messageDto>;

/**
 * LinkedIn email event snippet DTO (for out-of-sync hints).
 */
export const linkedInEmailEventDto = z.object({
  id: z.string().uuid(),
  senderName: z.string(),
  snippet: z.string().nullable(),
  emailReceivedAt: z.string().datetime(),
});

export type LinkedInEmailEventDto = z.infer<typeof linkedInEmailEventDto>;

/**
 * Response DTO for conversation detail.
 * Includes full conversation data, messages, and optional email event hint.
 */
export const conversationDetailDto = z.object({
  id: z.string().uuid(),
  contactId: z.string().uuid(),
  contactName: z.string(),
  contactCompany: z.string().nullable(),
  channel: z.string(),
  categoryId: z.string().uuid().nullable(),
  categoryName: z.string().nullable(),
  stageId: z.string().uuid().nullable(),
  stageName: z.string().nullable(),
  nextActionType: z.string().nullable(),
  nextActionDueAt: z.string().datetime().nullable(),
  priority: prioritySchema,
  isOutOfSync: z.boolean(),
  summary: z.string().nullable(),
  notes: z.string().nullable(),
  lastMessageAt: z.string().datetime().nullable(),
  lastMessageSide: messageSideSchema.nullable(),
  messages: z.array(messageDto),
  latestEmailEvent: linkedInEmailEventDto.nullable(),
});

export type ConversationDetailDto = z.infer<typeof conversationDetailDto>;

/**
 * Body schema for updating a conversation.
 */
export const updateConversationBody = z.object({
  categoryId: z.string().uuid().nullable().optional(),
  stageId: z.string().uuid().nullable().optional(),
  nextActionType: z.string().nullable().optional(),
  nextActionDueAt: z.string().datetime().nullable().optional(),
  priority: prioritySchema.optional(),
  notes: z.string().nullable().optional(),
});

export type UpdateConversationBody = z.infer<typeof updateConversationBody>;

/**
 * Body schema for adding a message to a conversation.
 */
export const addMessageBody = z.object({
  body: z.string().min(1, 'Message body is required'),
  sender: messageSideSchema,
  sentAt: z.string().datetime(),
});

export type AddMessageBody = z.infer<typeof addMessageBody>;


