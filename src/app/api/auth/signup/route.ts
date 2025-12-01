import { NextRequest, NextResponse } from 'next/server';
import { supabaseServerMutable } from '@/backend/core/db/supabase-server-mutable';
import { z } from 'zod';
import { prisma } from '@/backend/core/db/prisma';

const signupBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

/**
 * Server-side signup endpoint that:
 * 1. Creates the user in Supabase Auth
 * 2. Ensures the user exists in Prisma database
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = signupBodySchema.parse(body);

    // Create user in Supabase Auth
    const supabase = await supabaseServerMutable();
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      // Extract error message safely - handle both string and object cases
      let errorMessage: string;
      if (typeof authError.message === 'string') {
        errorMessage = authError.message;
      } else if (typeof authError.message === 'object' && authError.message !== null) {
        errorMessage = JSON.stringify(authError.message);
      } else {
        errorMessage = authError.toString() || 'Authentication failed';
      }
      
      const errorMessageLower = errorMessage.toLowerCase();
      
      // Check if the error indicates user already exists
      const isUserExistsError =
        errorMessageLower.includes('user already registered') ||
        errorMessageLower.includes('already registered') ||
        errorMessageLower.includes('email already exists') ||
        errorMessageLower.includes('user already exists');

      if (isUserExistsError) {
        return NextResponse.json(
          { error: 'User already exists', code: 'USER_EXISTS' },
          { status: 400 },
        );
      }

      console.error('[auth/signup] Supabase auth error:', {
        error: authError,
        message: authError.message,
        status: authError.status,
        name: authError.name,
      });
      
      // Handle timeout errors specifically
      if (authError.status === 504 || errorMessageLower.includes('timeout')) {
        return NextResponse.json({ 
          error: 'Authentication service is temporarily unavailable. Please try again in a moment.',
          code: 'SERVICE_TIMEOUT'
        }, { status: 503 });
      }
      
      // Handle email sending errors - in local dev with autoconfirm, this shouldn't block signup
      if (authError.status === 500 && errorMessageLower.includes('email')) {
        console.warn('[auth/signup] Email sending failed but user may have been created:', authError);
        // For local dev, we can still proceed if autoconfirm is enabled
        // The user should be created even if email fails
        return NextResponse.json({ 
          error: 'User may have been created, but email confirmation failed. Please try logging in.',
          code: 'EMAIL_ERROR'
        }, { status: 500 });
      }
      
      return NextResponse.json({ 
        error: errorMessage,
        code: authError.status || 'AUTH_ERROR'
      }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }

    // Ensure user exists in Prisma database
    try {
      await prisma.user.upsert({
        where: { id: authData.user.id },
        update: {},
        create: {
          id: authData.user.id,
          email: authData.user.email || email,
        },
      });
    } catch (userError) {
      // Log but don't fail - user exists in Supabase Auth
      console.error('[auth/signup] Failed to ensure user in Prisma:', userError);
    }

    return NextResponse.json({
      user: authData.user,
      session: authData.session,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    console.error('[auth/signup] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

