import { z } from 'zod';

/**
 * Conversation channel types supported by Network Flow.
 * Shared across frontend and backend to ensure type consistency.
 */
export const ConversationChannel = {
    LINKEDIN: 'linkedin',
    EMAIL: 'email',
    TWITTER: 'twitter',
    OTHER: 'other',
} as const;

export type ConversationChannelType =
    | typeof ConversationChannel.LINKEDIN
    | typeof ConversationChannel.EMAIL
    | typeof ConversationChannel.TWITTER
    | typeof ConversationChannel.OTHER;

/**
 * Zod schema for conversation channel validation.
 * Use this in Zod schemas instead of manually defining the enum.
 */
export const conversationChannelSchema = z.enum([
    ConversationChannel.LINKEDIN,
    ConversationChannel.EMAIL,
    ConversationChannel.TWITTER,
    ConversationChannel.OTHER,
]);

