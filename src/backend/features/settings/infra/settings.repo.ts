import { prisma } from '@/backend/core/db/prisma';

/**
 * Repository for Settings data access.
 */
export function makeSettingsRepo() {
  return {
    /**
     * Get sync status for a user.
     */
    async getSyncStatus(userId: string) {
      const syncStatus = await prisma.syncStatus.findUnique({
        where: {
          userId,
        },
      });

      // If no sync status exists, create one
      if (!syncStatus) {
        return await prisma.syncStatus.create({
          data: {
            userId,
          },
        });
      }

      return syncStatus;
    },

    /**
     * Update sync status.
     */
    async updateSyncStatus(
      userId: string,
      updates: {
        lastLinkedInImportAt?: Date | null;
        latestMessageTimestampFromExport?: Date | null;
        latestLinkedInEmailTimestamp?: Date | null;
      },
    ) {
      const updated = await prisma.syncStatus.upsert({
        where: {
          userId,
        },
        create: {
          userId,
          ...updates,
        },
        update: {
          ...updates,
          updatedAt: new Date(),
        },
      });

      return updated;
    },
  };
}



