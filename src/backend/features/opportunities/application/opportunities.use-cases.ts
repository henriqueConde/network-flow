import { makeOpportunitiesRepo } from '../infra/opportunities.repo';

/**
 * Use case: Get an opportunity by ID with all related conversations.
 */
export async function getOpportunityById(input: {
  userId: string;
  opportunityId: string;
}) {
  const repo = makeOpportunitiesRepo();
  const opportunity = await repo.getOpportunityById({
    userId: input.userId,
    opportunityId: input.opportunityId,
  });

  if (!opportunity) {
    return null;
  }

  // Normalize Dates to ISO strings for DTO
  return {
    ...opportunity,
    nextActionDueAt: opportunity.nextActionDueAt
      ? opportunity.nextActionDueAt.toISOString()
      : null,
    createdAt: opportunity.createdAt.toISOString(),
    updatedAt: opportunity.updatedAt.toISOString(),
    conversations: opportunity.conversations.map((conv) => ({
      id: conv.id,
      // Contact info for each conversation card in opportunity detail
      // These fields are required by `conversationDetailDto`
      contactName: conv.contactName,
      contactCompany: conv.contactCompany,
      channel: conv.channel,
      stageId: conv.stageId,
      stageName: conv.stageName,
      lastMessageAt: conv.lastMessageAt
        ? conv.lastMessageAt.toISOString()
        : null,
      lastMessageSide: conv.lastMessageSide,
      lastMessageSnippet: conv.lastMessageSnippet,
      isOutOfSync: conv.isOutOfSync,
      originalUrl: conv.originalUrl,
      messages: conv.messages.map((msg) => ({
        id: msg.id,
        sender: msg.sender,
        body: msg.body,
        sentAt: msg.sentAt.toISOString(),
        source: msg.source,
        status: msg.status,
      })),
      latestEmailEvent: conv.latestEmailEvent
        ? {
          id: conv.latestEmailEvent.id,
          senderName: conv.latestEmailEvent.senderName,
          snippet: conv.latestEmailEvent.snippet,
          emailReceivedAt: conv.latestEmailEvent.emailReceivedAt.toISOString(),
        }
        : null,
    })),
  };
}

/**
 * Use case: List opportunities for a user.
 */
export async function listOpportunities(input: {
  userId: string;
  search?: string;
  categoryId?: string;
  stageId?: string;
  page?: number;
  pageSize?: number;
  sortBy?: 'updatedAt' | 'nextActionDueAt' | 'priority';
  sortDir?: 'asc' | 'desc';
}) {
  const repo = makeOpportunitiesRepo();
  const result = await repo.listOpportunities({
    userId: input.userId,
    search: input.search,
    categoryId: input.categoryId,
    stageId: input.stageId,
    page: input.page ?? 1,
    pageSize: input.pageSize ?? 20,
    sortBy: input.sortBy ?? 'updatedAt',
    sortDir: input.sortDir ?? 'desc',
  });

  // Normalize Dates to ISO strings for DTO
  return {
    ...result,
    items: result.items.map((item) => ({
      ...item,
      nextActionDueAt: item.nextActionDueAt
        ? item.nextActionDueAt.toISOString()
        : null,
      updatedAt: item.updatedAt.toISOString(),
      lastMessageAt: item.lastMessageAt
        ? item.lastMessageAt.toISOString()
        : null,
    })),
  };
}

/**
 * Use case: Create a new opportunity.
 */
export async function createOpportunity(input: {
  userId: string;
  contactId: string;
  title?: string;
  categoryId?: string;
  stageId?: string;
  nextActionType?: string;
  nextActionDueAt?: string;
  priority?: 'low' | 'medium' | 'high' | null;
  notes?: string;
}) {
  const repo = makeOpportunitiesRepo();

  const opportunity = await repo.createOpportunity({
    userId: input.userId,
    contactId: input.contactId,
    title: input.title,
    categoryId: input.categoryId,
    stageId: input.stageId,
    nextActionType: input.nextActionType,
    nextActionDueAt: input.nextActionDueAt ? new Date(input.nextActionDueAt) : undefined,
    priority: input.priority,
    notes: input.notes,
  });

  return {
    id: opportunity.id,
  };
}

/**
 * Use case: Update an opportunity's metadata.
 */
export async function updateOpportunity(input: {
  userId: string;
  opportunityId: string;
  title?: string;
  categoryId?: string | null;
  stageId?: string | null;
  nextActionType?: string | null;
  nextActionDueAt?: string | null;
  priority?: 'low' | 'medium' | 'high' | null;
  summary?: string | null;
  notes?: string | null;
  autoFollowupsEnabled?: boolean;
}) {
  const repo = makeOpportunitiesRepo();

  const updated = await repo.updateOpportunity({
    userId: input.userId,
    opportunityId: input.opportunityId,
    title: input.title,
    categoryId: input.categoryId,
    stageId: input.stageId,
    nextActionType: input.nextActionType,
    nextActionDueAt: input.nextActionDueAt ? new Date(input.nextActionDueAt) : null,
    priority: input.priority,
    summary: input.summary,
    notes: input.notes,
    autoFollowupsEnabled: input.autoFollowupsEnabled,
  });

  if (!updated) {
    return null;
  }

  return {
    id: updated.id,
    success: true,
  };
}

/**
 * Use case: Move an opportunity to a different stage.
 */
export async function moveOpportunityToStage(input: {
  userId: string;
  opportunityId: string;
  stageId: string | null;
}) {
  const repo = makeOpportunitiesRepo();

  const updated = await repo.moveOpportunityToStage({
    userId: input.userId,
    opportunityId: input.opportunityId,
    stageId: input.stageId,
  });

  if (!updated) {
    return null;
  }

  return {
    success: true,
  };
}

/**
 * Use case: Delete an opportunity.
 */
export async function deleteOpportunity(input: {
  userId: string;
  opportunityId: string;
}) {
  const repo = makeOpportunitiesRepo();

  const deleted = await repo.deleteOpportunity({
    userId: input.userId,
    opportunityId: input.opportunityId,
  });

  if (!deleted) {
    return null;
  }

  return {
    success: true,
  };
}

