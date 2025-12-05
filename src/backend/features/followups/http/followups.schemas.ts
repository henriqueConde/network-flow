import { z } from 'zod';

/**
 * Response DTO for running auto follow-ups.
 */
export const runFollowupsResponseDto = z.object({
  processedConversations: z.number(),
  createdMessages: z.number(),
});

export type RunFollowupsResponseDto = z.infer<typeof runFollowupsResponseDto>;

/**
 * DTO for a single scheduled follow-up.
 */
export const scheduledFollowupDto = z.object({
  conversationId: z.string().uuid(),
  contactName: z.string(),
  contactCompany: z.string().nullable(),
  opportunityId: z.string().uuid().nullable(),
  opportunityTitle: z.string().nullable(),
  channel: z.string(),
  lastMessageAt: z.string().datetime(),
  followupNumber: z.number().int().min(0).max(2),
  dueDate: z.string().datetime(),
});

export type ScheduledFollowupDto = z.infer<typeof scheduledFollowupDto>;

/**
 * Response DTO for listing scheduled follow-ups.
 */
export const scheduledFollowupsListDto = z.array(
  z.object({
    date: z.string(), // YYYY-MM-DD
    followups: z.array(scheduledFollowupDto),
  }),
);

export type ScheduledFollowupsListDto = z.infer<typeof scheduledFollowupsListDto>;


