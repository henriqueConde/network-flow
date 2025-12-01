import { supabaseServerMutable } from '@/backend/core/db/supabase-server-mutable';
import { makeAuthRepo } from '../infra/auth.repo';
import {
  signupResponseDto,
  syncSessionResponseDto,
  checkUserResponseDto,
  signoutResponseDto,
} from '../http/auth.schemas';

/**
 * Use case: Sign up a new user
 * Creates user in Supabase Auth and ensures they exist in Prisma database.
 */
export async function signUp(input: { email: string; password: string }) {
  const supabase = await supabaseServerMutable();
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
  });

  if (authError) {
    throw authError;
  }

  if (!authData.user) {
    throw new Error('Failed to create user');
  }

  // Ensure user exists in Prisma database
  const repo = makeAuthRepo();
  try {
    await repo.ensureUserExists(
      authData.user.id,
      authData.user.email || input.email,
      null
    );
  } catch (userError) {
    // Log but don't fail - user exists in Supabase Auth
    console.error('[auth/signup] Failed to ensure user in Prisma:', userError);
  }

  // Map Supabase user to DTO format
  const userDto = {
    id: authData.user.id,
    email: authData.user.email,
    created_at: authData.user.created_at,
  };

  // Map Supabase session to DTO format if it exists
  const sessionDto = authData.session
    ? {
        access_token: authData.session.access_token,
        refresh_token: authData.session.refresh_token,
        expires_in: authData.session.expires_in,
        expires_at: authData.session.expires_at,
        token_type: authData.session.token_type,
        user: userDto,
      }
    : null;

  return signupResponseDto.parse({
    user: userDto,
    session: sessionDto,
  });
}

/**
 * Use case: Ensure user exists after OAuth callback
 * Called after OAuth authentication to sync user to Prisma database.
 */
export async function ensureUserAfterOAuth(input: {
  userId: string;
  email: string;
  name?: string | null;
}) {
  const repo = makeAuthRepo();
  return await repo.ensureUserExists(input.userId, input.email, input.name);
}

/**
 * Use case: Sync session and ensure user exists
 * Sets session in Supabase and ensures user exists in Prisma database.
 */
export async function syncSession(input: {
  accessToken: string;
  refreshToken: string;
}) {
  const supabase = await supabaseServerMutable();
  const { data, error } = await supabase.auth.setSession({
    access_token: input.accessToken,
    refresh_token: input.refreshToken,
  });

  if (error) {
    throw error;
  }

  // Ensure user exists in Prisma database after session is set
  if (data?.user) {
    const repo = makeAuthRepo();
    try {
      await repo.ensureUserExists(
        data.user.id,
        data.user.email || '',
        data.user.user_metadata?.full_name ||
          data.user.user_metadata?.name ||
          data.user.user_metadata?.display_name ||
          null
      );
    } catch (userError) {
      // Log but don't fail - session is still valid
      console.error('[auth/sync] Failed to ensure user in Prisma:', userError);
    }
  }

  // Map Supabase user to DTO format if it exists
  const userDto = data.user
    ? {
        id: data.user.id,
        email: data.user.email,
        created_at: data.user.created_at,
      }
    : null;

  // Map Supabase session to DTO format if it exists
  const sessionDto = data.session
    ? {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token,
        expires_in: data.session.expires_in,
        expires_at: data.session.expires_at,
        token_type: data.session.token_type,
        user: userDto!,
      }
    : null;

  return syncSessionResponseDto.parse({
    ok: true,
    user: userDto,
    session: sessionDto,
  });
}

/**
 * Use case: Check if user exists by email
 */
export async function checkUserExists(email: string) {
  const repo = makeAuthRepo();
  const exists = await repo.userExistsByEmail(email);
  return checkUserResponseDto.parse({ exists });
}

/**
 * Use case: Sign out user
 * Revokes session in Supabase and clears cookies.
 */
export async function signOut() {
  const supabase = await supabaseServerMutable();
  const { error } = await supabase.auth.signOut();

  // Even if there's an error, we want to clear cookies
  // Return success to make this idempotent
  if (error) {
    console.error('[auth/signout] Error:', error);
  }

  return signoutResponseDto.parse({ ok: true });
}

