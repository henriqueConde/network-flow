import { makeContactsRepo } from '../infra/contacts.repo';
import {
  contactsListDto,
  contactDetailDto,
  createContactResponseDto,
  type ListContactsQuery,
  type CreateContactBody,
  type UpdateContactBody,
} from '../http/contacts.schemas';

/**
 * Use case: list contacts for the Contacts Directory.
 * Expects already-validated query params from the HTTP layer.
 */
export async function listContacts(input: { userId: string } & ListContactsQuery) {
  const repo = makeContactsRepo();
  const result = await repo.listContacts({
    userId: input.userId,
    search: input.search,
    company: input.company,
    primaryPlatform: input.primaryPlatform,
    warmOrCold: input.warmOrCold,
    connectionStatus: input.connectionStatus,
    contactType: input.contactType,
    page: input.page,
    pageSize: input.pageSize,
    sortBy: input.sortBy,
    sortDir: input.sortDir,
  });

  // Transform to DTO format
  const contacts = result.contacts.map((contact) => {
    const latestConversation = contact.conversations[0] || null;
    return {
      id: contact.id,
      name: contact.name,
      headlineOrRole: contact.headlineOrRole,
      company: contact.company,
      companyId: contact.companyId,
      primaryPlatform: contact.primaryPlatform,
      profileLinks: contact.profileLinks as Record<string, string> | null,
      tags: contact.tags,
      email: contact.email,
      warmOrCold: contact.warmOrCold as 'warm' | 'cold' | null,
      connectionStatus: contact.connectionStatus as 'not_connected' | 'request_sent' | 'connected' | null,
      contactType: contact.contactType,
      strategyIds: contact.strategyIds,
      createdAt: contact.createdAt.toISOString(),
      updatedAt: contact.updatedAt.toISOString(),
      // Summary from latest conversation
      latestConversation: latestConversation
        ? {
            id: latestConversation.id,
            channel: latestConversation.channel,
            categoryName: latestConversation.category?.name || null,
            stageName: latestConversation.stage?.name || null,
            lastMessageAt: latestConversation.lastMessageAt?.toISOString() || null,
          }
        : null,
    };
  });

  return contactsListDto.parse({
    contacts,
    total: result.total,
    page: result.page,
    pageSize: result.pageSize,
    totalPages: result.totalPages,
  });
}

/**
 * Use case: get a single contact by ID with full detail.
 */
export async function getContactById(input: { userId: string; contactId: string }) {
  const repo = makeContactsRepo();
  const contact = await repo.getContactById({
    userId: input.userId,
    contactId: input.contactId,
  });

  if (!contact) {
    return null;
  }

  // Transform to DTO format
  const dto = {
    id: contact.id,
    name: contact.name,
    headlineOrRole: contact.headlineOrRole,
    company: contact.company,
    companyId: contact.companyId,
    primaryPlatform: contact.primaryPlatform,
    profileLinks: contact.profileLinks as Record<string, string> | null,
    tags: contact.tags,
    email: contact.email,
    warmOrCold: contact.warmOrCold as 'warm' | 'cold' | null,
    commonGround: contact.commonGround,
    firstMessageDate: contact.firstMessageDate?.toISOString() || null,
    referralGiven: contact.referralGiven,
    referralGivenAt: contact.referralGivenAt?.toISOString() || null,
    referralDetails: contact.referralDetails,
    connectionRequestSentAt: contact.connectionRequestSentAt?.toISOString() || null,
    connectionAcceptedAt: contact.connectionAcceptedAt?.toISOString() || null,
    connectionStatus: contact.connectionStatus as 'not_connected' | 'request_sent' | 'connected' | null,
    dmSentAt: contact.dmSentAt?.toISOString() || null,
    lastFollowUpAt: contact.lastFollowUpAt?.toISOString() || null,
    contactType: contact.contactType,
    strategyIds: contact.strategyIds,
    createdAt: contact.createdAt.toISOString(),
    updatedAt: contact.updatedAt.toISOString(),
    conversations: contact.conversations.map((conv) => ({
      id: conv.id,
      channel: conv.channel,
      categoryName: conv.category?.name || null,
      stageName: conv.stage?.name || null,
      lastMessageAt: conv.lastMessageAt?.toISOString() || null,
      lastMessageSnippet: conv.lastMessageSnippet,
      priority: conv.priority,
      isOutOfSync: conv.isOutOfSync,
    })),
  };

  return contactDetailDto.parse(dto);
}

