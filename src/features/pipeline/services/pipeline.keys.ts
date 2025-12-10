export const pipelineKeys = {
  all: ['pipeline'] as const,
  board: (filters?: { categoryId?: string; stageId?: string; search?: string }) => {
    if (!filters || (!filters.categoryId && !filters.stageId && !filters.search)) {
      return [...pipelineKeys.all, 'board'] as const;
    }
    return [...pipelineKeys.all, 'board', filters] as const;
  },
};

