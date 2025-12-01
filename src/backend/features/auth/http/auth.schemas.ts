import { z } from 'zod';

/**
 * Request schemas for auth endpoints
 */

export const signupBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const signupQuerySchema = z.object({
  email: z.string().email().optional(),
});

export const syncSessionBodySchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});

/**
 * Response DTOs for auth endpoints
 */

export const userDto = z.object({
  id: z.string().uuid(),
  email: z.string().email().nullable(),
  created_at: z.string().datetime().optional(),
});

export const sessionDto = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  expires_in: z.number(),
  expires_at: z.number().optional(),
  token_type: z.string(),
  user: userDto,
});

export const signupResponseDto = z.object({
  user: userDto,
  session: sessionDto.nullable(),
});

export const syncSessionResponseDto = z.object({
  ok: z.boolean(),
  user: userDto.nullable(),
  session: sessionDto.nullable(),
});

export const checkUserResponseDto = z.object({
  exists: z.boolean(),
});

export const signoutResponseDto = z.object({
  ok: z.boolean(),
});

