import { client } from '@/shared/services/http/client';
import { z } from 'zod';

/**
 * Latest conversation summary for a contact in the list view.
 */
const ContactLatestConversationDto = z.object({
  id: z.string(),
  channel: z.string(),
  categoryName: z.string().nullable(),
  stageName: z.string().nullable(),
  lastMessageAt: z.string().datetime().nullable(),
});

/**
 * Contact list item DTO.
 */
const ContactListItemDto = z.object({
  id: z.string(),
  name: z.string(),
  headlineOrRole: z.string().nullable(),
  company: z.string().nullable(),
  primaryPlatform: z.string().nullable(),
  profileLinks: z.record(z.string()).nullable(),
  tags: z.array(z.string()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  latestConversation: ContactLatestConversationDto.nullable(),
});

export type ContactListItem = z.infer<typeof ContactListItemDto> & {
  createdAtDate: Date;
  updatedAtDate: Date;
  latestConversation: {
    id: string;
    channel: string;
    categoryName: string | null;
    stageName: string | null;
    lastMessageAtDate: Date | null;
  } | null;
};

/**
 * Contacts list response DTO.
 */
const ContactsListDto = z.object({
  contacts: z.array(ContactListItemDto),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
});

/**
 * Conversation summary for contact detail view.
 */
const ContactConversationSummaryDto = z.object({
  id: z.string(),
  channel: z.string(),
  categoryName: z.string().nullable(),
  stageName: z.string().nullable(),
  lastMessageAt: z.string().datetime().nullable(),
  lastMessageSnippet: z.string().nullable(),
  priority: z.enum(['low', 'medium', 'high']),
  isOutOfSync: z.boolean(),
});

/**
 * Contact detail DTO.
 */
const ContactDetailDto = z.object({
  id: z.string(),
  name: z.string(),
  headlineOrRole: z.string().nullable(),
  company: z.string().nullable(),
  primaryPlatform: z.string().nullable(),
  profileLinks: z.record(z.string()).nullable(),
  tags: z.array(z.string()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  conversations: z.array(ContactConversationSummaryDto),
});

export type ContactDetail = Omit<z.infer<typeof ContactDetailDto>, 'conversations' | 'createdAt' | 'updatedAt'> & {
  createdAtDate: Date;
  updatedAtDate: Date;
  conversations: Array<{
    id: string;
    channel: string;
    categoryName: string | null;
    stageName: string | null;
    lastMessageAtDate: Date | null;
    lastMessageSnippet: string | null;
    priority: 'low' | 'medium' | 'high';
    isOutOfSync: boolean;
  }>;
};

/**
 * Create contact payload.
 */
const CreateContactBody = z.object({
  name: z.string().min(1),
  headlineOrRole: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  primaryPlatform: z.string().nullable().optional(),
  profileLinks: z.record(z.string()).nullable().optional(),
  tags: z.array(z.string()).optional(),
});

export type CreateContactPayload = z.infer<typeof CreateContactBody>;

/**
 * Update contact payload.
 */
const UpdateContactBody = z.object({
  name: z.string().min(1).optional(),
  headlineOrRole: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  primaryPlatform: z.string().nullable().optional(),
  profileLinks: z.record(z.string()).nullable().optional(),
  tags: z.array(z.string()).optional(),
});

export type UpdateContactPayload = z.infer<typeof UpdateContactBody>;

/**
 * Fetch contacts for the directory.
 */
export async function listContacts(params: {
  search?: string;
  company?: string;
  categoryId?: string;
  stageId?: string;
  primaryPlatform?: string;
  page: number;
  pageSize: number;
  sortBy: 'name' | 'company' | 'updatedAt' | 'createdAt';
  sortDir: 'asc' | 'desc';
}): Promise<{
  contacts: ContactListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}> {
  const res = await client.get('/api/contacts', {
    params,
  });
  const data = ContactsListDto.parse(res.data);

  return {
    ...data,
    contacts: data.contacts.map((item) => ({
      ...item,
      createdAtDate: new Date(item.createdAt),
      updatedAtDate: new Date(item.updatedAt),
      latestConversation: item.latestConversation
        ? {
            ...item.latestConversation,
            lastMessageAtDate: item.latestConversation.lastMessageAt
              ? new Date(item.latestConversation.lastMessageAt)
              : null,
          }
        : null,
    })),
  };
}

/**
 * Fetch a single contact by ID with full detail.
 */
export async function getContactDetail(id: string): Promise<ContactDetail> {
  const res = await client.get(`/api/contacts/${id}`);
  const data = ContactDetailDto.parse(res.data);

  return {
    ...data,
    createdAtDate: new Date(data.createdAt),
    updatedAtDate: new Date(data.updatedAt),
    conversations: data.conversations.map((conv) => ({
      ...conv,
      lastMessageAtDate: conv.lastMessageAt ? new Date(conv.lastMessageAt) : null,
    })),
  };
}

/**
 * Create a new contact.
 */
export async function createContact(payload: CreateContactPayload) {
  const body = CreateContactBody.parse(payload);
  const res = await client.post('/api/contacts', body);
  return res.data as { id: string };
}

/**
 * Update a contact.
 */
export async function updateContact(
  id: string,
  payload: UpdateContactPayload,
): Promise<ContactDetail> {
  const body = UpdateContactBody.parse(payload);
  const res = await client.patch(`/api/contacts/${id}`, body);
  const data = ContactDetailDto.parse(res.data);

  return {
    ...data,
    createdAtDate: new Date(data.createdAt),
    updatedAtDate: new Date(data.updatedAt),
    conversations: data.conversations.map((conv) => ({
      ...conv,
      lastMessageAtDate: conv.lastMessageAt ? new Date(conv.lastMessageAt) : null,
    })),
  };
}

/**
 * Delete a contact.
 */
export async function deleteContact(id: string): Promise<void> {
  await client.delete(`/api/contacts/${id}`);
}

