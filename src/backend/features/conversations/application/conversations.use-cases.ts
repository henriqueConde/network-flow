import { makeConversationsRepo } from '../infra/conversations.repo';
import {
  conversationInboxListDto,
  type CreateConversationBody,
  type ListConversationsQuery,
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


