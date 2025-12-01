import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import type { Database } from '@/types/supabase';
import { env } from '@/backend/core/config/env';

// Use this in Server Components / loaders (no cookie writes)
export async function supabaseServer() {
  const cookieStore = await cookies(); // <-- await (your types say Promise)

  return createServerClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    cookies: {
      // new API
      getAll() {
        return cookieStore.getAll().map(({ name, value }) => ({ name, value }));
      },
      // no writes in RSC context
      setAll() {
        /* no-op */
      },
    },
  });
}

