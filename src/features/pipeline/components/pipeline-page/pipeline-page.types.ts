import type { PipelineBoard, PipelineStage, PipelineOpportunity } from '@/features/pipeline/services/pipeline.service';
import { PIPELINE_PAGE_CONFIG } from './pipeline-page.config';
import type { Stage } from '@/features/stages';

export type { PipelineOpportunity };

export interface PipelinePageViewProps {
  board: PipelineBoard | null;
  isLoading: boolean;
  error: Error | null;
  config: typeof PIPELINE_PAGE_CONFIG;
  onOpportunityClick: (opportunityId: string) => void;
  onMoveOpportunity: (opportunityId: string, stageId: string) => void;
  availableStages: Stage[];
}

