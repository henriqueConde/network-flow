import { client } from '@/shared/services/http/client';
import { z } from 'zod';

const StageDto = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  order: z.number(),
});

const StagesListDto = z.array(StageDto);

export type Stage = z.infer<typeof StageDto>;

/**
 * Fetch all stages for the current user.
 */
export async function listStages(): Promise<Stage[]> {
  const res = await client.get('/api/stages');
  return StagesListDto.parse(res.data);
}

/**
 * Ensure default stages exist for the current user.
 * Creates default stages if none are found.
 */
export async function ensureDefaultStages(): Promise<Stage[]> {
  const res = await client.get('/api/stages', { params: { ensureDefaults: 'true' } });
  return StagesListDto.parse(res.data);
}

