import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import type { Database } from '@/types/supabase';
import { env } from '@/backend/core/config/env';

// Use ONLY in Route Handlers (app/**/route.ts) or Server Actions
export async function supabaseServerMutable() {
  const cookieStore = await cookies(); // your setup returns a Promise

  return createServerClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    cookies: {
      // new @supabase/ssr cookie API
      getAll() {
        return cookieStore.getAll().map(({ name, value }) => ({ name, value }));
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
  });
}

