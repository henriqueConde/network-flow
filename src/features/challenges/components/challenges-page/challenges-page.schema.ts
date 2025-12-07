import { z } from 'zod';

export const ChallengeFormSchema = z.object({
  name: z.string().min(1, 'Challenge name is required'),
  startDate: z.string().datetime('Start date must be a valid datetime'),
  endDate: z.string().datetime('End date must be a valid datetime'),
  goal: z.number().int().min(1, 'Goal must be at least 1'),
  outreachesCount: z.number().int().min(0).optional().default(0),
  acceptsCount: z.number().int().min(0).optional().default(0),
  repliesCount: z.number().int().min(0).optional().default(0),
  callsCount: z.number().int().min(0).optional().default(0),
  interviewsCount: z.number().int().min(0).optional().default(0),
  notes: z.string().optional(),
});

export type ChallengeFormValues = z.infer<typeof ChallengeFormSchema>;

