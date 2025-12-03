import { client } from '@/shared/services/http/client';
import { z } from 'zod';
import { conversationChannelSchema, prioritySchema, messageSideSchema } from '@/shared/types';
import type { ConversationInboxItem, ConversationDetail } from '@/features/conversations/services/conversations.service';

const InterviewInboxItemDto = z.object({
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

export type InterviewInboxItemDto = z.infer<typeof InterviewInboxItemDto>;

export const InterviewInboxListDto = z.array(InterviewInboxItemDto);

export type InterviewInboxItem = ConversationInboxItem;

const RelatedConversationDto = z.object({
  id: z.string(),
  contactName: z.string(),
  contactCompany: z.string().nullable(),
  channel: z.string(),
  category: z.string().nullable(),
  stage: z.string().nullable(),
  lastMessageAt: z.string().datetime().nullable(),
  lastMessageSnippet: z.string().nullable(),
});

const RelatedContactDto = z.object({
  id: z.string(),
  name: z.string(),
  headlineOrRole: z.string().nullable(),
  company: z.string().nullable(),
  category: z.string().nullable(),
  stage: z.string().nullable(),
});

const InterviewDetailDto = z.object({
  id: z.string(),
  contactId: z.string(),
  contactName: z.string(),
  contactCompany: z.string().nullable(),
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
  messages: z.array(z.object({
    id: z.string(),
    sender: messageSideSchema,
    body: z.string(),
    sentAt: z.string().datetime(),
    source: z.string(),
    status: z.enum(['pending', 'confirmed']),
  })),
  latestEmailEvent: z.object({
    id: z.string(),
    senderName: z.string(),
    snippet: z.string().nullable(),
    emailReceivedAt: z.string().datetime(),
  }).nullable(),
  relatedConversations: z.array(RelatedConversationDto),
  relatedContacts: z.array(RelatedContactDto),
  contactHeadlineOrRole: z.string().nullable(),
  contactProfileLinks: z.any().nullable(),
});

export type InterviewDetail = Omit<ConversationDetail, 'messages' | 'latestEmailEvent'> & {
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
  latestEmailEvent: {
    id: string;
    senderName: string;
    snippet: string | null;
    emailReceivedAt: Date;
  } | null;
  relatedConversations: Array<{
    id: string;
    contactName: string;
    contactCompany: string | null;
    channel: string;
    category: string | null;
    stage: string | null;
    lastMessageAt: Date | null;
    lastMessageSnippet: string | null;
  }>;
  relatedContacts: Array<{
    id: string;
    name: string;
    headlineOrRole: string | null;
    company: string | null;
    category: string | null;
    stage: string | null;
  }>;
  contactHeadlineOrRole: string | null;
  contactProfileLinks: any | null;
};

const UpdateInterviewBody = z.object({
  notes: z.string().nullable().optional(),
  categoryId: z.string().uuid().nullable().optional(),
  nextActionType: z.string().nullable().optional(),
  nextActionDueAt: z.string().datetime().nullable().optional(),
  priority: prioritySchema.optional(),
  originalUrl: z.string().url().nullable().optional(),
});

export type UpdateInterviewPayload = z.infer<typeof UpdateInterviewBody>;

/**
 * Fetch interviews (conversations with "Interviewing" stage) for the interviews page.
 */
export async function listInterviews(params: {
  search?: string;
  status?: 'all' | 'needs_attention' | 'waiting_on_them';
  categoryId?: string;
  page: number;
  pageSize: number;
  sortBy: 'updatedAt' | 'lastMessageAt' | 'priority';
  sortDir: 'asc' | 'desc';
}): Promise<InterviewInboxItem[]> {
  const res = await client.get('/api/interviews', {
    params,
  });
  const data = InterviewInboxListDto.parse(res.data);

  return data.map((item) => ({
    ...item,
    lastMessageAtDate: item.lastMessageAt ? new Date(item.lastMessageAt) : null,
  }));
}

/**
 * Fetch interview detail with related conversations and contacts.
 */
export async function getInterviewDetail(id: string): Promise<InterviewDetail> {
  const res = await client.get(`/api/interviews/${id}`);
  const data = InterviewDetailDto.parse(res.data);

  return {
    ...data,
    messages: data.messages.map((msg) => ({
      ...msg,
      sentAt: new Date(msg.sentAt),
    })),
    nextActionDueAtDate: data.nextActionDueAt ? new Date(data.nextActionDueAt) : null,
    lastMessageAtDate: data.lastMessageAt ? new Date(data.lastMessageAt) : null,
    latestEmailEvent: data.latestEmailEvent
      ? {
          ...data.latestEmailEvent,
          emailReceivedAt: new Date(data.latestEmailEvent.emailReceivedAt),
        }
      : null,
    relatedConversations: data.relatedConversations.map((conv) => ({
      ...conv,
      lastMessageAt: conv.lastMessageAt ? new Date(conv.lastMessageAt) : null,
    })),
    contactProfileLinks: data.contactProfileLinks ?? null,
  };
}

/**
 * Update interview notes and metadata.
 */
export async function updateInterview(
  id: string,
  payload: UpdateInterviewPayload,
): Promise<InterviewDetail> {
  const body = UpdateInterviewBody.parse(payload);
  const res = await client.patch(`/api/interviews/${id}`, body);
  const data = InterviewDetailDto.parse(res.data);

  return {
    ...data,
    messages: data.messages.map((msg) => ({
      ...msg,
      sentAt: new Date(msg.sentAt),
    })),
    nextActionDueAtDate: data.nextActionDueAt ? new Date(data.nextActionDueAt) : null,
    lastMessageAtDate: data.lastMessageAt ? new Date(data.lastMessageAt) : null,
    latestEmailEvent: data.latestEmailEvent
      ? {
          ...data.latestEmailEvent,
          emailReceivedAt: new Date(data.latestEmailEvent.emailReceivedAt),
        }
      : null,
    relatedConversations: data.relatedConversations.map((conv) => ({
      ...conv,
      lastMessageAt: conv.lastMessageAt ? new Date(conv.lastMessageAt) : null,
    })),
    contactProfileLinks: data.contactProfileLinks ?? null,
  };
}

