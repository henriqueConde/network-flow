import { z } from 'zod';

export const ContactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  headlineOrRole: z.string().optional(),
  company: z.string().optional(),
  companyId: z.string().uuid().nullable().optional(),
  primaryPlatform: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
  email: z.string().email('Invalid email address').nullable().optional().or(z.literal('')),
  warmOrCold: z.enum(['warm', 'cold']).nullable().optional(),
  commonGround: z.string().optional(),
  firstMessageDate: z.string().datetime().nullable().optional().or(z.literal('')),
  referralGiven: z.boolean().optional(),
  referralGivenAt: z.string().datetime().nullable().optional().or(z.literal('')),
  referralDetails: z.string().optional(),
  connectionRequestSentAt: z.string().datetime().nullable().optional().or(z.literal('')),
  connectionAcceptedAt: z.string().datetime().nullable().optional().or(z.literal('')),
  connectionStatus: z.enum(['not_connected', 'request_sent', 'connected']).nullable().optional(),
  dmSentAt: z.string().datetime().nullable().optional().or(z.literal('')),
  lastFollowUpAt: z.string().datetime().nullable().optional().or(z.literal('')),
  contactType: z.string().optional(),
  strategyIds: z.array(z.string()).optional().default([]),
});

export type ContactFormValues = z.infer<typeof ContactFormSchema>;

