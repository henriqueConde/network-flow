import { makePipelineRepo } from '../infra/pipeline.repo';
import {
  pipelineBoardDto,
  type MoveOpportunityBody,
  moveOpportunityResponseDto,
  type GetPipelineBoardQuery,
} from '../http/pipeline.schemas';

/**
 * Use case: Get the pipeline board with all stages and their opportunities.
 */
export async function getPipelineBoard(userId: string, filters?: GetPipelineBoardQuery) {
  const repo = makePipelineRepo();
  const board = await repo.getPipelineBoard(userId, filters);

  // Normalize Dates to ISO strings for DTO
  const dto = {
    stages: board.stages.map((stage) => ({
      ...stage,
      opportunities: stage.opportunities.map((opp) => ({
        ...opp,
        lastMessageAt: opp.lastMessageAt ? opp.lastMessageAt.toISOString() : null,
        nextActionDueAt: opp.nextActionDueAt ? opp.nextActionDueAt.toISOString() : null,
        conversations: opp.conversations.map((conv) => ({
          ...conv,
          lastMessageAt: conv.lastMessageAt ? conv.lastMessageAt.toISOString() : null,
        })),
      })),
    })),
  };

  return pipelineBoardDto.parse(dto);
}

/**
 * Use case: Move an opportunity to a different stage.
 * Expects already-validated body payload from the HTTP layer.
 */
export async function moveOpportunity(input: {
  userId: string;
  opportunityId: string;
  body: MoveOpportunityBody;
}) {
  const repo = makePipelineRepo();

  // Convert '__unassigned__' to null for the database
  const stageId = input.body.stageId === '__unassigned__' ? null : input.body.stageId;

  const updated = await repo.moveOpportunity({
    userId: input.userId,
    opportunityId: input.opportunityId,
    stageId,
  });

  if (!updated) {
    return null;
  }

  return moveOpportunityResponseDto.parse({
    success: true,
  });
}