/**
 * Use case: update a contact.
 * Expects already-validated body payload from the HTTP layer.
 */
export async function updateContact(input: {
  userId: string;
  contactId: string;
  body: UpdateContactBody;
}) {
  const repo = makeContactsRepo();

  const updates: {
    name?: string;
    headlineOrRole?: string | null;
    company?: string | null;
    companyId?: string | null;
    primaryPlatform?: string | null;
    profileLinks?: Record<string, string> | null;
    tags?: string[];
    email?: string | null;
    warmOrCold?: 'warm' | 'cold' | null;
    commonGround?: string | null;
    firstMessageDate?: Date | null;
    referralGiven?: boolean;
    referralGivenAt?: Date | null;
    referralDetails?: string | null;
    connectionRequestSentAt?: Date | null;
    connectionAcceptedAt?: Date | null;
    connectionStatus?: 'not_connected' | 'request_sent' | 'connected' | null;
    dmSentAt?: Date | null;
    lastFollowUpAt?: Date | null;
    contactType?: string | null;
    strategyIds?: string[];
  } = {};

  if (input.body.name !== undefined) {
    updates.name = input.body.name;
  }
  if (input.body.headlineOrRole !== undefined) {
    updates.headlineOrRole = input.body.headlineOrRole;
  }
  if (input.body.company !== undefined) {
    updates.company = input.body.company;
  }
  if (input.body.companyId !== undefined) {
    updates.companyId = input.body.companyId;
  }
  if (input.body.primaryPlatform !== undefined) {
    updates.primaryPlatform = input.body.primaryPlatform;
  }
  if (input.body.profileLinks !== undefined) {
    updates.profileLinks = input.body.profileLinks;
  }
  if (input.body.tags !== undefined) {
    updates.tags = input.body.tags;
  }
  if (input.body.email !== undefined) {
    updates.email = input.body.email;
  }
  if (input.body.warmOrCold !== undefined) {
    updates.warmOrCold = input.body.warmOrCold;
  }
  if (input.body.commonGround !== undefined) {
    updates.commonGround = input.body.commonGround;
  }
  if (input.body.firstMessageDate !== undefined) {
    updates.firstMessageDate = input.body.firstMessageDate ? new Date(input.body.firstMessageDate) : null;
  }
  if (input.body.referralGiven !== undefined) {
    updates.referralGiven = input.body.referralGiven;
  }
  if (input.body.referralGivenAt !== undefined) {
    updates.referralGivenAt = input.body.referralGivenAt ? new Date(input.body.referralGivenAt) : null;
  }
  if (input.body.referralDetails !== undefined) {
    updates.referralDetails = input.body.referralDetails;
  }
  if (input.body.connectionRequestSentAt !== undefined) {
    updates.connectionRequestSentAt = input.body.connectionRequestSentAt ? new Date(input.body.connectionRequestSentAt) : null;
  }
  if (input.body.connectionAcceptedAt !== undefined) {
    updates.connectionAcceptedAt = input.body.connectionAcceptedAt ? new Date(input.body.connectionAcceptedAt) : null;
  }
  if (input.body.connectionStatus !== undefined) {
    updates.connectionStatus = input.body.connectionStatus;
  }
  if (input.body.dmSentAt !== undefined) {
    updates.dmSentAt = input.body.dmSentAt ? new Date(input.body.dmSentAt) : null;
  }
  if (input.body.lastFollowUpAt !== undefined) {
    updates.lastFollowUpAt = input.body.lastFollowUpAt ? new Date(input.body.lastFollowUpAt) : null;
  }
  if (input.body.contactType !== undefined) {
    updates.contactType = input.body.contactType;
  }
  if (input.body.strategyIds !== undefined) {
    updates.strategyIds = input.body.strategyIds;
  }

  const updated = await repo.updateContact({
    userId: input.userId,
    contactId: input.contactId,
    updates,
  });

  if (!updated) {
    return null;
  }

  // Transform to DTO format
  const dto = {
    id: updated.id,
    name: updated.name,
    headlineOrRole: updated.headlineOrRole,
    company: updated.company,
    companyId: updated.companyId,
    primaryPlatform: updated.primaryPlatform,
    profileLinks: updated.profileLinks as Record<string, string> | null,
    tags: updated.tags,
    email: updated.email,
    warmOrCold: updated.warmOrCold as 'warm' | 'cold' | null,
    commonGround: updated.commonGround,
    firstMessageDate: updated.firstMessageDate?.toISOString() || null,
    referralGiven: updated.referralGiven,
    referralGivenAt: updated.referralGivenAt?.toISOString() || null,
    referralDetails: updated.referralDetails,
    connectionRequestSentAt: updated.connectionRequestSentAt?.toISOString() || null,
    connectionAcceptedAt: updated.connectionAcceptedAt?.toISOString() || null,
    connectionStatus: updated.connectionStatus as 'not_connected' | 'request_sent' | 'connected' | null,
    dmSentAt: updated.dmSentAt?.toISOString() || null,
    lastFollowUpAt: updated.lastFollowUpAt?.toISOString() || null,
    contactType: updated.contactType,
    strategyIds: updated.strategyIds,
    createdAt: updated.createdAt.toISOString(),
    updatedAt: updated.updatedAt.toISOString(),
    conversations: updated.conversations.map((conv) => ({
      id: conv.id,
      channel: conv.channel,
      categoryName: conv.category?.name || null,
      stageName: conv.stage?.name || null,
      lastMessageAt: conv.lastMessageAt?.toISOString() || null,
      lastMessageSnippet: conv.lastMessageSnippet,
      priority: conv.priority,
      isOutOfSync: conv.isOutOfSync,
    })),
  };

  return contactDetailDto.parse(dto);
}

