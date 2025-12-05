import { z } from 'zod';

/**
 * Response DTO for running auto follow-ups.
 */
export const runFollowupsResponseDto = z.object({
  processedConversations: z.number(),
  createdMessages: z.number(),
});

export type RunFollowupsResponseDto = z.infer<typeof runFollowupsResponseDto>;


