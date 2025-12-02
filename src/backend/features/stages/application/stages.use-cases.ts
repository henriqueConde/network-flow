import { makeStagesRepo } from '../infra/stages.repo';
import { stagesListDto } from '../http/stages.schemas';

/**
 * Use case: Get all stages for a user.
 */
export async function listStages(userId: string) {
  const repo = makeStagesRepo();
  const stages = await repo.listStages(userId);

  return stagesListDto.parse(stages);
}

/**
 * Use case: Ensure default stages exist for a user.
 * Creates default stages if they don't exist.
 */
export async function ensureDefaultStages(userId: string) {
  const repo = makeStagesRepo();
  await repo.ensureDefaultStages(userId);
  
  // Return all stages after ensuring defaults
  return listStages(userId);
}
