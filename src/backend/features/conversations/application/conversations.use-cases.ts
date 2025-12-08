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
    emailStatus: input.emailStatus,
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
    opportunityId: parsed.opportunityId,
    challengeId: parsed.challengeId,
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
    responseReceivedAt: conversation.responseReceivedAt
      ? conversation.responseReceivedAt.toISOString()
      : null,
    emailSentAt: conversation.emailSentAt
      ? conversation.emailSentAt.toISOString()
      : null,
    emailFollowUpDates: conversation.emailFollowUpDates.map((date) => date.toISOString()),
    followUp1Date: conversation.followUp1Date
      ? conversation.followUp1Date.toISOString()
      : null,
    followUp2Date: conversation.followUp2Date
      ? conversation.followUp2Date.toISOString()
      : null,
    followUp3Date: conversation.followUp3Date
      ? conversation.followUp3Date.toISOString()
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
    challengeId?: string | null;
    nextActionType?: string | null;
    nextActionDueAt?: Date | null;
    priority?: 'low' | 'medium' | 'high' | null;
    notes?: string | null;
    originalUrl?: string | null;
    autoFollowupsEnabled?: boolean;
    strategyIds?: string[];
    responseReceived?: boolean;
    responseReceivedAt?: Date | null;
    emailSentAt?: Date | null;
    loomVideoUrl?: string | null;
    loomSent?: boolean;
    emailFollowUpDates?: Date[];
    emailStatus?: 'no_reply' | 'replied' | 'call_scheduled' | 'rejected' | 'in_process' | null;
    followUp1Date?: Date | null;
    followUp2Date?: Date | null;
    followUp3Date?: Date | null;
  } = {};

  if (input.body.categoryId !== undefined) {
    updates.categoryId = input.body.categoryId;
  }
  if (input.body.stageId !== undefined) {
    updates.stageId = input.body.stageId;
  }
  if (input.body.challengeId !== undefined) {
    updates.challengeId = input.body.challengeId;
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
  if (input.body.autoFollowupsEnabled !== undefined) {
    updates.autoFollowupsEnabled = input.body.autoFollowupsEnabled;
  }
  if (input.body.strategyIds !== undefined) {
    updates.strategyIds = input.body.strategyIds;
  }
  if (input.body.responseReceived !== undefined) {
    updates.responseReceived = input.body.responseReceived;
  }
  if (input.body.responseReceivedAt !== undefined) {
    updates.responseReceivedAt = input.body.responseReceivedAt
      ? new Date(input.body.responseReceivedAt)
      : null;
  }
  if (input.body.emailSentAt !== undefined) {
    updates.emailSentAt = input.body.emailSentAt
      ? new Date(input.body.emailSentAt)
      : null;
  }
  if (input.body.loomVideoUrl !== undefined) {
    updates.loomVideoUrl = input.body.loomVideoUrl === '' ? null : input.body.loomVideoUrl;
  }
  if (input.body.loomSent !== undefined) {
    updates.loomSent = input.body.loomSent;
  }
  if (input.body.emailFollowUpDates !== undefined) {
    updates.emailFollowUpDates = input.body.emailFollowUpDates.map((date) => new Date(date));
  }
  if (input.body.emailStatus !== undefined) {
    updates.emailStatus = input.body.emailStatus;
  }
  if (input.body.followUp1Date !== undefined) {
    updates.followUp1Date = input.body.followUp1Date
      ? new Date(input.body.followUp1Date)
      : null;
  }
  if (input.body.followUp2Date !== undefined) {
    updates.followUp2Date = input.body.followUp2Date
      ? new Date(input.body.followUp2Date)
      : null;
  }
  if (input.body.followUp3Date !== undefined) {
    updates.followUp3Date = input.body.followUp3Date
      ? new Date(input.body.followUp3Date)
      : null;
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