/**
 * Use case: create a new contact.
 * Expects already-validated body payload from the HTTP layer.
 */
export async function createContact(input: {
  userId: string;
  body: CreateContactBody;
}) {
  const repo = makeContactsRepo();

  const contact = await repo.createContact({
    userId: input.userId,
    data: {
      name: input.body.name,
      headlineOrRole: input.body.headlineOrRole ?? null,
      company: input.body.company ?? null,
      companyId: input.body.companyId ?? null,
      primaryPlatform: input.body.primaryPlatform ?? null,
      profileLinks: input.body.profileLinks ?? null,
      tags: input.body.tags ?? [],
      email: input.body.email ?? null,
      warmOrCold: input.body.warmOrCold ?? null,
      commonGround: input.body.commonGround ?? null,
      firstMessageDate: input.body.firstMessageDate ? new Date(input.body.firstMessageDate) : null,
      referralGiven: input.body.referralGiven ?? false,
      referralGivenAt: input.body.referralGivenAt ? new Date(input.body.referralGivenAt) : null,
      referralDetails: input.body.referralDetails ?? null,
      connectionRequestSentAt: input.body.connectionRequestSentAt ? new Date(input.body.connectionRequestSentAt) : null,
      connectionAcceptedAt: input.body.connectionAcceptedAt ? new Date(input.body.connectionAcceptedAt) : null,
      connectionStatus: input.body.connectionStatus ?? null,
      dmSentAt: input.body.dmSentAt ? new Date(input.body.dmSentAt) : null,
      lastFollowUpAt: input.body.lastFollowUpAt ? new Date(input.body.lastFollowUpAt) : null,
      contactType: input.body.contactType ?? null,
      strategyIds: input.body.strategyIds ?? [],
    },
  });

  return {
    id: contact.id,
  };
}

/**
 * Use case: delete a contact.
 */
export async function deleteContact(input: {
  userId: string;
  contactId: string;
}) {
  const repo = makeContactsRepo();
  const deleted = await repo.deleteContact({
    userId: input.userId,
    contactId: input.contactId,
  });

  if (!deleted) {
    return null;
  }

  return { success: true };
}
