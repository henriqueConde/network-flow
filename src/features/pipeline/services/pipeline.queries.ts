import { useQuery } from '@tanstack/react-query';
import { getPipelineBoard } from './pipeline.service';
import { pipelineKeys } from './pipeline.keys';

/**
 * Query hook for fetching the pipeline board.
 * Defined in services layer for reusability and separation of concerns.
 */
export function usePipelineBoard() {
  return useQuery({
    queryKey: pipelineKeys.board(),
    queryFn: () => getPipelineBoard(),
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });
}

