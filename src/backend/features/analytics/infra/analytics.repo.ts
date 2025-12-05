import { prisma } from '@/backend/core/db/prisma';

/**
 * Repository for Analytics data access.
 * Handles all database queries for analytics and metrics.
 */
export function makeAnalyticsRepo() {
  return {
    /**
     * Get overall metrics for a user
     */
    async getOverallMetrics(userId: string, startDate?: Date, endDate?: Date) {
      const dateFilter = {
        ...(startDate && { gte: startDate }),
        ...(endDate && { lte: endDate }),
      };

      // Total opportunities
      const totalOpportunities = await prisma.opportunity.count({
        where: {
          userId,
          ...(Object.keys(dateFilter).length > 0 && {
            createdAt: dateFilter,
          }),
        },
      });

      // Active opportunities (not dormant/closed)
      const allOpportunities = await prisma.opportunity.findMany({
        where: {
          userId,
          stageId: { not: null },
        },
        include: {
          stage: true,
        },
      });

      const activeOpportunities = allOpportunities.filter(
        (opp) =>
          opp.stage &&
          !['Dormant', 'Closed (positive)', 'Closed (negative)'].includes(opp.stage.name)
      ).length;

      // Interviews in progress
      const interviewingStage = await prisma.stage.findFirst({
        where: {
          userId,
          name: 'Interviewing',
        },
      });

      const interviewsInProgress = interviewingStage
        ? await prisma.opportunity.count({
            where: {
              userId,
              stageId: interviewingStage.id,
            },
          })
        : 0;

      // Offers
      const offerStage = await prisma.stage.findFirst({
        where: {
          userId,
          name: 'Offer',
        },
      });

      const offers = offerStage
        ? await prisma.opportunity.count({
            where: {
              userId,
              stageId: offerStage.id,
            },
          })
        : 0;

      // Total conversations
      const totalConversations = await prisma.conversation.count({
        where: {
          userId,
          ...(Object.keys(dateFilter).length > 0 && {
            createdAt: dateFilter,
          }),
        },
      });

      // Total messages
      const totalMessages = await prisma.message.count({
        where: {
          conversation: {
            userId,
            ...(Object.keys(dateFilter).length > 0 && {
              createdAt: dateFilter,
            }),
          },
        },
      });

      // Average response time (time between contact message and user reply)
      const conversations = await prisma.conversation.findMany({
        where: {
          userId,
        },
        include: {
          messages: {
            orderBy: {
              sentAt: 'asc',
            },
          },
        },
      });

      const responseTimes: number[] = [];
      conversations.forEach((conv) => {
        const messages = conv.messages;
        for (let i = 0; i < messages.length - 1; i++) {
          if (messages[i].sender === 'contact' && messages[i + 1].sender === 'user') {
            const hours =
              (messages[i + 1].sentAt.getTime() - messages[i].sentAt.getTime()) /
              (1000 * 60 * 60);
            responseTimes.push(hours);
          }
        }
      });

      const averageResponseHours =
        responseTimes.length > 0
          ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
          : null;

      // Conversion rate (opportunities that reached interviewing stage / total opportunities)
      const conversionRate =
        totalOpportunities > 0 ? (interviewsInProgress / totalOpportunities) * 100 : 0;

      return {
        totalOpportunities,
        activeOpportunities,
        interviewsInProgress,
        offers,
        totalConversations,
        totalMessages,
        averageResponseHours,
        conversionRate,
      };
    },

    /**
     * Get stage distribution
     */
    async getStageDistribution(userId: string) {
      const stages = await prisma.stage.findMany({
        where: {
          userId,
        },
        include: {
          _count: {
            select: {
              opportunities: true,
            },
          },
        },
        orderBy: {
          order: 'asc',
        },
      });

      const total = stages.reduce((sum, stage) => sum + stage._count.opportunities, 0);

      return stages.map((stage) => ({
        stageId: stage.id,
        stageName: stage.name,
        count: stage._count.opportunities,
        percentage: total > 0 ? (stage._count.opportunities / total) * 100 : 0,
      }));
    },

    /**
     * Get category performance
     */
    async getCategoryPerformance(userId: string) {
      const categories = await prisma.category.findMany({
        where: {
          userId,
        },
        include: {
          opportunities: {
            include: {
              stage: true,
            },
          },
        },
      });

      // Get stage IDs for interviews and offers
      const interviewingStage = await prisma.stage.findFirst({
        where: {
          userId,
          name: 'Interviewing',
        },
      });

      const offerStage = await prisma.stage.findFirst({
        where: {
          userId,
          name: 'Offer',
        },
      });

      const categoryStats: Array<{
        categoryId: string | null;
        categoryName: string | null;
        totalOpportunities: number;
        interviewsInProgress: number;
        offers: number;
        conversionRate: number;
      }> = categories.map((category) => {
        const opportunities = category.opportunities;
        const totalOpportunities = opportunities.length;
        const interviewsInProgress = interviewingStage
          ? opportunities.filter((opp) => opp.stageId === interviewingStage.id).length
          : 0;
        const offers = offerStage
          ? opportunities.filter((opp) => opp.stageId === offerStage.id).length
          : 0;
        const conversionRate =
          totalOpportunities > 0 ? (interviewsInProgress / totalOpportunities) * 100 : 0;

        return {
          categoryId: category.id,
          categoryName: category.name,
          totalOpportunities,
          interviewsInProgress,
          offers,
          conversionRate,
        };
      });

      // Add uncategorized opportunities
      const uncategorizedOpportunities = await prisma.opportunity.findMany({
        where: {
          userId,
          categoryId: null,
        },
        include: {
          stage: true,
        },
      });

      if (uncategorizedOpportunities.length > 0) {
        const interviewsInProgress = interviewingStage
          ? uncategorizedOpportunities.filter((opp) => opp.stageId === interviewingStage.id).length
          : 0;
        const offers = offerStage
          ? uncategorizedOpportunities.filter((opp) => opp.stageId === offerStage.id).length
          : 0;
        const conversionRate =
          uncategorizedOpportunities.length > 0
            ? (interviewsInProgress / uncategorizedOpportunities.length) * 100
            : 0;

        categoryStats.push({
          categoryId: null,
          categoryName: 'Uncategorized',
          totalOpportunities: uncategorizedOpportunities.length,
          interviewsInProgress,
          offers,
          conversionRate,
        });
      }

      return categoryStats;
    },

    /**
     * Get pipeline conversions (stage transitions)
     */
    async getPipelineConversions(userId: string) {
      // This is a simplified version - in a real system, you'd track stage changes over time
      // For now, we'll calculate based on current stage distribution
      const stages = await prisma.stage.findMany({
        where: {
          userId,
        },
        orderBy: {
          order: 'asc',
        },
      });

      const conversions: Array<{
        fromStage: string;
        toStage: string;
        count: number;
        averageDays: number | null;
      }> = [];

      // For each stage pair, count opportunities that moved through
      // This is a simplified heuristic - ideally you'd track actual transitions
      for (let i = 0; i < stages.length - 1; i++) {
        const fromStage = stages[i];
        const toStage = stages[i + 1];

        const fromCount = await prisma.opportunity.count({
          where: {
            userId,
            stageId: fromStage.id,
          },
        });

        const toCount = await prisma.opportunity.count({
          where: {
            userId,
            stageId: toStage.id,
          },
        });

        // Estimate conversions as the minimum (opportunities that made it through)
        const count = Math.min(fromCount, toCount);

        // Calculate average days (simplified - would need historical data)
        const opportunities = await prisma.opportunity.findMany({
          where: {
            userId,
            stageId: toStage.id,
          },
          select: {
            createdAt: true,
            updatedAt: true,
          },
        });

        const days = opportunities
          .map((opp) => {
            const diff = opp.updatedAt.getTime() - opp.createdAt.getTime();
            return diff / (1000 * 60 * 60 * 24);
          })
          .filter((d) => d > 0);

        const averageDays = days.length > 0 ? days.reduce((a, b) => a + b, 0) / days.length : null;

        conversions.push({
          fromStage: fromStage.name,
          toStage: toStage.name,
          count,
          averageDays,
        });
      }

      return conversions;
    },

    /**
     * Get response times by category
     */
    async getResponseTimes(userId: string) {
      const categories = await prisma.category.findMany({
        where: {
          userId,
        },
        include: {
          opportunities: {
            include: {
              conversations: {
                include: {
                  messages: {
                    orderBy: {
                      sentAt: 'asc',
                    },
                  },
                },
              },
            },
          },
        },
      });

      const categoryStats: Array<{
        categoryId: string | null;
        categoryName: string | null;
        averageResponseHours: number | null;
        medianResponseHours: number | null;
        totalResponses: number;
      }> = categories.map((category) => {
        const responseTimes: number[] = [];

        category.opportunities.forEach((opp) => {
          opp.conversations.forEach((conv) => {
            const messages = conv.messages;
            for (let i = 0; i < messages.length - 1; i++) {
              if (messages[i].sender === 'contact' && messages[i + 1].sender === 'user') {
                const hours =
                  (messages[i + 1].sentAt.getTime() - messages[i].sentAt.getTime()) /
                  (1000 * 60 * 60);
                responseTimes.push(hours);
              }
            }
          });
        });

        const sorted = responseTimes.sort((a, b) => a - b);
        const averageResponseHours =
          responseTimes.length > 0
            ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
            : null;
        const medianResponseHours =
          sorted.length > 0
            ? sorted.length % 2 === 0
              ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
              : sorted[Math.floor(sorted.length / 2)]
            : null;

        return {
          categoryId: category.id,
          categoryName: category.name,
          averageResponseHours,
          medianResponseHours,
          totalResponses: responseTimes.length,
        };
      });

      // Add uncategorized
      const uncategorizedOpportunities = await prisma.opportunity.findMany({
        where: {
          userId,
          categoryId: null,
        },
        include: {
          conversations: {
            include: {
              messages: {
                orderBy: {
                  sentAt: 'asc',
                },
              },
            },
          },
        },
      });

      const uncategorizedResponseTimes: number[] = [];
      uncategorizedOpportunities.forEach((opp) => {
        opp.conversations.forEach((conv) => {
          const messages = conv.messages;
          for (let i = 0; i < messages.length - 1; i++) {
            if (messages[i].sender === 'contact' && messages[i + 1].sender === 'user') {
              const hours =
                (messages[i + 1].sentAt.getTime() - messages[i].sentAt.getTime()) /
                (1000 * 60 * 60);
              uncategorizedResponseTimes.push(hours);
            }
          }
        });
      });

      if (uncategorizedResponseTimes.length > 0) {
        const sorted = uncategorizedResponseTimes.sort((a, b) => a - b);
        const averageResponseHours =
          uncategorizedResponseTimes.reduce((a, b) => a + b, 0) /
          uncategorizedResponseTimes.length;
        const medianResponseHours =
          sorted.length % 2 === 0
            ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
            : sorted[Math.floor(sorted.length / 2)];

        categoryStats.push({
          categoryId: null,
          categoryName: 'Uncategorized',
          averageResponseHours,
          medianResponseHours,
          totalResponses: uncategorizedResponseTimes.length,
        });
      }

      return categoryStats;
    },

    /**
     * Get activity over time
     */
    async getActivityOverTime(userId: string, startDate?: Date, endDate?: Date) {
      const start = startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Default: 30 days ago
      const end = endDate || new Date();

      // Generate date range
      const dates: Date[] = [];
      const current = new Date(start);
      while (current <= end) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }

      // Get conversations created per day
      const conversations = await prisma.conversation.findMany({
        where: {
          userId,
          createdAt: {
            gte: start,
            lte: end,
          },
        },
        select: {
          createdAt: true,
        },
      });

      // Get messages per day
      const messages = await prisma.message.findMany({
        where: {
          conversation: {
            userId,
          },
          sentAt: {
            gte: start,
            lte: end,
          },
        },
        select: {
          sentAt: true,
          sender: true,
        },
      });

      // Get opportunities created per day
      const opportunities = await prisma.opportunity.findMany({
        where: {
          userId,
          createdAt: {
            gte: start,
            lte: end,
          },
        },
        select: {
          createdAt: true,
        },
      });

      // Group by date
      const activityMap = new Map<string, {
        conversationsCreated: number;
        messagesSent: number;
        messagesReceived: number;
        opportunitiesCreated: number;
      }>();

      dates.forEach((date) => {
        const dateStr = date.toISOString().split('T')[0];
        activityMap.set(dateStr, {
          conversationsCreated: 0,
          messagesSent: 0,
          messagesReceived: 0,
          opportunitiesCreated: 0,
        });
      });

      conversations.forEach((conv) => {
        const dateStr = conv.createdAt.toISOString().split('T')[0];
        const activity = activityMap.get(dateStr);
        if (activity) {
          activity.conversationsCreated++;
        }
      });

      messages.forEach((msg) => {
        const dateStr = msg.sentAt.toISOString().split('T')[0];
        const activity = activityMap.get(dateStr);
        if (activity) {
          if (msg.sender === 'user') {
            activity.messagesSent++;
          } else {
            activity.messagesReceived++;
          }
        }
      });

      opportunities.forEach((opp) => {
        const dateStr = opp.createdAt.toISOString().split('T')[0];
        const activity = activityMap.get(dateStr);
        if (activity) {
          activity.opportunitiesCreated++;
        }
      });

      return Array.from(activityMap.entries())
        .map(([date, activity]) => ({
          date,
          ...activity,
        }))
        .sort((a, b) => a.date.localeCompare(b.date));
    },
  };
}

