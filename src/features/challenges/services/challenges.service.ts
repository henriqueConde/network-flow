import { client } from '@/shared/services/http/client';
import { z } from 'zod';

/**
 * Challenge list item DTO.
 */
const ChallengeListItemDto = z.object({
  id: z.string(),
  name: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  goal: z.number(),
  outreachesCount: z.number(),
  acceptsCount: z.number(),
  repliesCount: z.number(),
  callsCount: z.number(),
  interviewsCount: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ChallengeListItem = z.infer<typeof ChallengeListItemDto> & {
  createdAtDate: Date;
  updatedAtDate: Date;
  startDateDate: Date;
  endDateDate: Date;
};

/**
 * Challenges list response DTO.
 */
const ChallengesListDto = z.object({
  challenges: z.array(ChallengeListItemDto),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
});

/**
 * Challenge detail DTO.
 */
const ChallengeDetailDto = z.object({
  id: z.string(),
  name: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  goal: z.number(),
  outreachesCount: z.number(),
  acceptsCount: z.number(),
  repliesCount: z.number(),
  callsCount: z.number(),
  interviewsCount: z.number(),
  notes: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type ChallengeDetail = Omit<z.infer<typeof ChallengeDetailDto>, 'createdAt' | 'updatedAt' | 'startDate' | 'endDate'> & {
  createdAtDate: Date;
  updatedAtDate: Date;
  startDateDate: Date;
  endDateDate: Date;
};

/**
 * Create challenge payload.
 */
const CreateChallengeBody = z.object({
  name: z.string().min(1),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  goal: z.number().int().min(1),
  outreachesCount: z.number().int().min(0).optional(),
  acceptsCount: z.number().int().min(0).optional(),
  repliesCount: z.number().int().min(0).optional(),
  callsCount: z.number().int().min(0).optional(),
  interviewsCount: z.number().int().min(0).optional(),
  notes: z.string().optional(),
});

export type CreateChallengePayload = z.infer<typeof CreateChallengeBody>;

/**
 * Update challenge payload.
 */
const UpdateChallengeBody = z.object({
  name: z.string().min(1).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  goal: z.number().int().min(1).optional(),
  outreachesCount: z.number().int().min(0).optional(),
  acceptsCount: z.number().int().min(0).optional(),
  repliesCount: z.number().int().min(0).optional(),
  callsCount: z.number().int().min(0).optional(),
  interviewsCount: z.number().int().min(0).optional(),
  notes: z.string().optional(),
});

export type UpdateChallengePayload = z.infer<typeof UpdateChallengeBody>;

/**
 * Fetch challenges for the directory.
 */
export async function listChallenges(params: {
  search?: string;
  active?: boolean;
  page: number;
  pageSize: number;
  sortBy: 'name' | 'startDate' | 'endDate' | 'updatedAt' | 'createdAt';
  sortDir: 'asc' | 'desc';
}): Promise<{
  challenges: ChallengeListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}> {
  const res = await client.get('/api/challenges', {
    params,
  });
  const data = ChallengesListDto.parse(res.data);

  return {
    ...data,
    challenges: data.challenges.map((item) => ({
      ...item,
      createdAtDate: new Date(item.createdAt),
      updatedAtDate: new Date(item.updatedAt),
      startDateDate: new Date(item.startDate),
      endDateDate: new Date(item.endDate),
    })),
  };
}

/**
 * Fetch a single challenge by ID with full detail.
 */
export async function getChallengeDetail(id: string): Promise<ChallengeDetail> {
  const res = await client.get(`/api/challenges/${id}`);
  const data = ChallengeDetailDto.parse(res.data);

  return {
    ...data,
    createdAtDate: new Date(data.createdAt),
    updatedAtDate: new Date(data.updatedAt),
    startDateDate: new Date(data.startDate),
    endDateDate: new Date(data.endDate),
  };
}

/**
 * Create a new challenge.
 */
export async function createChallenge(payload: CreateChallengePayload) {
  const body = CreateChallengeBody.parse(payload);
  const res = await client.post('/api/challenges', body);
  return res.data as { id: string };
}

/**
 * Update a challenge.
 */
export async function updateChallenge(
  id: string,
  payload: UpdateChallengePayload,
): Promise<ChallengeDetail> {
  const body = UpdateChallengeBody.parse(payload);
  const res = await client.patch(`/api/challenges/${id}`, body);
  const data = ChallengeDetailDto.parse(res.data);

  return {
    ...data,
    createdAtDate: new Date(data.createdAt),
    updatedAtDate: new Date(data.updatedAt),
    startDateDate: new Date(data.startDate),
    endDateDate: new Date(data.endDate),
  };
}

/**
 * Delete a challenge.
 */
export async function deleteChallenge(id: string): Promise<void> {
  await client.delete(`/api/challenges/${id}`);
}


