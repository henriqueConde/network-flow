import { z } from 'zod';

/**
 * DTO for a stage.
 */
export const stageDto = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  order: z.number(),
});

export type StageDto = z.infer<typeof stageDto>;

/**
 * Response DTO for listing stages.
 */
export const stagesListDto = z.array(stageDto);

export type StagesListDto = z.infer<typeof stagesListDto>;

/**
 * Query schema for listing stages.
 */
export const listStagesQuery = z.object({
  ensureDefaults: z
    .string()
    .optional()
    .transform((val) => val === 'true'),
});

export type ListStagesQuery = z.infer<typeof listStagesQuery>;

