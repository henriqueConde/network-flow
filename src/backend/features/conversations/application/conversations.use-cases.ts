import { makeConversationsRepo } from '../infra/conversations.repo';
import {
  conversationInboxListDto,
  conversationDetailDto,
  type CreateConversationBody,
  type ListConversationsQuery,
  type UpdateConversationBody,
  type AddMessageBody,
} from '../http/conversations.schemas';

/**
 * Use case: list conversations for the Inbox.
 * Expects already-validated query params from the HTTP layer.
 */
export async function listConversations(
  input: { userId: string } & ListConversationsQuery,
) {
  const repo = makeConversationsRepo();
  const rows = await repo.listConversations({
    userId: input.userId,
    search: input.search,
    status: input.status,
    categoryId: input.categoryId,
    stageId: input.stageId,
    page: input.page,
    pageSize: input.pageSize,
    sortBy: input.sortBy,
    sortDir: input.sortDir,
  });

  // Normalize Dates to ISO strings for DTO
  const dto = rows.map((row) => ({
    ...row,
    lastMessageAt: row.lastMessageAt ? row.lastMessageAt.toISOString() : null,
  }));

  return conversationInboxListDto.parse(dto);
}

/**
 * Use case: create a new conversation (and contact if needed).
 * Expects already-validated body payload from the HTTP layer.
 */
export async function createConversation(input: {
  userId: string;
  body: CreateConversationBody;
}) {
  const parsed = input.body;
  const repo = makeConversationsRepo();

  const conversation = await repo.createConversation({
    userId: input.userId,
    contactId: parsed.contactId,
    contactName: parsed.contactName,
    contactCompany: parsed.contactCompany,
    channel: parsed.channel,
    pastedText: parsed.pastedText,
    categoryId: parsed.categoryId,
    stageId: parsed.stageId,
    priority: parsed.priority,
  });

  return {
    id: conversation.id,
  };
}

/**
 * Use case: get a single conversation by ID with full detail.
 */
export async function getConversationById(input: {
  userId: string;
  conversationId: string;
}) {
  const repo = makeConversationsRepo();
  const conversation = await repo.getConversationById({
    userId: input.userId,
    conversationId: input.conversationId,
  });

  if (!conversation) {
    return null;
  }

  // Normalize Dates to ISO strings for DTO
  const dto = {
    ...conversation,
    nextActionDueAt: conversation.nextActionDueAt
      ? conversation.nextActionDueAt.toISOString()
      : null,
    lastMessageAt: conversation.lastMessageAt
      ? conversation.lastMessageAt.toISOString()
      : null,
    messages: conversation.messages.map((msg) => ({
      ...msg,
      sentAt: msg.sentAt.toISOString(),
    })),
    latestEmailEvent: conversation.latestEmailEvent
      ? {
          ...conversation.latestEmailEvent,
          emailReceivedAt: conversation.latestEmailEvent.emailReceivedAt.toISOString(),
        }
      : null,
  };

  return conversationDetailDto.parse(dto);
}

/**
 * Use case: update a conversation's metadata.
 * Expects already-validated body payload from the HTTP layer.
 */
export async function updateConversation(input: {
  userId: string;
  conversationId: string;
  body: UpdateConversationBody;
}) {
  const repo = makeConversationsRepo();

  const updates: {
    categoryId?: string | null;
    stageId?: string | null;
    nextActionType?: string | null;
    nextActionDueAt?: Date | null;
    priority?: 'low' | 'medium' | 'high';
    notes?: string | null;
  } = {};

  if (input.body.categoryId !== undefined) {
    updates.categoryId = input.body.categoryId;
  }
  if (input.body.stageId !== undefined) {
    updates.stageId = input.body.stageId;
  }
  if (input.body.nextActionType !== undefined) {
    updates.nextActionType = input.body.nextActionType;
  }
  if (input.body.nextActionDueAt !== undefined) {
    updates.nextActionDueAt = input.body.nextActionDueAt
      ? new Date(input.body.nextActionDueAt)
      : null;
  }
  if (input.body.priority !== undefined) {
    updates.priority = input.body.priority;
  }
  if (input.body.notes !== undefined) {
    updates.notes = input.body.notes;
  }

  const updated = await repo.updateConversation({
    userId: input.userId,
    conversationId: input.conversationId,
    updates,
  });

  if (!updated) {
    return null;
  }

  // Normalize Dates to ISO strings for DTO
  const dto = {
    ...updated,
    nextActionDueAt: updated.nextActionDueAt ? updated.nextActionDueAt.toISOString() : null,
    lastMessageAt: updated.lastMessageAt ? updated.lastMessageAt.toISOString() : null,
    messages: updated.messages.map((msg) => ({
      ...msg,
      sentAt: msg.sentAt.toISOString(),
    })),
    latestEmailEvent: updated.latestEmailEvent
      ? {
          ...updated.latestEmailEvent,
          emailReceivedAt: updated.latestEmailEvent.emailReceivedAt.toISOString(),
        }
      : null,
  };

  return conversationDetailDto.parse(dto);
}

/**
 * Use case: add a message to a conversation.
 * Expects already-validated body payload from the HTTP layer.
 */
export async function addMessage(input: {
  userId: string;
  conversationId: string;
  body: AddMessageBody;
}) {
  const repo = makeConversationsRepo();

  const sentAt = new Date(input.body.sentAt);

  const updated = await repo.addMessage({
    userId: input.userId,
    conversationId: input.conversationId,
    body: input.body.body,
    sender: input.body.sender,
    sentAt,
  });

  if (!updated) {
    return null;
  }

  // Normalize Dates to ISO strings for DTO
  const dto = {
    ...updated,
    nextActionDueAt: updated.nextActionDueAt ? updated.nextActionDueAt.toISOString() : null,
    lastMessageAt: updated.lastMessageAt ? updated.lastMessageAt.toISOString() : null,
    messages: updated.messages.map((msg) => ({
      ...msg,
      sentAt: msg.sentAt.toISOString(),
    })),
    latestEmailEvent: updated.latestEmailEvent
      ? {
          ...updated.latestEmailEvent,
          emailReceivedAt: updated.latestEmailEvent.emailReceivedAt.toISOString(),
        }
      : null,
  };

  return conversationDetailDto.parse(dto);
}
