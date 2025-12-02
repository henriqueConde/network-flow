import { prisma } from '@/backend/core/db/prisma';

/**
 * Repository for Stages data access.
 */
export function makeStagesRepo() {
  return {
    /**
     * Get all stages for a user, ordered by their order field.
     */
    async listStages(userId: string) {
      const stages = await prisma.stage.findMany({
        where: {
          userId,
        },
        orderBy: {
          order: 'asc',
        },
      });

      return stages;
    },

    /**
     * Create default stages for a user if they don't exist.
     */
    async ensureDefaultStages(userId: string) {
      const defaultStages = [
        { name: 'Not contacted', description: 'Haven\'t reached out yet', order: 0 },
        { name: 'First touch', description: 'Initial outreach sent', order: 1 },
        { name: 'Replied', description: 'They responded', order: 2 },
        { name: 'Screening scheduled', description: 'Call or screening scheduled', order: 3 },
        { name: 'Interviewing', description: 'In the interview process', order: 4 },
        { name: 'Offer', description: 'Received an offer', order: 5 },
        { name: 'Dormant', description: 'No recent activity', order: 6 },
        { name: 'Closed (positive)', description: 'Closed successfully', order: 7 },
        { name: 'Closed (negative)', description: 'Closed without success', order: 8 },
      ];

      const existingStages = await prisma.stage.findMany({
        where: { userId },
        select: { name: true },
      });

      const existingNames = new Set(existingStages.map((s) => s.name));
      const stagesToCreate = defaultStages.filter((stage) => !existingNames.has(stage.name));

      if (stagesToCreate.length === 0) {
        return [];
      }

      const created = await prisma.stage.createMany({
        data: stagesToCreate.map((stage) => ({
          userId,
          name: stage.name,
          description: stage.description,
          order: stage.order,
        })),
      });

      // Return the newly created stages
      return await prisma.stage.findMany({
        where: {
          userId,
          name: { in: stagesToCreate.map((s) => s.name) },
        },
      });
    },
  };
}
