import { prisma } from '@/backend/core/db/prisma';

/**
 * Repository for Challenges data access.
 */
export function makeChallengesRepo() {
  return {
    /**
     * List challenges for a user with optional filters.
     */
    async listChallenges(params: {
      userId: string;
      search?: string;
      active?: boolean;
      page: number;
      pageSize: number;
      sortBy: 'name' | 'startDate' | 'endDate' | 'updatedAt' | 'createdAt';
      sortDir: 'asc' | 'desc';
    }) {
      const {
        userId,
        search,
        active,
        page,
        pageSize,
        sortBy,
        sortDir,
      } = params;

      const where: any = {
        userId,
      };

      // Search by name
      if (search && search.trim().length > 0) {
        where.name = {
          contains: search,
          mode: 'insensitive',
        };
      }

      // Filter by active (current date between startDate and endDate)
      if (active !== undefined) {
        const now = new Date();
        if (active) {
          where.startDate = {
            lte: now,
          };
          where.endDate = {
            gte: now,
          };
        } else {
          where.OR = [
            {
              startDate: {
                gt: now,
              },
            },
            {
              endDate: {
                lt: now,
              },
            },
          ];
        }
      }

      const [challenges, total] = await Promise.all([
        prisma.challenge.findMany({
          where,
          orderBy: {
            [sortBy]: sortDir,
          },
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
        prisma.challenge.count({ where }),
      ]);

      return {
        challenges,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      };
    },

    /**
     * Get a single challenge by ID.
     */
    async getChallengeById(params: { userId: string; challengeId: string }) {
      const challenge = await prisma.challenge.findFirst({
        where: {
          id: params.challengeId,
          userId: params.userId,
        },
      });

      return challenge;
    },

    /**
     * Create a new challenge.
     */
    async createChallenge(params: {
      userId: string;
      name: string;
      startDate: Date;
      endDate: Date;
      goal: number;
      outreachesPerDay?: number | null;
      outreachesCount?: number;
      acceptsCount?: number;
      repliesCount?: number;
      callsCount?: number;
      interviewsCount?: number;
      notes?: string | null;
    }) {
      const challenge = await prisma.challenge.create({
        data: {
          userId: params.userId,
          name: params.name,
          startDate: params.startDate,
          endDate: params.endDate,
          goal: params.goal,
          outreachesPerDay: params.outreachesPerDay ?? null,
          outreachesCount: params.outreachesCount ?? 0,
          acceptsCount: params.acceptsCount ?? 0,
          repliesCount: params.repliesCount ?? 0,
          callsCount: params.callsCount ?? 0,
          interviewsCount: params.interviewsCount ?? 0,
          notes: params.notes || null,
        },
      });

      return challenge;
    },

    /**
     * Update an existing challenge.
     */
    async updateChallenge(params: {
      userId: string;
      challengeId: string;
      name?: string;
      startDate?: Date;
      endDate?: Date;
      goal?: number;
      outreachesPerDay?: number | null;
      outreachesCount?: number;
      acceptsCount?: number;
      repliesCount?: number;
      callsCount?: number;
      interviewsCount?: number;
      notes?: string | null;
    }) {
      const challenge = await prisma.challenge.update({
        where: {
          id: params.challengeId,
          userId: params.userId,
        },
        data: {
          ...(params.name !== undefined && { name: params.name }),
          ...(params.startDate !== undefined && { startDate: params.startDate }),
          ...(params.endDate !== undefined && { endDate: params.endDate }),
          ...(params.goal !== undefined && { goal: params.goal }),
          ...(params.outreachesPerDay !== undefined && { outreachesPerDay: params.outreachesPerDay }),
          ...(params.outreachesCount !== undefined && { outreachesCount: params.outreachesCount }),
          ...(params.acceptsCount !== undefined && { acceptsCount: params.acceptsCount }),
          ...(params.repliesCount !== undefined && { repliesCount: params.repliesCount }),
          ...(params.callsCount !== undefined && { callsCount: params.callsCount }),
          ...(params.interviewsCount !== undefined && { interviewsCount: params.interviewsCount }),
          ...(params.notes !== undefined && { notes: params.notes }),
        },
      });

      return challenge;
    },

    /**
     * Delete a challenge.
     */
    async deleteChallenge(params: { userId: string; challengeId: string }) {
      await prisma.challenge.delete({
        where: {
          id: params.challengeId,
          userId: params.userId,
        },
      });
    },
  };
}

