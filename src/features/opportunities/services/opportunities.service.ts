import { client } from '@/shared/services/http/client';
import { z } from 'zod';
import { prioritySchema } from '@/shared/types';

/**
 * Opportunity list item DTO from API.
 */
const OpportunityListItemDto = z.object({
  id: z.string(),
  contactName: z.string(),
  contactCompany: z.string().nullable(),
  title: z.string().nullable(),
  categoryName: z.string().nullable(),
  stageName: z.string().nullable(),
  nextActionType: z.string().nullable(),
  nextActionDueAt: z.string().datetime().nullable(),
  priority: prioritySchema.nullable(),
  updatedAt: z.string().datetime(),
  lastMessageAt: z.string().datetime().nullable(),
  lastMessageSnippet: z.string().nullable(),
  warmOrCold: z.enum(['warm', 'cold']).nullable(),
  challengeId: z.string().uuid().nullable(),
  challengeName: z.string().nullable(),
});

export type OpportunityListItemDto = z.infer<typeof OpportunityListItemDto>;

/**
 * Opportunity list response DTO.
 */
const OpportunityListResponseDto = z.object({
  items: z.array(OpportunityListItemDto),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
});

/**
 * Message DTO for conversations in opportunity detail.
 */
const MessageDto = z.object({
  id: z.string(),
  sender: z.enum(['user', 'contact']),
  body: z.string(),
  sentAt: z.string().datetime(),
  source: z.string(),
  status: z.enum(['pending', 'confirmed']),
});

/**
 * LinkedIn email event DTO.
 */
const LinkedInEmailEventDto = z.object({
  id: z.string(),
  senderName: z.string(),
  snippet: z.string().nullable(),
  emailReceivedAt: z.string().datetime(),
});

/**
 * Full conversation DTO (for opportunity detail with all messages).
 */
const ConversationDetailDto = z.object({
  id: z.string(),
  contactName: z.string(),
  contactCompany: z.string().nullable(),
  channel: z.string(),
  stageId: z.string().nullable(),
  stageName: z.string().nullable(),
  lastMessageAt: z.string().datetime().nullable(),
  lastMessageSide: z.enum(['user', 'contact']).nullable(),
  lastMessageSnippet: z.string().nullable(),
  isOutOfSync: z.boolean(),
  originalUrl: z.string().url().nullable(),
  messages: z.array(MessageDto),
  latestEmailEvent: LinkedInEmailEventDto.nullable(),
});

/**
 * Contact DTO for opportunity detail.
 */
const OpportunityContactDto = z.object({
  id: z.string(),
  name: z.string(),
  company: z.string().nullable(),
});

/**
 * Opportunity detail DTO from API.
 */
const OpportunityDetailDto = z.object({
  id: z.string(),
  contactId: z.string(),
  contactName: z.string(),
  contactCompany: z.string().nullable(),
  contactHeadlineOrRole: z.string().nullable(),
  title: z.string().nullable(),
  categoryId: z.string().nullable(),
  categoryName: z.string().nullable(),
  stageId: z.string().nullable(),
  stageName: z.string().nullable(),
  nextActionType: z.string().nullable(),
  nextActionDueAt: z.string().datetime().nullable(),
  priority: prioritySchema.nullable(),
  summary: z.string().nullable(),
  notes: z.string().nullable(),
  autoFollowupsEnabled: z.boolean(),
  strategyIds: z.array(z.string()),
  proofOfWorkType: z.enum(['proof_of_work_bugs', 'proof_of_work_build', 'other']).nullable(),
  issuesFound: z.any().nullable(), // JSON field - array of { issue, screenshot?, notes? }
  projectDetails: z.string().nullable(),
  loomVideoUrl: z.string().url().nullable(),
  githubRepoUrl: z.string().url().nullable(),
  liveDemoUrl: z.string().url().nullable(),
  sharedChannels: z.array(z.string()),
  teamResponses: z.any().nullable(), // JSON field - array of { name, response, date }
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  contacts: z.array(OpportunityContactDto),
  conversations: z.array(ConversationDetailDto),
});

export type OpportunityListItem = OpportunityListItemDto & {
  nextActionDueAtDate: Date | null;
  updatedAtDate: Date;
  lastMessageAtDate: Date | null;
};

export type ConversationDetail = {
  id: string;
  contactName: string;
  contactCompany: string | null;
  channel: string;
  stageId: string | null;
  stageName: string | null;
  lastMessageAt: Date | null;
  lastMessageSide: 'user' | 'contact' | null;
  lastMessageSnippet: string | null;
  isOutOfSync: boolean;
  originalUrl: string | null;
  messages: Array<{
    id: string;
    sender: 'user' | 'contact';
    body: string;
    sentAt: Date;
    source: string;
    status: 'pending' | 'confirmed';
  }>;
  latestEmailEvent: {
    id: string;
    senderName: string;
    snippet: string | null;
    emailReceivedAt: Date;
  } | null;
};

export type OpportunityContact = {
  id: string;
  name: string;
  company: string | null;
};

