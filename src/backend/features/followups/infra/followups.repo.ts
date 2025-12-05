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

    /**
     * List scheduled follow-ups for a user, grouped by due date.
     * Returns conversations that are eligible for follow-ups with their calculated due dates.
     */
    async listScheduledFollowups(userId: string, now = new Date()) {
      const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;
      const RECENT_CONTACT_REPLY_WINDOW_MS = 14 * 24 * 60 * 60 * 1000; // 14 days
      const recentContactCutoff = new Date(now.getTime() - RECENT_CONTACT_REPLY_WINDOW_MS);

      // Get all conversations with auto-followups enabled
      const conversations = await prisma.conversation.findMany({
        where: {
          userId,
          lastMessageSide: 'user',
          lastMessageAt: {
            not: null,
          },
        },
        select: {
          id: true,
          userId: true,
          contactId: true,
          opportunityId: true,
          channel: true,
          lastMessageAt: true,
          lastMessageSide: true,
          autoFollowupsEnabled: true,
          contact: {
            select: {
              id: true,
              name: true,
              company: true,
            },
          },
          opportunity: {
            select: {
              id: true,
              title: true,
              autoFollowupsEnabled: true,
              conversations: {
                select: {
                  id: true,
                  lastMessageSide: true,
                  lastMessageAt: true,
                },
              },
            },
          },
          messages: {
            orderBy: {
              sentAt: 'asc',
            },
            select: {
              id: true,
              sender: true,
              source: true,
              sentAt: true,
            },
          },
        },
      });

      const scheduledFollowups: Array<{
        conversationId: string;
        contactName: string;
        contactCompany: string | null;
        opportunityId: string | null;
        opportunityTitle: string | null;
        channel: string;
        lastMessageAt: Date;
        followupNumber: number; // 0, 1, or 2 (which follow-up this is)
        dueDate: Date; // When this follow-up is due
      }> = [];

      for (const conv of conversations) {
        if (!conv.contact || !conv.lastMessageAt) continue;

        // Check if auto-followups are enabled
        const conversationAutoFollowupsEnabled = conv.autoFollowupsEnabled ?? true;
        const opportunityAutoFollowupsEnabled =
          conv.opportunity?.autoFollowupsEnabled ?? true;
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

        if (!lastUserMessage) continue;

        // Calculate due dates for remaining follow-ups
        const followupCount = autoFollowups.length;
        const baseDate = lastUserMessage.sentAt;

        // Calculate due dates for up to 3 follow-ups total
        for (let i = followupCount; i < 3; i++) {
          const daysToAdd = (i + 1) * 2; // 2 days, 4 days, 6 days after last user message
          const dueDate = new Date(baseDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

          // Only include if due date is in the future or today
          if (dueDate >= now) {
            scheduledFollowups.push({
              conversationId: conv.id,
              contactName: conv.contact.name,
              contactCompany: conv.contact.company,
              opportunityId: conv.opportunityId,
              opportunityTitle: conv.opportunity?.title ?? null,
              channel: conv.channel,
              lastMessageAt: lastUserMessage.sentAt,
              followupNumber: i,
              dueDate,
            });
          }
        }
      }

      // Group by date (YYYY-MM-DD)
      const groupedByDate = new Map<string, typeof scheduledFollowups>();
      for (const followup of scheduledFollowups) {
        const dateKey = followup.dueDate.toISOString().split('T')[0];
        if (!groupedByDate.has(dateKey)) {
          groupedByDate.set(dateKey, []);
        }
        groupedByDate.get(dateKey)!.push(followup);
      }

      // Convert to array and sort by date
      const result = Array.from(groupedByDate.entries())
        .map(([date, followups]) => ({
          date,
          followups: followups.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime()),
        }))
        .sort((a, b) => a.date.localeCompare(b.date));

      return result;
    },
  };
}


