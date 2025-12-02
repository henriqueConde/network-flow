import type { PipelineBoard, PipelineStage, PipelineOpportunity } from '@/features/pipeline/services/pipeline.service';
import { PIPELINE_PAGE_CONFIG } from './pipeline-page.config';
import type { Stage } from '@/features/stages';
import type { Category } from '@/features/categories';

export type { PipelineOpportunity };

export interface PipelinePageViewProps {
  board: PipelineBoard | null;
  isLoading: boolean;
  error: Error | null;
  config: typeof PIPELINE_PAGE_CONFIG;
  onOpportunityClick: (opportunityId: string) => void;
  onMoveOpportunity: (opportunityId: string, stageId: string) => void;
  availableStages: Stage[];
  availableCategories: Category[];
  categoryId: string | null;
  stageId: string | null;
  onCategoryChange: (value: string | null) => void;
  onStageChange: (value: string | null) => void;
}

