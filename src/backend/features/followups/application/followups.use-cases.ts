import { makeFollowupsRepo } from '../infra/followups.repo';
import { runFollowupsResponseDto } from '../http/followups.schemas';

/**
 * Use case: Run automatic follow-ups for a single user.
 */
export async function runFollowupsForUser(userId: string) {
  const repo = makeFollowupsRepo();
  const result = await repo.runAutoFollowupsForUser(userId);
  return runFollowupsResponseDto.parse(result);
}


