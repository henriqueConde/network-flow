import { z } from 'zod';
import { conversationChannelSchema } from '@/shared/types';

export const listContactsQuery = z.object({
  search: z.string().trim().optional(),
  company: z.string().trim().optional(),
  primaryPlatform: z.string().optional(),
  warmOrCold: z.enum(['warm', 'cold']).optional(),
  connectionStatus: z.enum(['not_connected', 'request_sent', 'connected']).optional(),
  contactType: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'company', 'updatedAt', 'createdAt']).optional().default('name'),
  sortDir: z.enum(['asc', 'desc']).optional().default('asc'),
});

export type ListContactsQuery = z.infer<typeof listContactsQuery>;

/**
 * Latest conversation summary for a contact in the list view.
 */
export const contactLatestConversationDto = z.object({
  id: z.string().uuid(),
  channel: z.string(),
  categoryName: z.string().nullable(),
  stageName: z.string().nullable(),
  lastMessageAt: z.string().datetime().nullable(),
});

export type ContactLatestConversationDto = z.infer<typeof contactLatestConversationDto>;

/**
 * Response DTO for a single contact row in the Contacts Directory.
 */
export const contactListItemDto = z.object({
  id: z.string().uuid(),
  name: z.string(),
  headlineOrRole: z.string().nullable(),
  company: z.string().nullable(),
  companyId: z.string().uuid().nullable(),
  primaryPlatform: z.string().nullable(),
  profileLinks: z.record(z.string()).nullable(),
  tags: z.array(z.string()),
  email: z.string().nullable(),
  warmOrCold: z.enum(['warm', 'cold']).nullable(),
  connectionStatus: z.enum(['not_connected', 'request_sent', 'connected']).nullable(),
  contactType: z.string().nullable(),
  strategyIds: z.array(z.string()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  latestConversation: contactLatestConversationDto.nullable(),
});

export type ContactListItemDto = z.infer<typeof contactListItemDto>;

/**
 * Response DTO for contacts list with pagination.
 */
export const contactsListDto = z.object({
  contacts: z.array(contactListItemDto),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
});

export type ContactsListDto = z.infer<typeof contactsListDto>;

/**
 * Conversation summary for contact detail view.
 */
export const contactConversationSummaryDto = z.object({
  id: z.string().uuid(),
  channel: z.string(),
  categoryName: z.string().nullable(),
  stageName: z.string().nullable(),
  lastMessageAt: z.string().datetime().nullable(),
  lastMessageSnippet: z.string().nullable(),
  priority: z.enum(['low', 'medium', 'high']),
  isOutOfSync: z.boolean(),
});

export type ContactConversationSummaryDto = z.infer<typeof contactConversationSummaryDto>;

/**
 * Response DTO for contact detail.
 */
export const contactDetailDto = z.object({
  id: z.string().uuid(),
  name: z.string(),
  headlineOrRole: z.string().nullable(),
  company: z.string().nullable(),
  companyId: z.string().uuid().nullable(),
  primaryPlatform: z.string().nullable(),
  profileLinks: z.record(z.string()).nullable(),
  tags: z.array(z.string()),
  email: z.string().nullable(),
  warmOrCold: z.enum(['warm', 'cold']).nullable(),
  commonGround: z.string().nullable(),
  firstMessageDate: z.string().datetime().nullable(),
  referralGiven: z.boolean(),
  referralGivenAt: z.string().datetime().nullable(),
  referralDetails: z.string().nullable(),
  connectionRequestSentAt: z.string().datetime().nullable(),
  connectionAcceptedAt: z.string().datetime().nullable(),
  connectionStatus: z.enum(['not_connected', 'request_sent', 'connected']).nullable(),
  dmSentAt: z.string().datetime().nullable(),
  lastFollowUpAt: z.string().datetime().nullable(),
  contactType: z.string().nullable(),
  strategyIds: z.array(z.string()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  conversations: z.array(contactConversationSummaryDto),
});

export type ContactDetailDto = z.infer<typeof contactDetailDto>;

/**
 * Body schema for creating a contact.
 */
export const createContactBody = z.object({
  name: z.string().min(1, 'Name is required'),
  headlineOrRole: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  companyId: z.string().uuid().nullable().optional(),
  primaryPlatform: z.string().nullable().optional(),
  profileLinks: z.record(z.string()).nullable().optional(),
  tags: z.array(z.string()).optional(),
  email: z.string().email().nullable().optional(),
  warmOrCold: z.enum(['warm', 'cold']).nullable().optional(),
  commonGround: z.string().nullable().optional(),
  firstMessageDate: z.string().datetime().nullable().optional(),
  referralGiven: z.boolean().optional(),
  referralGivenAt: z.string().datetime().nullable().optional(),
  referralDetails: z.string().nullable().optional(),
  connectionRequestSentAt: z.string().datetime().nullable().optional(),
  connectionAcceptedAt: z.string().datetime().nullable().optional(),
  connectionStatus: z.enum(['not_connected', 'request_sent', 'connected']).nullable().optional(),
  dmSentAt: z.string().datetime().nullable().optional(),
  lastFollowUpAt: z.string().datetime().nullable().optional(),
  contactType: z.string().nullable().optional(),
  strategyIds: z.array(z.string()).optional(),
});

export type CreateContactBody = z.infer<typeof createContactBody>;

/**
 * Response DTO for creating a contact.
 */
export const createContactResponseDto = z.object({
  id: z.string().uuid(),
});

export type CreateContactResponseDto = z.infer<typeof createContactResponseDto>;

/**
 * Body schema for updating a contact.
 */
export const updateContactBody = z.object({
  name: z.string().min(1).optional(),
  headlineOrRole: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  companyId: z.string().uuid().nullable().optional(),
  primaryPlatform: z.string().nullable().optional(),
  profileLinks: z.record(z.string()).nullable().optional(),
  tags: z.array(z.string()).optional(),
  email: z.string().email().nullable().optional(),
  warmOrCold: z.enum(['warm', 'cold']).nullable().optional(),
  commonGround: z.string().nullable().optional(),
  firstMessageDate: z.string().datetime().nullable().optional(),
  referralGiven: z.boolean().optional(),
  referralGivenAt: z.string().datetime().nullable().optional(),
  referralDetails: z.string().nullable().optional(),
  connectionRequestSentAt: z.string().datetime().nullable().optional(),
  connectionAcceptedAt: z.string().datetime().nullable().optional(),
  connectionStatus: z.enum(['not_connected', 'request_sent', 'connected']).nullable().optional(),
  dmSentAt: z.string().datetime().nullable().optional(),
  lastFollowUpAt: z.string().datetime().nullable().optional(),
  contactType: z.string().nullable().optional(),
  strategyIds: z.array(z.string()).optional(),
});

export type UpdateContactBody = z.infer<typeof updateContactBody>;

