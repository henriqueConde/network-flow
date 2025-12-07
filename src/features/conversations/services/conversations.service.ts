import { client } from '@/shared/services/http/client';
import { z } from 'zod';
import { conversationChannelSchema, prioritySchema, messageSideSchema } from '@/shared/types';

const ConversationInboxItemDto = z.object({
  id: z.string(),
  contactName: z.string(),
  contactCompany: z.string().nullable(),
  channel: z.string(),
  category: z.string().nullable(),
  stage: z.string().nullable(),
  lastMessageAt: z.string().datetime().nullable(),
  lastMessageSnippet: z.string().nullable(),
  lastMessageSide: messageSideSchema.nullable(),
  priority: prioritySchema.nullable(),
  isOutOfSync: z.boolean(),
  needsAttention: z.boolean(),
});

export type ConversationInboxItemDto = z.infer<typeof ConversationInboxItemDto>;

export const ConversationInboxListDto = z.array(ConversationInboxItemDto);

export const CreateConversationBody = z.object({
  contactId: z.string().optional(),
  contactName: z.string().min(1),
  contactCompany: z.string().optional(),
  opportunityId: z.string().optional(),
  channel: conversationChannelSchema.default('linkedin'),
  pastedText: z.string().min(1),
  categoryId: z.string().optional(),
  stageId: z.string().optional(),
  priority: prioritySchema.default('medium'),
  firstMessageSender: messageSideSchema.default('contact'),
});

export type CreateConversationPayload = z.infer<typeof CreateConversationBody>;

export type ConversationInboxItem = ConversationInboxItemDto & {
  lastMessageAtDate: Date | null;
};

/**
 * Fetch conversations for the inbox.
 */
export async function listConversations(params: {
  search?: string;
  status?: 'all' | 'needs_attention' | 'waiting_on_them';
  categoryId?: string;
  stageId?: string;
  emailStatus?: 'no_reply' | 'replied' | 'call_scheduled' | 'rejected' | 'in_process';
  page: number;
  pageSize: number;
  sortBy: 'updatedAt' | 'lastMessageAt' | 'priority';
  sortDir: 'asc' | 'desc';
}): Promise<ConversationInboxItem[]> {
  const res = await client.get('/api/conversations', {
    params,
  });
  const data = ConversationInboxListDto.parse(res.data);

  return data.map((item) => ({
    ...item,
    lastMessageAtDate: item.lastMessageAt ? new Date(item.lastMessageAt) : null,
  }));
}

/**
 * Create a new conversation from the Inbox.
 */
export async function createConversation(payload: CreateConversationPayload) {
  // Normalize payload to ensure we never send non-string values (e.g. an
  // accidentally passed opportunity object) where a string ID is expected.
  const normalizedPayload: CreateConversationPayload = {
    ...payload,
    opportunityId:
      typeof (payload as any)?.opportunityId === 'string'
        ? (payload as any).opportunityId
        : undefined,
  };

  const body = CreateConversationBody.parse(normalizedPayload);
  const res = await client.post('/api/conversations', body);
  return res.data as { id: string };
}

/**
 * Delete a conversation.
 */
export async function deleteConversation(id: string): Promise<void> {
  await client.delete(`/api/conversations/${id}`);
}

/**
 * Message DTO for conversation detail.
 */
const MessageDto = z.object({
  id: z.string(),
  sender: messageSideSchema,
  body: z.string(),
  sentAt: z.string().datetime(),
  source: z.string(),
  status: z.enum(['pending', 'confirmed']),
});

/**
 * LinkedIn email event snippet DTO (for out-of-sync hints).
 */
const LinkedInEmailEventDto = z.object({
  id: z.string(),
  senderName: z.string(),
  snippet: z.string().nullable(),
  emailReceivedAt: z.string().datetime(),
});

/**
 * Conversation detail DTO.
 */
