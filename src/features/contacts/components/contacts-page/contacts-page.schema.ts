import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  headlineOrRole: z.string().optional(),
  company: z.string().optional(),
  primaryPlatform: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  categoryId: z.string().nullable().optional(),
  stageId: z.string().nullable().optional(),
});

export type ContactFormValues = z.infer<typeof ContactFormSchema>;

