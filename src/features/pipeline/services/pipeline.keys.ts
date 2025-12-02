export const pipelineKeys = {
  all: ['pipeline'] as const,
  board: () => [...pipelineKeys.all, 'board'] as const,
};