const ConversationDetailDto = z.object({
  id: z.string(),
  contactId: z.string(),
  contactName: z.string(),
  contactCompany: z.string().nullable(),
  opportunityId: z.string().nullable(),
  opportunityTitle: z.string().nullable(),
  channel: z.string(),
  categoryId: z.string().nullable(),
  categoryName: z.string().nullable(),
  stageId: z.string().nullable(),
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
  messages: z.array(MessageDto),
  latestEmailEvent: LinkedInEmailEventDto.nullable(),
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

export type ConversationDetail = Omit<z.infer<typeof ConversationDetailDto>, 'messages' | 'latestEmailEvent' | 'nextActionDueAt' | 'lastMessageAt' | 'responseReceivedAt' | 'emailSentAt' | 'followUp1Date' | 'followUp2Date' | 'followUp3Date' | 'emailFollowUpDates'> & {
  messages: Array<{
    id: string;
    sender: 'user' | 'contact';
    body: string;
    sentAt: Date;
    source: string;
    status: 'pending' | 'confirmed';
  }>;
  nextActionDueAtDate: Date | null;
  lastMessageAtDate: Date | null;
  responseReceivedAtDate: Date | null;
  emailSentAtDate: Date | null;
  followUp1DateDate: Date | null;
  followUp2DateDate: Date | null;
  followUp3DateDate: Date | null;
  emailFollowUpDatesDates: Date[];
  latestEmailEvent: {
    id: string;
    senderName: string;
    snippet: string | null;
    emailReceivedAt: Date;
  } | null;
};

/**
 * Update conversation payload.
 */
const UpdateConversationBody = z.object({
  categoryId: z.string().uuid().nullable().optional(),
  stageId: z.string().uuid().nullable().optional(),
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

export type UpdateConversationPayload = z.infer<typeof UpdateConversationBody>;

/**
 * Add message payload.
 */
const AddMessageBody = z.object({
  body: z.string().min(1),
  sender: messageSideSchema,
  sentAt: z.string().datetime(),
});

export type AddMessagePayload = z.infer<typeof AddMessageBody>;

/**
 * Add a message (reply) to a conversation.
 */
export async function addMessage(
  conversationId: string,
  payload: AddMessagePayload,
): Promise<ConversationDetail> {
  const body = AddMessageBody.parse(payload);
  const res = await client.post(`/api/conversations/${conversationId}/messages`, body);
  const data = ConversationDetailDto.parse(res.data);

  return {
    ...data,
    messages: data.messages.map((msg) => ({
      ...msg,
      sentAt: new Date(msg.sentAt),
    })),
    nextActionDueAtDate: data.nextActionDueAt ? new Date(data.nextActionDueAt) : null,
    lastMessageAtDate: data.lastMessageAt ? new Date(data.lastMessageAt) : null,
    responseReceivedAtDate: data.responseReceivedAt ? new Date(data.responseReceivedAt) : null,
    emailSentAtDate: data.emailSentAt ? new Date(data.emailSentAt) : null,
    followUp1DateDate: data.followUp1Date ? new Date(data.followUp1Date) : null,
    followUp2DateDate: data.followUp2Date ? new Date(data.followUp2Date) : null,
    followUp3DateDate: data.followUp3Date ? new Date(data.followUp3Date) : null,
    emailFollowUpDatesDates: data.emailFollowUpDates.map((d) => new Date(d)),
    latestEmailEvent: data.latestEmailEvent
      ? {
          ...data.latestEmailEvent,
          emailReceivedAt: new Date(data.latestEmailEvent.emailReceivedAt),
        }
      : null,
  };
}

/**
 * Fetch a single conversation by ID with full detail.
 */
export async function getConversationDetail(id: string): Promise<ConversationDetail> {
  const res = await client.get(`/api/conversations/${id}`);
  const data = ConversationDetailDto.parse(res.data);

  return {
    ...data,
    messages: data.messages.map((msg) => ({
      ...msg,
      sentAt: new Date(msg.sentAt),
    })),
    nextActionDueAtDate: data.nextActionDueAt ? new Date(data.nextActionDueAt) : null,
    lastMessageAtDate: data.lastMessageAt ? new Date(data.lastMessageAt) : null,
    responseReceivedAtDate: data.responseReceivedAt ? new Date(data.responseReceivedAt) : null,
    emailSentAtDate: data.emailSentAt ? new Date(data.emailSentAt) : null,
    followUp1DateDate: data.followUp1Date ? new Date(data.followUp1Date) : null,
    followUp2DateDate: data.followUp2Date ? new Date(data.followUp2Date) : null,
    followUp3DateDate: data.followUp3Date ? new Date(data.followUp3Date) : null,
    emailFollowUpDatesDates: data.emailFollowUpDates.map((d) => new Date(d)),
    latestEmailEvent: data.latestEmailEvent
      ? {
          ...data.latestEmailEvent,
          emailReceivedAt: new Date(data.latestEmailEvent.emailReceivedAt),
        }
      : null,
  };
}

/**
 * Update a conversation's metadata.
 */
export async function updateConversation(
  id: string,
  payload: UpdateConversationPayload,
): Promise<ConversationDetail> {
  const body = UpdateConversationBody.parse(payload);
  const res = await client.patch(`/api/conversations/${id}`, body);
  const data = ConversationDetailDto.parse(res.data);

  return {
    ...data,
    messages: data.messages.map((msg) => ({
      ...msg,
      sentAt: new Date(msg.sentAt),
    })),
    nextActionDueAtDate: data.nextActionDueAt ? new Date(data.nextActionDueAt) : null,
    lastMessageAtDate: data.lastMessageAt ? new Date(data.lastMessageAt) : null,
    responseReceivedAtDate: data.responseReceivedAt ? new Date(data.responseReceivedAt) : null,
    emailSentAtDate: data.emailSentAt ? new Date(data.emailSentAt) : null,
    followUp1DateDate: data.followUp1Date ? new Date(data.followUp1Date) : null,
    followUp2DateDate: data.followUp2Date ? new Date(data.followUp2Date) : null,
    followUp3DateDate: data.followUp3Date ? new Date(data.followUp3Date) : null,
    emailFollowUpDatesDates: data.emailFollowUpDates.map((d) => new Date(d)),
    latestEmailEvent: data.latestEmailEvent
      ? {
          ...data.latestEmailEvent,
          emailReceivedAt: new Date(data.latestEmailEvent.emailReceivedAt),
        }
      : null,
  };
}

/**
 * Update a message's body and/or sentAt.
 */
export async function updateMessage(
  conversationId: string,
  messageId: string,
  payload: { body?: string; sentAt?: string },
): Promise<ConversationDetail> {
  const res = await client.patch(`/api/conversations/${conversationId}/messages/${messageId}`, payload);
  const data = ConversationDetailDto.parse(res.data);

  return {
    ...data,
    messages: data.messages.map((msg) => ({
      ...msg,
      sentAt: new Date(msg.sentAt),
    })),
    nextActionDueAtDate: data.nextActionDueAt ? new Date(data.nextActionDueAt) : null,
    lastMessageAtDate: data.lastMessageAt ? new Date(data.lastMessageAt) : null,
    responseReceivedAtDate: data.responseReceivedAt ? new Date(data.responseReceivedAt) : null,
    emailSentAtDate: data.emailSentAt ? new Date(data.emailSentAt) : null,
    followUp1DateDate: data.followUp1Date ? new Date(data.followUp1Date) : null,
    followUp2DateDate: data.followUp2Date ? new Date(data.followUp2Date) : null,
    followUp3DateDate: data.followUp3Date ? new Date(data.followUp3Date) : null,
    emailFollowUpDatesDates: data.emailFollowUpDates.map((d) => new Date(d)),
    latestEmailEvent: data.latestEmailEvent
      ? {
          ...data.latestEmailEvent,
          emailReceivedAt: new Date(data.latestEmailEvent.emailReceivedAt),
        }
      : null,
  };
}

/**
 * Delete a message.
 */
export async function deleteMessage(
  conversationId: string,
  messageId: string,
): Promise<ConversationDetail> {
  const res = await client.delete(`/api/conversations/${conversationId}/messages/${messageId}`);
  const data = ConversationDetailDto.parse(res.data);

  return {
    ...data,
    messages: data.messages.map((msg) => ({
      ...msg,
      sentAt: new Date(msg.sentAt),
    })),
    nextActionDueAtDate: data.nextActionDueAt ? new Date(data.nextActionDueAt) : null,
    lastMessageAtDate: data.lastMessageAt ? new Date(data.lastMessageAt) : null,
    responseReceivedAtDate: data.responseReceivedAt ? new Date(data.responseReceivedAt) : null,
    emailSentAtDate: data.emailSentAt ? new Date(data.emailSentAt) : null,
    followUp1DateDate: data.followUp1Date ? new Date(data.followUp1Date) : null,
    followUp2DateDate: data.followUp2Date ? new Date(data.followUp2Date) : null,
    followUp3DateDate: data.followUp3Date ? new Date(data.followUp3Date) : null,
    emailFollowUpDatesDates: data.emailFollowUpDates.map((d) => new Date(d)),
    latestEmailEvent: data.latestEmailEvent
      ? {
          ...data.latestEmailEvent,
          emailReceivedAt: new Date(data.latestEmailEvent.emailReceivedAt),
        }
      : null,
  };
}

/**
 * Toggle message status between pending and confirmed.
 */
export async function toggleMessageStatus(
  conversationId: string,
  messageId: string,
): Promise<ConversationDetail> {
  const res = await client.post(`/api/conversations/${conversationId}/messages/${messageId}/toggle-status`);
  const data = ConversationDetailDto.parse(res.data);

  return {
    ...data,
    messages: data.messages.map((msg) => ({
      ...msg,
      sentAt: new Date(msg.sentAt),
    })),
    nextActionDueAtDate: data.nextActionDueAt ? new Date(data.nextActionDueAt) : null,
    lastMessageAtDate: data.lastMessageAt ? new Date(data.lastMessageAt) : null,
    responseReceivedAtDate: data.responseReceivedAt ? new Date(data.responseReceivedAt) : null,
    emailSentAtDate: data.emailSentAt ? new Date(data.emailSentAt) : null,
    followUp1DateDate: data.followUp1Date ? new Date(data.followUp1Date) : null,
    followUp2DateDate: data.followUp2Date ? new Date(data.followUp2Date) : null,
    followUp3DateDate: data.followUp3Date ? new Date(data.followUp3Date) : null,
    emailFollowUpDatesDates: data.emailFollowUpDates.map((d) => new Date(d)),
    latestEmailEvent: data.latestEmailEvent
      ? {
          ...data.latestEmailEvent,
          emailReceivedAt: new Date(data.latestEmailEvent.emailReceivedAt),
        }
      : null,
  };
}


