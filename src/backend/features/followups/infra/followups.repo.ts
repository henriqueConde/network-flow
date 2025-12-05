import { prisma } from '@/backend/core/db/prisma';

/**
 * Repository for automatic follow-up generation.
 */
export function makeFollowupsRepo() {
  return {
    /**
     * Generate follow-up messages for conversations that are stuck.
     *
     * Rules:
     * - Conversation autoFollowupsEnabled must be true.
     * - Last message side is 'user' and lastMessageAt is at least 2 days ago.
     * - At most 3 auto follow-up messages per conversation.
     * - Skip if any contact reply exists after the last user message.
     * - Skip if another conversation in the same opportunity has a recent contact reply
     *   (opportunity considered "moving forward").
     */
    async runAutoFollowupsForUser(userId: string, now = new Date()) {
      const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;
      const RECENT_CONTACT_REPLY_WINDOW_MS = 14 * 24 * 60 * 60 * 1000; // 14 days
      const cutoff = new Date(now.getTime() - TWO_DAYS_MS);
      const recentContactCutoff = new Date(now.getTime() - RECENT_CONTACT_REPLY_WINDOW_MS);

      const conversations = await prisma.conversation.findMany({
        where: {
          userId,
          lastMessageSide: 'user',
          lastMessageAt: {
            lte: cutoff,
          },
        },
        include: {
          contact: true,
          opportunity: {
            include: {
              conversations: true,
            },
          },
          messages: {
            orderBy: {
              sentAt: 'asc',
            },
          },
        },
      });

      let processed = 0;
      let createdMessages = 0;

      for (const conv of conversations) {
        processed += 1;

        // Safety: require contact and respect per-conversation / per-opportunity toggles (if present in schema)
        if (!conv.contact) continue;
        const conversationAutoFollowupsEnabled =
          (conv as any).autoFollowupsEnabled !== undefined
            ? Boolean((conv as any).autoFollowupsEnabled)
            : true;
        const opportunityAutoFollowupsEnabled =
          conv.opportunity && (conv.opportunity as any).autoFollowupsEnabled !== undefined
            ? Boolean((conv.opportunity as any).autoFollowupsEnabled)
            : true;
        if (!conversationAutoFollowupsEnabled || !opportunityAutoFollowupsEnabled) continue;

        const messages = conv.messages;
        if (messages.length === 0) continue;

        const lastUserMessage = [...messages].reverse().find((m) => m.sender === 'user');
        const lastContactMessage = [...messages].reverse().find((m) => m.sender === 'contact');

        // If contact has replied after the last user message, skip
        if (
          lastContactMessage &&
          lastUserMessage &&
          lastContactMessage.sentAt > lastUserMessage.sentAt
        ) {
          continue;
        }

        // Count existing auto follow-ups
        const autoFollowups = messages.filter(
          (m) => m.sender === 'user' && m.source === 'auto_follow_up',
        );
        if (autoFollowups.length >= 3) {
          continue;
        }

        // Ensure last user message is old enough (redundant with query but safer if data changes)
        if (lastUserMessage && lastUserMessage.sentAt > cutoff) {
          continue;
        }

        // Check whether opportunity is "moving forward" via another conversation with recent contact reply
        if (conv.opportunity) {
          const hasRecentContactReplyInOpportunity = conv.opportunity.conversations.some(
            (other) =>
              other.id !== conv.id &&
              other.lastMessageSide === 'contact' &&
              other.lastMessageAt &&
              other.lastMessageAt >= recentContactCutoff,
          );

          if (hasRecentContactReplyInOpportunity) {
            continue;
          }
        }

        // Decide which follow-up number this is (0-based)
        const followupIndex = autoFollowups.length;

        let body: string;
        if (followupIndex === 2) {
          // Final follow-up with specific copy
          body = "Please, don't ghost me man 🙂";
        } else {
          body =
            followupIndex === 0
              ? `Hey ${conv.contact.name.split(' ')[0] || conv.contact.name}, just following up on my previous message. Would love to hear your thoughts when you have a moment.`
              : `Hi ${conv.contact.name.split(' ')[0] || conv.contact.name}, checking in again in case my last message slipped through. Happy to keep it brief if you're busy.`;
        }

        const message = await prisma.message.create({
          data: {
            conversationId: conv.id,
            sender: 'user',
            body,
            sentAt: now,
            source: 'auto_follow_up',
            status: 'pending',
          },
        });

        await prisma.conversation.update({
          where: { id: conv.id },
          data: {
            lastMessageAt: message.sentAt,
            lastMessageSide: 'user',
            lastMessageSnippet: body.slice(0, 2000),
          },
        });

        createdMessages += 1;
      }

      return {
        processedConversations: processed,
        createdMessages,
      };
    },
  };
}


