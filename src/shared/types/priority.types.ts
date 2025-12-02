import { z } from 'zod';

/**
 * Priority levels for conversations and actions.
 * Shared across frontend and backend to ensure type consistency.
 */
export const Priority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

export type PriorityType =
  | typeof Priority.LOW
  | typeof Priority.MEDIUM
  | typeof Priority.HIGH;

/**
 * Zod schema for priority validation.
 * Use this in Zod schemas instead of manually defining the enum.
 * Allows null for closed conversations.
 */
export const prioritySchema = z.enum([Priority.LOW, Priority.MEDIUM, Priority.HIGH]).nullable();

