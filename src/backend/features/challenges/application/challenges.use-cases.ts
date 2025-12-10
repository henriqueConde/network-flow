import { makeChallengesRepo } from '../infra/challenges.repo';
import {
  challengesListDto,
  challengeDetailDto,
  challengeResponseDto,
  type ListChallengesQuery,
  type CreateChallengeBody,
  type UpdateChallengeBody,
} from '../http/challenges.schemas';

/**
 * Use case: list challenges for the Challenges Directory.
 */
export async function listChallenges(input: { userId: string } & ListChallengesQuery) {
  const repo = makeChallengesRepo();
  const result = await repo.listChallenges({
    userId: input.userId,
    search: input.search,
    active: input.active,
    page: input.page,
    pageSize: input.pageSize,
    sortBy: input.sortBy,
    sortDir: input.sortDir,
  });

  // Transform to DTO format
  const challenges = result.challenges.map((challenge) => ({
    id: challenge.id,
    name: challenge.name,
    startDate: challenge.startDate.toISOString(),
    endDate: challenge.endDate.toISOString(),
    goal: challenge.goal,
    outreachesCount: challenge.outreachesCount,
    acceptsCount: challenge.acceptsCount,
    repliesCount: challenge.repliesCount,
    callsCount: challenge.callsCount,
    interviewsCount: challenge.interviewsCount,
    createdAt: challenge.createdAt.toISOString(),
    updatedAt: challenge.updatedAt.toISOString(),
  }));

  return challengesListDto.parse({
    challenges,
    total: result.total,
    page: result.page,
    pageSize: result.pageSize,
    totalPages: result.totalPages,
  });
}

/**
 * Use case: get a single challenge by ID.
 */
export async function getChallengeById(input: { userId: string; challengeId: string }) {
  const repo = makeChallengesRepo();
  const challenge = await repo.getChallengeById({
    userId: input.userId,
    challengeId: input.challengeId,
  });

  if (!challenge) {
    return null;
  }

  return challengeDetailDto.parse({
    id: challenge.id,
    name: challenge.name,
    startDate: challenge.startDate.toISOString(),
    endDate: challenge.endDate.toISOString(),
    goal: challenge.goal,
    outreachesCount: challenge.outreachesCount,
    acceptsCount: challenge.acceptsCount,
    repliesCount: challenge.repliesCount,
    callsCount: challenge.callsCount,
    interviewsCount: challenge.interviewsCount,
    notes: challenge.notes,
    createdAt: challenge.createdAt.toISOString(),
    updatedAt: challenge.updatedAt.toISOString(),
  });
}

/**
 * Use case: create a new challenge.
 */
export async function createChallenge(input: { userId: string } & CreateChallengeBody) {
  const repo = makeChallengesRepo();
  const challenge = await repo.createChallenge({
    userId: input.userId,
    name: input.name,
    startDate: new Date(input.startDate),
    endDate: new Date(input.endDate),
    goal: input.goal,
    outreachesCount: input.outreachesCount ?? 0,
    acceptsCount: input.acceptsCount ?? 0,
    repliesCount: input.repliesCount ?? 0,
    callsCount: input.callsCount ?? 0,
    interviewsCount: input.interviewsCount ?? 0,
    notes: input.notes || null,
  });

  return challengeResponseDto.parse({
    id: challenge.id,
    name: challenge.name,
    startDate: challenge.startDate.toISOString(),
    endDate: challenge.endDate.toISOString(),
    goal: challenge.goal,
    outreachesCount: challenge.outreachesCount,
    acceptsCount: challenge.acceptsCount,
    repliesCount: challenge.repliesCount,
    callsCount: challenge.callsCount,
    interviewsCount: challenge.interviewsCount,
    notes: challenge.notes,
    createdAt: challenge.createdAt.toISOString(),
    updatedAt: challenge.updatedAt.toISOString(),
  });
}

/**
 * Use case: update an existing challenge.
 */
export async function updateChallenge(
  input: { userId: string; challengeId: string } & UpdateChallengeBody,
) {
  const repo = makeChallengesRepo();
  const challenge = await repo.updateChallenge({
    userId: input.userId,
    challengeId: input.challengeId,
    name: input.name,
    startDate: input.startDate ? new Date(input.startDate) : undefined,
    endDate: input.endDate ? new Date(input.endDate) : undefined,
    goal: input.goal,
    outreachesCount: input.outreachesCount,
    acceptsCount: input.acceptsCount,
    repliesCount: input.repliesCount,
    callsCount: input.callsCount,
    interviewsCount: input.interviewsCount,
    notes: input.notes,
  });

  return challengeResponseDto.parse({
    id: challenge.id,
    name: challenge.name,
    startDate: challenge.startDate.toISOString(),
    endDate: challenge.endDate.toISOString(),
    goal: challenge.goal,
    outreachesCount: challenge.outreachesCount,
    acceptsCount: challenge.acceptsCount,
    repliesCount: challenge.repliesCount,
    callsCount: challenge.callsCount,
    interviewsCount: challenge.interviewsCount,
    notes: challenge.notes,
    createdAt: challenge.createdAt.toISOString(),
    updatedAt: challenge.updatedAt.toISOString(),
  });
}

/**
 * Use case: delete a challenge.
 */
export async function deleteChallenge(input: { userId: string; challengeId: string }) {
  const repo = makeChallengesRepo();
  await repo.deleteChallenge({
    userId: input.userId,
    challengeId: input.challengeId,
  });
}


