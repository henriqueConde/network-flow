import { z } from 'zod';

export const listChallengesQuery = z.object({
  search: z.string().trim().optional(),
  active: z.coerce.boolean().optional(), // Filter by active (current date between startDate and endDate)
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'startDate', 'endDate', 'updatedAt', 'createdAt']).optional().default('startDate'),
  sortDir: z.enum(['asc', 'desc']).optional().default('desc'),
});

export type ListChallengesQuery = z.infer<typeof listChallengesQuery>;

/**
 * Response DTO for a single challenge row in the Challenges list.
 */
export const challengeListItemDto = z.object({
  id: z.string().uuid(),
  name: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  goal: z.number(),
  outreachesPerDay: z.number().nullable().optional(),
  outreachesCount: z.number(),
  acceptsCount: z.number(),
  repliesCount: z.number(),
  callsCount: z.number(),
  interviewsCount: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ChallengeListItemDto = z.infer<typeof challengeListItemDto>;

/**
 * Response DTO for challenges list with pagination.
 */
export const challengesListDto = z.object({
  challenges: z.array(challengeListItemDto),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
});

export type ChallengesListDto = z.infer<typeof challengesListDto>;

/**
 * Response DTO for challenge detail.
 */
export const challengeDetailDto = z.object({
  id: z.string().uuid(),
  name: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  goal: z.number(),
  outreachesPerDay: z.number().nullable().optional(),
  outreachesCount: z.number(),
  acceptsCount: z.number(),
  repliesCount: z.number(),
  callsCount: z.number(),
  interviewsCount: z.number(),
  notes: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ChallengeDetailDto = z.infer<typeof challengeDetailDto>;

/**
 * Request body for creating a challenge.
 */
export const createChallengeBody = z.object({
  name: z.string().min(1, 'Challenge name is required'),
  startDate: z.string().datetime('Start date must be a valid datetime'),
  endDate: z.string().datetime('End date must be a valid datetime'),
  goal: z.number().int().min(1, 'Goal must be at least 1'),
  outreachesPerDay: z.number().int().min(1).optional().nullable(),
  outreachesCount: z.number().int().min(0).optional().default(0),
  acceptsCount: z.number().int().min(0).optional().default(0),
  repliesCount: z.number().int().min(0).optional().default(0),
  callsCount: z.number().int().min(0).optional().default(0),
  interviewsCount: z.number().int().min(0).optional().default(0),
  notes: z.string().optional(),
});

export type CreateChallengeBody = z.infer<typeof createChallengeBody>;

/**
 * Request body for updating a challenge.
 */
export const updateChallengeBody = createChallengeBody.partial();

export type UpdateChallengeBody = z.infer<typeof updateChallengeBody>;

/**
 * Response DTO for create/update operations.
 */
export const challengeResponseDto = challengeDetailDto;

export type ChallengeResponseDto = z.infer<typeof challengeResponseDto>;


