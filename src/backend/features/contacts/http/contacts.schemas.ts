import { z } from 'zod';
import { conversationChannelSchema } from '@/shared/types';

export const listContactsQuery = z.object({
  search: z.string().trim().optional(),
  company: z.string().trim().optional(),
  categoryId: z.string().uuid().optional(),
  stageId: z.string().uuid().optional(),
  primaryPlatform: z.string().optional(),
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
  primaryPlatform: z.string().nullable(),
  profileLinks: z.record(z.string()).nullable(),
  tags: z.array(z.string()),
  categoryId: z.string().uuid().nullable(),
  stageId: z.string().uuid().nullable(),
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
  primaryPlatform: z.string().nullable(),
  profileLinks: z.record(z.string()).nullable(),
  tags: z.array(z.string()),
  categoryId: z.string().uuid().nullable(),
  stageId: z.string().uuid().nullable(),
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
  primaryPlatform: z.string().nullable().optional(),
  profileLinks: z.record(z.string()).nullable().optional(),
  tags: z.array(z.string()).optional(),
  categoryId: z.string().uuid().nullable().optional(),
  stageId: z.string().uuid().nullable().optional(),
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
  primaryPlatform: z.string().nullable().optional(),
  profileLinks: z.record(z.string()).nullable().optional(),
  tags: z.array(z.string()).optional(),
  categoryId: z.string().uuid().nullable().optional(),
  stageId: z.string().uuid().nullable().optional(),
});

export type UpdateContactBody = z.infer<typeof updateContactBody>;

