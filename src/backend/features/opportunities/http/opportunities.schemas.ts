import { z } from 'zod';
import { prioritySchema } from '@/shared/types';

/**
 * Query schema for listing opportunities.
 */
export const listOpportunitiesQuery = z.object({
  search: z.string().trim().optional(),
  categoryId: z.string().uuid().optional(),
  stageId: z.string().uuid().optional(),
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(100).default(20),
  sortBy: z
    .enum(['updatedAt', 'nextActionDueAt', 'priority'])
    .optional()
    .default('updatedAt'),
  sortDir: z.enum(['asc', 'desc']).optional().default('desc'),
});

export type ListOpportunitiesQuery = z.infer<typeof listOpportunitiesQuery>;

/**
 * Response DTO for a single opportunity row in the list.
 */
export const opportunityListItemDto = z.object({
  id: z.string().uuid(),
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
});

export type OpportunityListItemDto = z.infer<typeof opportunityListItemDto>;

/**
 * List response DTO.
 */
export const opportunityListDto = z.object({
  items: z.array(opportunityListItemDto),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
});

export type OpportunityListDto = z.infer<typeof opportunityListDto>;

/**
 * Message DTO for conversations in opportunity detail.
 */
const messageDto = z.object({
  id: z.string().uuid(),
  sender: z.enum(['user', 'contact']),
  body: z.string(),
  sentAt: z.string().datetime(),
  source: z.string(),
  status: z.enum(['pending', 'confirmed']),
});

/**
 * LinkedIn email event snippet DTO (for out-of-sync hints).
 */
const linkedInEmailEventDto = z.object({
  id: z.string().uuid(),
  senderName: z.string(),
  snippet: z.string().nullable(),
  emailReceivedAt: z.string().datetime(),
});

/**
 * Full conversation DTO (for opportunity detail with all messages).
 */
export const conversationDetailDto = z.object({
  id: z.string().uuid(),
  channel: z.string(),
  stageId: z.string().uuid().nullable(),
  stageName: z.string().nullable(),
  lastMessageAt: z.string().datetime().nullable(),
  lastMessageSide: z.enum(['user', 'contact']).nullable(),
  lastMessageSnippet: z.string().nullable(),
  isOutOfSync: z.boolean(),
  originalUrl: z.string().url().nullable(),
  messages: z.array(messageDto),
  latestEmailEvent: linkedInEmailEventDto.nullable(),
});

export type ConversationDetailDto = z.infer<typeof conversationDetailDto>;

/**
 * Response DTO for opportunity detail.
 */
export const opportunityDetailDto = z.object({
  id: z.string().uuid(),
  contactId: z.string().uuid(),
  contactName: z.string(),
  contactCompany: z.string().nullable(),
  contactHeadlineOrRole: z.string().nullable(),
  title: z.string().nullable(),
  categoryId: z.string().uuid().nullable(),
  categoryName: z.string().nullable(),
  stageId: z.string().uuid().nullable(),
  stageName: z.string().nullable(),
  nextActionType: z.string().nullable(),
  nextActionDueAt: z.string().datetime().nullable(),
  priority: prioritySchema.nullable(),
  summary: z.string().nullable(),
  notes: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  conversations: z.array(conversationDetailDto),
});

export type OpportunityDetailDto = z.infer<typeof opportunityDetailDto>;

/**
 * Body schema for creating a new opportunity.
 */
export const createOpportunityBody = z.object({
  contactId: z.string().uuid(),
  title: z.string().optional(),
  categoryId: z.string().uuid().optional(),
  stageId: z.string().uuid().optional(),
  nextActionType: z.string().optional(),
  nextActionDueAt: z.string().datetime().optional(),
  priority: prioritySchema.optional(),
  notes: z.string().optional(),
});

export type CreateOpportunityBody = z.infer<typeof createOpportunityBody>;

/**
 * Response DTO for creating an opportunity.
 */
export const createOpportunityResponseDto = z.object({
  id: z.string().uuid(),
});

export type CreateOpportunityResponseDto = z.infer<typeof createOpportunityResponseDto>;

/**
 * Body schema for updating an opportunity.
 */
export const updateOpportunityBody = z.object({
  title: z.string().optional(),
  categoryId: z.string().uuid().nullable().optional(),
  stageId: z.string().uuid().nullable().optional(),
  nextActionType: z.string().nullable().optional(),
  nextActionDueAt: z.string().datetime().nullable().optional(),
  priority: prioritySchema.optional(),
  summary: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export type UpdateOpportunityBody = z.infer<typeof updateOpportunityBody>;

/**
 * Response DTO for updating an opportunity.
 */
export const updateOpportunityResponseDto = z.object({
  id: z.string().uuid(),
  success: z.boolean(),
});

export type UpdateOpportunityResponseDto = z.infer<typeof updateOpportunityResponseDto>;

/**
 * Body schema for moving an opportunity to a different stage.
 */
export const moveOpportunityBody = z.object({
  stageId: z.string().uuid().nullable(),
});

export type MoveOpportunityBody = z.infer<typeof moveOpportunityBody>;

/**
 * Response DTO for moving an opportunity.
 */
export const moveOpportunityResponseDto = z.object({
  success: z.boolean(),
});

export type MoveOpportunityResponseDto = z.infer<typeof moveOpportunityResponseDto>;

