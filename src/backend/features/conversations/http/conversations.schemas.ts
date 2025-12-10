import { z } from 'zod';
import { conversationChannelSchema, prioritySchema, messageSideSchema } from '@/shared/types';

export const listConversationsQuery = z.object({
  search: z.string().trim().optional(),
  status: z.enum(['all', 'needs_attention', 'waiting_on_them']).optional().default('all'),
  categoryId: z.string().uuid().optional(),
  stageId: z.string().uuid().optional(),
  emailStatus: z.enum(['no_reply', 'replied', 'call_scheduled', 'rejected', 'in_process']).optional(),
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
  contactName: z.string(), // Primary contact name (backwards compat)
  contactCompany: z.string().nullable(),
  contactCount: z.number().int().min(1).default(1), // New field
  channel: z.string(),
  category: z.string().nullable(),
  stage: z.string().nullable(),
  lastMessageAt: z.string().datetime().nullable(),
  lastMessageSnippet: z.string().nullable(),
  lastMessageSide: messageSideSchema.nullable(),
  priority: prioritySchema.nullable(),
  isOutOfSync: z.boolean(),
  needsAttention: z.boolean(),
  warmOrCold: z.enum(['warm', 'cold']).nullable(),
  challengeId: z.string().uuid().nullable(),
  challengeName: z.string().nullable(),
});

export type ConversationInboxItemDto = z.infer<typeof conversationInboxItemDto>;

export const conversationInboxListDto = z.array(conversationInboxItemDto);

/**
 * Body schema for creating a new conversation from the Inbox.
 * Conversation creation is manual: user specifies contact + channel + pasted text.
 */
export const createConversationBody = z.object({
  // Either use an existing contact or create a new one
  contactId: z.string().uuid().optional(), // Primary contact
  contactIds: z.array(z.string().uuid()).optional(), // All contacts (if multiple)
  contactName: z.string().min(1, 'Contact name is required'),
  contactCompany: z.string().optional(),
  channel: conversationChannelSchema.default('linkedin'),

  // Optional: link to an existing opportunity
  opportunityId: z.string().uuid().optional(),

  // Optional: link to a challenge
  challengeId: z.string().uuid().optional(),

  // Raw pasted conversation text; for v1 we store it as a single message
  pastedText: z.string().min(1, 'Conversation text is required'),

  // Optional initial classification
  categoryId: z.string().uuid().optional(),
  stageId: z.string().uuid().optional(),
  priority: prioritySchema.optional().default('medium'),
  firstMessageSender: messageSideSchema.optional().default('contact'),
  firstMessageContactId: z.string().uuid().optional(), // Which contact sent the first message (if sender is "contact" and multiple contacts exist)
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
  status: z.enum(['pending', 'confirmed']),
  contactId: z.string().uuid().nullable(),
  contactName: z.string().nullable(), // Included for convenience
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
  // Keep for backwards compatibility
  contactId: z.string().uuid(),
  contactName: z.string(),
  contactCompany: z.string().nullable(),
  // New fields
  contacts: z.array(z.object({
    id: z.string().uuid(),
    name: z.string(),
    company: z.string().nullable(),
  })),
  opportunityId: z.string().uuid().nullable(),
  opportunityTitle: z.string().nullable(),
  challengeId: z.string().uuid().nullable(),
  challengeName: z.string().nullable(),
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
  originalUrl: z.string().url().nullable(),
  lastMessageAt: z.string().datetime().nullable(),
  lastMessageSide: messageSideSchema.nullable(),
  messages: z.array(messageDto),
  latestEmailEvent: linkedInEmailEventDto.nullable(),
  autoFollowupsEnabled: z.boolean(),
  strategyIds: z.array(z.string()),
  responseReceived: z.boolean(),
  responseReceivedAt: z.string().datetime().nullable(),
  emailSentAt: z.string().datetime().nullable(),
  loomVideoUrl: z.string().url().nullable(),
  loomSent: z.boolean(),
  emailFollowUpDates: z.array(z.string().datetime()),
  emailStatus: z.enum(['no_reply', 'replied', 'call_scheduled', 'rejected', 'in_process']).nullable(),
  followUp1Date: z.string().datetime().nullable(),
  followUp2Date: z.string().datetime().nullable(),
  followUp3Date: z.string().datetime().nullable(),
});

export type ConversationDetailDto = z.infer<typeof conversationDetailDto>;

/**
 * Body schema for updating a conversation.
 */
export const updateConversationBody = z.object({
  categoryId: z.string().uuid().nullable().optional(),
  stageId: z.string().uuid().nullable().optional(),
  challengeId: z.string().uuid().nullable().optional(),
  nextActionType: z.string().nullable().optional(),
  nextActionDueAt: z.string().datetime().nullable().optional(),
  priority: prioritySchema.optional(),
  notes: z.string().nullable().optional(),
  originalUrl: z.string().url().nullable().optional(),
  autoFollowupsEnabled: z.boolean().optional(),
  strategyIds: z.array(z.string()).optional(),
  responseReceived: z.boolean().optional(),
  responseReceivedAt: z.string().datetime().nullable().optional(),
  emailSentAt: z.string().datetime().nullable().optional(),
  loomVideoUrl: z.string().url().nullable().optional().or(z.literal('')),
  loomSent: z.boolean().optional(),
  emailFollowUpDates: z.array(z.string().datetime()).optional(),
  emailStatus: z.enum(['no_reply', 'replied', 'call_scheduled', 'rejected', 'in_process']).nullable().optional(),
  followUp1Date: z.string().datetime().nullable().optional(),
  followUp2Date: z.string().datetime().nullable().optional(),
  followUp3Date: z.string().datetime().nullable().optional(),
});

export type UpdateConversationBody = z.infer<typeof updateConversationBody>;

/**
 * Body schema for adding a message to a conversation.
 */
export const addMessageBody = z.object({
  body: z.string().min(1, 'Message body is required'),
  sender: messageSideSchema,
  sentAt: z.string().datetime(),
  contactId: z.string().uuid().optional(), // Required if sender is "contact" and multiple contacts exist
});

export type AddMessageBody = z.infer<typeof addMessageBody>;

/**
 * Body schema for updating a message.
 */
export const updateMessageBody = z.object({
  body: z.string().min(1, 'Message body is required').optional(),
  sentAt: z.string().datetime().optional(),
});

export type UpdateMessageBody = z.infer<typeof updateMessageBody>;

/**
 * Body schema for adding a contact to a conversation.
 */
export const addContactToConversationBody = z.object({
  contactId: z.string().uuid(),
});

export type AddContactToConversationBody = z.infer<typeof addContactToConversationBody>;



