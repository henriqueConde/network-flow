import { client } from '@/shared/services/http/client';
import { z } from 'zod';
import { prioritySchema } from '@/shared/types';

const PipelineOpportunityConversationDto = z.object({
  id: z.string(),
  contactName: z.string(),
  contactCompany: z.string().nullable(),
  channel: z.string(),
  stageName: z.string().nullable(),
  lastMessageAt: z.string().datetime().nullable(),
  lastMessageSnippet: z.string().nullable(),
  isOutOfSync: z.boolean(),
});

const PipelineOpportunityDto = z.object({
  id: z.string(),
  contactName: z.string(),
  contactCompany: z.string().nullable(),
  title: z.string().nullable(),
  categoryName: z.string().nullable(),
  lastMessageAt: z.string().datetime().nullable(),
  nextActionType: z.string().nullable(),
  nextActionDueAt: z.string().datetime().nullable(),
  priority: prioritySchema,
  isOutOfSync: z.boolean(),
  conversations: z.array(PipelineOpportunityConversationDto),
});

const PipelineStageDto = z.object({
  id: z.union([z.string().uuid(), z.literal('__unassigned__')]),
  name: z.string(),
  description: z.string().nullable(),
  order: z.number(),
  opportunities: z.array(PipelineOpportunityDto),
});

const PipelineBoardDto = z.object({
  stages: z.array(PipelineStageDto),
});

export type PipelineOpportunityConversation = z.infer<typeof PipelineOpportunityConversationDto> & {
  lastMessageAtDate: Date | null;
};

export type PipelineOpportunity = z.infer<typeof PipelineOpportunityDto> & {
  lastMessageAtDate: Date | null;
  nextActionDueAtDate: Date | null;
  conversations: PipelineOpportunityConversation[];
};

export type PipelineStage = Omit<z.infer<typeof PipelineStageDto>, 'opportunities'> & {
  opportunities: PipelineOpportunity[];
};

export type PipelineBoard = {
  stages: PipelineStage[];
};

/**
 * Fetch the pipeline board with all stages and their opportunities.
 */
export async function getPipelineBoard(params?: {
  categoryId?: string;
  stageId?: string;
}): Promise<PipelineBoard> {
  const res = await client.get('/api/pipeline', { params });
  const data = PipelineBoardDto.parse(res.data);

  return {
    stages: data.stages.map((stage) => ({
      ...stage,
      opportunities: stage.opportunities.map((opp) => ({
        ...opp,
        lastMessageAtDate: opp.lastMessageAt ? new Date(opp.lastMessageAt) : null,
        nextActionDueAtDate: opp.nextActionDueAt ? new Date(opp.nextActionDueAt) : null,
        conversations: opp.conversations.map((conv) => ({
          ...conv,
          lastMessageAtDate: conv.lastMessageAt ? new Date(conv.lastMessageAt) : null,
        })),
      })),
    })),
  };
}

/**
 * Move an opportunity to a different stage.
 */
export async function moveOpportunity(opportunityId: string, stageId: string): Promise<void> {
  await client.patch(`/api/pipeline/${opportunityId}`, { stageId });
}

