import { prisma } from '@/backend/core/db/prisma';

/**
 * Repository for UserSettings data access.
 */
export function makeUserSettingsRepo() {
  return {
    /**
     * Get user settings, creating default settings if they don't exist.
     */
    async getOrCreateSettings(userId: string) {
      let settings = await prisma.userSettings.findUnique({
        where: { userId },
      });

      if (!settings) {
        settings = await prisma.userSettings.create({
          data: {
            userId,
            activeOpportunitiesGoal: 15, // Default value
          },
        });
      }

      return settings;
    },

    /**
     * Update user settings.
     */
    async updateSettings(userId: string, data: { activeOpportunitiesGoal?: number }) {
      // Ensure settings exist first
      await this.getOrCreateSettings(userId);

      const settings = await prisma.userSettings.update({
        where: { userId },
        data,
      });

      return settings;
    },
  };
}

