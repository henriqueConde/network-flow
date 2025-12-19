import { makeTodayRepo } from '../infra/today.repo';
import {
  todayMetricsDto,
  todayActionsDto,
  newMessagesDto,
  overdueItemsDto,
} from '../http/today.schemas';

/**
 * Use case: Get today's metrics
 */
export async function getTodayMetrics(userId: string) {
  const repo = makeTodayRepo();
  const metrics = await repo.getMetrics(userId);
  return todayMetricsDto.parse(metrics);
}

/**
 * Use case: Get today's prioritized actions
 */
export async function getTodayActions(userId: string) {
  const repo = makeTodayRepo();
  const actions = await repo.getTodayActions(userId);

  // Transform to DTO format (convert Date to ISO string)
  const actionsDto = actions.map((action) => ({
    ...action,
    dueAt: action.dueAt.toISOString(),
  }));

  return todayActionsDto.parse(actionsDto);
}

/**
 * Use case: Get new messages
 */
export async function getNewMessages(userId: string) {
  const repo = makeTodayRepo();
  const messages = await repo.getNewMessages(userId);

  // Transform to DTO format (convert Date to ISO string)
  const messagesDto = messages.map((message) => ({
    ...message,
    receivedAt: message.receivedAt.toISOString(),
  }));

  return newMessagesDto.parse(messagesDto);
}

/**
 * Use case: Get pending messages
 */
export async function getPendingMessages(userId: string) {
  const repo = makeTodayRepo();
  const items = await repo.getPendingMessages(userId);

  // Transform to DTO format (convert Date to ISO string)
  const itemsDto = items.map((item) => ({
    ...item,
    dueDate: item.dueDate.toISOString(),
  }));

  return overdueItemsDto.parse(itemsDto);
}

/**
 * Use case: Get overdue follow-ups
 */
export async function getOverdueFollowups(userId: string) {
  const repo = makeTodayRepo();
  const items = await repo.getOverdueFollowups(userId);

  // Transform to DTO format (convert Date to ISO string)
  const itemsDto = items.map((item) => ({
    ...item,
    dueDate: item.dueDate.toISOString(),
  }));

  return overdueItemsDto.parse(itemsDto);
}

/**
 * Use case: Get overdue items (deprecated - kept for backward compatibility)
 */
export async function getOverdueItems(userId: string) {
  const repo = makeTodayRepo();
  const items = await repo.getOverdueItems(userId);

  // Transform to DTO format (convert Date to ISO string)
  const itemsDto = items.map((item) => ({
    ...item,
    dueDate: item.dueDate.toISOString(),
  }));

  return overdueItemsDto.parse(itemsDto);
}







