import { NextResponse } from 'next/server';
import { supabaseServerMutable } from '@/backend/core/db/supabase-server-mutable';

/**
 * Synchronize auth by setting Supabase cookies on the server.
 * Body: { access_token: string, refresh_token: string }
 */
export async function POST(req: Request) {
  try {
    const { access_token, refresh_token } = await req.json().catch(() => ({} as any));

    if (!access_token || !refresh_token) {
      return NextResponse.json(
        { message: 'access_token and refresh_token are required' },
        { status: 400 },
      );
    }

    const supabase = await supabaseServerMutable();
    const { data, error } = await supabase.auth.setSession({
      access_token,
      refresh_token,
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    return NextResponse.json({
      ok: true,
      user: data.user ?? null,
      session: data.session ?? null,
    });
  } catch (e: any) {
    return NextResponse.json({ message: e?.message ?? 'Internal Error' }, { status: 500 });
  }
}

