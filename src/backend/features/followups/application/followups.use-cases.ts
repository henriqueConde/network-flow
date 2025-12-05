import { makeFollowupsRepo } from '../infra/followups.repo';
import {
  runFollowupsResponseDto,
  scheduledFollowupsListDto,
} from '../http/followups.schemas';

/**
 * Use case: Run automatic follow-ups for a single user.
 */
export async function runFollowupsForUser(userId: string) {
  const repo = makeFollowupsRepo();
  const result = await repo.runAutoFollowupsForUser(userId);
  return runFollowupsResponseDto.parse(result);
}

/**
 * Use case: List scheduled follow-ups for a user, grouped by date.
 */
export async function listScheduledFollowups(userId: string) {
  const repo = makeFollowupsRepo();
  const result = await repo.listScheduledFollowups(userId);

  // Convert Dates to ISO strings for DTO
  const dto = result.map((group) => ({
    date: group.date,
    followups: group.followups.map((f) => ({
      ...f,
      lastMessageAt: f.lastMessageAt.toISOString(),
      dueDate: f.dueDate.toISOString(),
    })),
  }));

  return scheduledFollowupsListDto.parse(dto);
}


