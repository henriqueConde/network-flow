import { z } from 'zod';

const Env = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(), // only Edge/cron
  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().min(1).optional(),
  OPENAI_API_KEY: z.string().min(1),
  LINKEDIN_API_BASE: z.string().url(),
  LINKEDIN_VERSION: z.string(),
  LINKEDIN_ACCESS_TOKEN: z.string(),
});

export const env = Env.parse(process.env);

