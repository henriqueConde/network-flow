export const pipelineKeys = {
  all: ['pipeline'] as const,
  board: (filters?: { categoryId?: string; stageId?: string }) => {
    if (!filters || (!filters.categoryId && !filters.stageId)) {
      return [...pipelineKeys.all, 'board'] as const;
    }
    return [...pipelineKeys.all, 'board', filters] as const;
  },
};