export type OpportunityDetail = Omit<z.infer<typeof OpportunityDetailDto>, 'conversations' | 'createdAt' | 'updatedAt' | 'nextActionDueAt' | 'contacts'> & {
  contacts: OpportunityContact[];
  conversations: ConversationDetail[];
  nextActionDueAtDate: Date | null;
  createdAtDate: Date;
  updatedAtDate: Date;
};

/**
 * Create opportunity payload.
 */
export const CreateOpportunityPayload = z.object({
  contactId: z.string().uuid(),
  title: z.string().optional(),
  categoryId: z.string().uuid().optional(),
  stageId: z.string().uuid().optional(),
  nextActionType: z.string().optional(),
  nextActionDueAt: z.string().datetime().optional(),
  priority: prioritySchema.optional(),
  notes: z.string().optional(),
});

export type CreateOpportunityPayload = z.infer<typeof CreateOpportunityPayload>;

/**
 * Update opportunity payload.
 */
export const UpdateOpportunityPayload = z.object({
  title: z.string().optional(),
  categoryId: z.string().uuid().nullable().optional(),
  stageId: z.string().uuid().nullable().optional(),
  nextActionType: z.string().nullable().optional(),
  nextActionDueAt: z.string().datetime().nullable().optional(),
  priority: prioritySchema.optional(),
  summary: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  autoFollowupsEnabled: z.boolean().optional(),
  strategyIds: z.array(z.string()).optional(),
  proofOfWorkType: z.enum(['proof_of_work_bugs', 'proof_of_work_build', 'other']).nullable().optional(),
  issuesFound: z.any().optional(), // JSON field
  projectDetails: z.string().nullable().optional(),
  loomVideoUrl: z.string().url().nullable().optional().or(z.literal('')),
  githubRepoUrl: z.string().url().nullable().optional().or(z.literal('')),
  liveDemoUrl: z.string().url().nullable().optional().or(z.literal('')),
  sharedChannels: z.array(z.string()).optional(),
  teamResponses: z.any().optional(), // JSON field
});

export type UpdateOpportunityPayload = z.infer<typeof UpdateOpportunityPayload>;

/**
 * Fetch opportunities list.
 */
export async function listOpportunities(params: {
  search?: string;
  categoryId?: string;
  stageId?: string;
  proofOfWorkType?: 'proof_of_work_bugs' | 'proof_of_work_build' | 'other';
  page: number;
  pageSize: number;
  sortBy: 'updatedAt' | 'nextActionDueAt' | 'priority';
  sortDir: 'asc' | 'desc';
}): Promise<{ items: OpportunityListItem[]; total: number; page: number; pageSize: number; totalPages: number }> {
  const res = await client.get('/api/opportunities', {
    params,
  });
  const data = OpportunityListResponseDto.parse(res.data);

  return {
    ...data,
    items: data.items.map((item) => ({
      ...item,
      nextActionDueAtDate: item.nextActionDueAt ? new Date(item.nextActionDueAt) : null,
      updatedAtDate: new Date(item.updatedAt),
      lastMessageAtDate: item.lastMessageAt ? new Date(item.lastMessageAt) : null,
    })),
  };
}

/**
 * Fetch a single opportunity by ID with full detail.
 */
export async function getOpportunityDetail(id: string): Promise<OpportunityDetail> {
  const res = await client.get(`/api/opportunities/${id}`);
  const data = OpportunityDetailDto.parse(res.data);

  return {
    ...data,
    contacts: data.contacts || [],
    nextActionDueAtDate: data.nextActionDueAt ? new Date(data.nextActionDueAt) : null,
    createdAtDate: new Date(data.createdAt),
    updatedAtDate: new Date(data.updatedAt),
    conversations: data.conversations.map((conv) => ({
      ...conv,
      lastMessageAt: conv.lastMessageAt ? new Date(conv.lastMessageAt) : null,
      messages: conv.messages.map((msg) => ({
        ...msg,
        sentAt: new Date(msg.sentAt),
      })),
      latestEmailEvent: conv.latestEmailEvent
        ? {
          ...conv.latestEmailEvent,
          emailReceivedAt: new Date(conv.latestEmailEvent.emailReceivedAt),
        }
        : null,
    })),
  };
}

/**
 * Create a new opportunity.
 */
export async function createOpportunity(payload: CreateOpportunityPayload) {
  const body = CreateOpportunityPayload.parse(payload);
  const res = await client.post('/api/opportunities', body);
  return res.data as { id: string };
}

/**
 * Update an opportunity's metadata.
 */
export async function updateOpportunity(
  id: string,
  payload: UpdateOpportunityPayload,
): Promise<OpportunityDetail> {
  const body = UpdateOpportunityPayload.parse(payload);
  const res = await client.patch(`/api/opportunities/${id}`, body);
  
  // The API returns { id, success }, so we need to refetch the full opportunity detail
  // React Query will handle the refetch automatically via invalidation, but we need to return something
  // that matches the expected type. We'll refetch it here.
  return getOpportunityDetail(id);
}

/**
 * Delete an opportunity.
 */
export async function deleteOpportunity(id: string): Promise<void> {
  await client.delete(`/api/opportunities/${id}`);
}

