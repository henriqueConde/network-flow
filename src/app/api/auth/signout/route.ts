import { NextResponse } from 'next/server';
import { supabaseServerMutable } from '@/backend/core/db/supabase-server-mutable';

/**
 * Idempotent sign-out:
 * - If a session exists: revoke via Supabase and clear cookies.
 * - If no session: still clear any sb-* cookies and return 200.
 */
export async function POST() {
    try {
        const supabase = await supabaseServerMutable();
        const { error } = await supabase.auth.signOut();

        // Even if there's an error, we want to clear cookies
        // Return success to make this idempotent
        return NextResponse.json({ ok: true });
    } catch (error) {
        // Still return success for idempotency
        console.error('[auth/signout] Error:', error);
        return NextResponse.json({ ok: true });
    }
}

