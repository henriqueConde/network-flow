import { z } from 'zod';

export const JobPostingFormSchema = z.object({
  companyId: z.string().uuid().optional().or(z.literal('')),
  jobTitle: z.string().min(1, 'Job title is required'),
  jobUrl: z.string().url('Job URL must be a valid URL'),
  postedAt: z.string().datetime().optional().or(z.literal('')),
  applicantsWhenFound: z.string().optional(),
  source: z.enum(['linkedin_post', 'linkedin_job', 'other']).default('other'),
  outreachDone: z.boolean().optional().default(false),
  outreachChannels: z.array(z.string()).optional().default([]),
  notes: z.string().optional(),
});

export type JobPostingFormValues = z.infer<typeof JobPostingFormSchema>;


