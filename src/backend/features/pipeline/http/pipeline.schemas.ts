import { z } from 'zod';
import { prioritySchema } from '@/shared/types';

/**
 * DTO for a single opportunity card in the pipeline.
 */
export const pipelineOpportunityDto = z.object({
  id: z.string().uuid(),
  contactName: z.string(),
  contactCompany: z.string().nullable(),
  title: z.string().nullable(),
  categoryName: z.string().nullable(),
  lastMessageAt: z.string().datetime().nullable(),
  nextActionType: z.string().nullable(),
  nextActionDueAt: z.string().datetime().nullable(),
  priority: prioritySchema,
  isOutOfSync: z.boolean(),
});

export type PipelineOpportunityDto = z.infer<typeof pipelineOpportunityDto>;

/**
 * DTO for a stage column in the pipeline.
 * The id can be a UUID (for real stages) or '__unassigned__' (for the special unassigned stage).
 */
export const pipelineStageDto = z.object({
  id: z.union([z.string().uuid(), z.literal('__unassigned__')]),
  name: z.string(),
  description: z.string().nullable(),
  order: z.number(),
  opportunities: z.array(pipelineOpportunityDto),
});

export type PipelineStageDto = z.infer<typeof pipelineStageDto>;

/**
 * Response DTO for the pipeline board.
 * Returns all stages with their opportunities, ordered by stage.order.
 */
export const pipelineBoardDto = z.object({
  stages: z.array(pipelineStageDto),
});

export type PipelineBoardDto = z.infer<typeof pipelineBoardDto>;

/**
 * Body schema for moving an opportunity to a different stage.
 * The stageId can be a UUID (for real stages) or '__unassigned__' (to unassign).
 */
export const moveOpportunityBody = z.object({
  stageId: z.union([z.string().uuid(), z.literal('__unassigned__')]),
});

export type MoveOpportunityBody = z.infer<typeof moveOpportunityBody>;

/**
 * Response DTO for moving an opportunity.
 */
export const moveOpportunityResponseDto = z.object({
  success: z.boolean(),
});

export type MoveOpportunityResponseDto = z.infer<typeof moveOpportunityResponseDto>;

/**
 * Query schema for getting the pipeline board.
 */
export const getPipelineBoardQuery = z.object({
  categoryId: z.string().uuid().optional(),
  stageId: z.string().uuid().optional(),
});

export type GetPipelineBoardQuery = z.infer<typeof getPipelineBoardQuery>;

