import { prisma } from '@/backend/core/db/prisma';

/**
 * Repository for auth-related database operations.
 * Handles user persistence in Prisma database.
 */
export function makeAuthRepo() {
  return {
    /**
     * Ensures a user exists in the Prisma users table.
     * If the user doesn't exist, creates them. If they exist, updates them if needed.
     * This is idempotent - safe to call multiple times.
     */
    async ensureUserExists(
      userId: string,
      email: string,
      name?: string | null
    ) {
      const user = await prisma.user.upsert({
        where: { id: userId },
        update: {
          // Update email if it changed (though this shouldn't happen often)
          email,
          // Update name if provided and different
          ...(name && { name }),
        },
        create: {
          id: userId,
          email,
          name: name || null,
        },
      });

      return user;
    },

    /**
     * Check if a user exists by email.
     */
    async userExistsByEmail(email: string): Promise<boolean> {
      const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true },
      });
      return !!user;
    },
  };
}

