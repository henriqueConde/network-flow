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
    categoryId: input.categoryId,
    stageId: input.stageId,
    primaryPlatform: input.primaryPlatform,
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
      primaryPlatform: contact.primaryPlatform,
      profileLinks: contact.profileLinks as Record<string, string> | null,
      tags: contact.tags,
      categoryId: contact.categoryId,
      stageId: contact.stageId,
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
    primaryPlatform: contact.primaryPlatform,
    profileLinks: contact.profileLinks as Record<string, string> | null,
    tags: contact.tags,
    categoryId: contact.categoryId,
    stageId: contact.stageId,
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
    primaryPlatform?: string | null;
    profileLinks?: Record<string, string> | null;
    tags?: string[];
    categoryId?: string | null;
    stageId?: string | null;
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
  if (input.body.primaryPlatform !== undefined) {
    updates.primaryPlatform = input.body.primaryPlatform;
  }
  if (input.body.profileLinks !== undefined) {
    updates.profileLinks = input.body.profileLinks;
  }
  if (input.body.tags !== undefined) {
    updates.tags = input.body.tags;
  }
  if (input.body.categoryId !== undefined) {
    updates.categoryId = input.body.categoryId;
  }
  if (input.body.stageId !== undefined) {
    updates.stageId = input.body.stageId;
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
    primaryPlatform: updated.primaryPlatform,
    profileLinks: updated.profileLinks as Record<string, string> | null,
    tags: updated.tags,
    categoryId: updated.categoryId,
    stageId: updated.stageId,
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
      primaryPlatform: input.body.primaryPlatform ?? null,
      profileLinks: input.body.profileLinks ?? null,
      tags: input.body.tags ?? [],
      categoryId: input.body.categoryId ?? null,
      stageId: input.body.stageId ?? null,
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
