import { makeConversationsRepo } from '../infra/conversations.repo';
import {
  conversationInboxListDto,
  conversationDetailDto,
  type CreateConversationBody,
  type ListConversationsQuery,
  type UpdateConversationBody,
  type AddMessageBody,
  type UpdateMessageBody,
} from '../http/conversations.schemas';
import { analyzeConversation as analyzeConversationInfra } from '../infra/openai.service';

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
    firstMessageSender: parsed.firstMessageSender ?? 'contact',
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
    priority?: 'low' | 'medium' | 'high' | null;
    notes?: string | null;
    originalUrl?: string | null;
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
  if (input.body.originalUrl !== undefined) {
    updates.originalUrl = input.body.originalUrl;
  }

  // Repository will handle checking if stage is closed and setting priority/nextAction to null
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

/**
 * Use case: analyze a conversation with AI to generate suggestions.
 * Returns an async generator that yields text chunks from the AI stream.
 */
export async function* analyzeConversation(input: {
  userId: string;
  conversationId: string;
  userContext?: string;
}) {
  // First, get the conversation to ensure user has access
  const conversation = await getConversationById({
    userId: input.userId,
    conversationId: input.conversationId,
  });

  if (!conversation) {
    throw new Error('Conversation not found');
  }

  // Stream the AI analysis
  yield* analyzeConversationInfra(conversation, input.userContext);
}

/**
 * Use case: update a message's body and/or sentAt.
 */
export async function updateMessage(input: {
  userId: string;
  messageId: string;
  body: UpdateMessageBody;
}) {
  const repo = makeConversationsRepo();

  const updated = await repo.updateMessage({
    userId: input.userId,
    messageId: input.messageId,
    body: input.body.body,
    sentAt: input.body.sentAt ? new Date(input.body.sentAt) : undefined,
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
 * Use case: delete a message.
 */
export async function deleteMessage(input: {
  userId: string;
  messageId: string;
}) {
  const repo = makeConversationsRepo();

  const updated = await repo.deleteMessage({
    userId: input.userId,
    messageId: input.messageId,
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
 * Use case: toggle message status between pending and confirmed.
 */
export async function toggleMessageStatus(input: {
  userId: string;
  messageId: string;
}) {
  const repo = makeConversationsRepo();

  const updated = await repo.toggleMessageStatus({
    userId: input.userId,
    messageId: input.messageId,
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
 * Use case: delete a conversation.
 */
export async function deleteConversation(input: {
  userId: string;
  conversationId: string;
}) {
  const repo = makeConversationsRepo();
  const deleted = await repo.deleteConversation({
    userId: input.userId,
    conversationId: input.conversationId,
  });

  if (!deleted) {
    return null;
  }

  return { success: true };
}
