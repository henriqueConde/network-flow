import { z } from 'zod';

export const CompanyFormSchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  industry: z.string().optional(),
  fundingRound: z.string().optional(),
  fundingDate: z.string().datetime().optional().or(z.literal('')),
  fundingSource: z.string().optional(),
  careersPageUrl: z.string().url().optional().or(z.literal('')),
  hasRelevantRole: z.boolean().optional().default(false),
  roleTitle: z.string().optional(),
  applied: z.boolean().optional().default(false),
  applicationDate: z.string().datetime().optional().or(z.literal('')),
  notes: z.string().optional(),
});

export type CompanyFormValues = z.infer<typeof CompanyFormSchema>;




