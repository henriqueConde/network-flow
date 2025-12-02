import { z } from 'zod';

/**
 * Message sender side in a conversation.
 * Shared across frontend and backend to ensure type consistency.
 */
export const MessageSide = {
  USER: 'user',
  CONTACT: 'contact',
} as const;

export type MessageSideType =
  | typeof MessageSide.USER
  | typeof MessageSide.CONTACT;

/**
 * Zod schema for message side validation.
 * Use this in Zod schemas instead of manually defining the enum.
 */
export const messageSideSchema = z.enum([MessageSide.USER, MessageSide.CONTACT]);

