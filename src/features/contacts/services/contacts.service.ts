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
  companyId: z.string().nullable(),
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
  companyId: z.string().nullable(),
  primaryPlatform: z.string().nullable(),
  profileLinks: z.record(z.string()).nullable(),
  tags: z.array(z.string()),
  categoryId: z.string().nullable(),
  stageId: z.string().nullable(),
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
  conversations: z.array(ContactConversationSummaryDto),
});


/**
 * Create contact payload.
 */
const CreateContactBody = z.object({
  name: z.string().min(1),
  headlineOrRole: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  companyId: z.string().uuid().nullable().optional(),
  primaryPlatform: z.string().nullable().optional(),
  profileLinks: z.record(z.string()).nullable().optional(),
  tags: z.array(z.string()).optional(),
  categoryId: z.string().uuid().nullable().optional(),
  stageId: z.string().uuid().nullable().optional(),
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

export type CreateContactPayload = z.infer<typeof CreateContactBody>;

/**
 * Update contact payload.
 */
const UpdateContactBody = z.object({
  name: z.string().min(1).optional(),
  headlineOrRole: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  companyId: z.string().uuid().nullable().optional(),
  primaryPlatform: z.string().nullable().optional(),
  profileLinks: z.record(z.string()).nullable().optional(),
  tags: z.array(z.string()).optional(),
  categoryId: z.string().uuid().nullable().optional(),
  stageId: z.string().uuid().nullable().optional(),
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
  warmOrCold?: 'warm' | 'cold';
  connectionStatus?: 'not_connected' | 'request_sent' | 'connected';
  contactType?: string;
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

export type ContactDetail = Omit<z.infer<typeof ContactDetailDto>, 'conversations' | 'createdAt' | 'updatedAt' | 'firstMessageDate' | 'referralGivenAt' | 'connectionRequestSentAt' | 'connectionAcceptedAt' | 'dmSentAt' | 'lastFollowUpAt'> & {
  createdAtDate: Date;
  updatedAtDate: Date;
  firstMessageDateDate: Date | null;
  referralGivenAtDate: Date | null;
  connectionRequestSentAtDate: Date | null;
  connectionAcceptedAtDate: Date | null;
  dmSentAtDate: Date | null;
  lastFollowUpAtDate: Date | null;
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
 * Fetch a single contact by ID with full detail.
 */
export async function getContactDetail(id: string): Promise<ContactDetail> {
  const res = await client.get(`/api/contacts/${id}`);
  const data = ContactDetailDto.parse(res.data);

  return {
    ...data,
    createdAtDate: new Date(data.createdAt),
    updatedAtDate: new Date(data.updatedAt),
    firstMessageDateDate: data.firstMessageDate ? new Date(data.firstMessageDate) : null,
    referralGivenAtDate: data.referralGivenAt ? new Date(data.referralGivenAt) : null,
    connectionRequestSentAtDate: data.connectionRequestSentAt ? new Date(data.connectionRequestSentAt) : null,
    connectionAcceptedAtDate: data.connectionAcceptedAt ? new Date(data.connectionAcceptedAt) : null,
    dmSentAtDate: data.dmSentAt ? new Date(data.dmSentAt) : null,
    lastFollowUpAtDate: data.lastFollowUpAt ? new Date(data.lastFollowUpAt) : null,
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
    firstMessageDateDate: data.firstMessageDate ? new Date(data.firstMessageDate) : null,
    referralGivenAtDate: data.referralGivenAt ? new Date(data.referralGivenAt) : null,
    connectionRequestSentAtDate: data.connectionRequestSentAt ? new Date(data.connectionRequestSentAt) : null,
    connectionAcceptedAtDate: data.connectionAcceptedAt ? new Date(data.connectionAcceptedAt) : null,
    dmSentAtDate: data.dmSentAt ? new Date(data.dmSentAt) : null,
    lastFollowUpAtDate: data.lastFollowUpAt ? new Date(data.lastFollowUpAt) : null,
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

