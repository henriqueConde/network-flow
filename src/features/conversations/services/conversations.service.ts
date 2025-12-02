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
  priority: prioritySchema,
  isOutOfSync: z.boolean(),
  needsAttention: z.boolean(),
});

export type ConversationInboxItemDto = z.infer<typeof ConversationInboxItemDto>;

export const ConversationInboxListDto = z.array(ConversationInboxItemDto);

export const CreateConversationBody = z.object({
  contactId: z.string().optional(),
  contactName: z.string().min(1),
  contactCompany: z.string().optional(),
  channel: conversationChannelSchema.default('linkedin'),
  pastedText: z.string().min(1),
  categoryId: z.string().optional(),
  stageId: z.string().optional(),
  priority: prioritySchema.default('medium'),
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
  const body = CreateConversationBody.parse(payload);
  const res = await client.post('/api/conversations', body);
  return res.data as { id: string };
}


