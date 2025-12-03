import { prisma } from '@/backend/core/db/prisma';

/**
 * Repository for Categories data access.
 */
export function makeCategoriesRepo() {
  return {
    /**
     * Get all categories for a user, ordered by name.
     */
    async listCategories(userId: string) {
      const categories = await prisma.category.findMany({
        where: {
          userId,
        },
        orderBy: {
          name: 'asc',
        },
      });

      return categories;
    },

    /**
     * Get a category by name for a user.
     */
    async getCategoryByName(userId: string, name: string) {
      const category = await prisma.category.findUnique({
        where: {
          userId_name: {
            userId,
            name,
          },
        },
      });

      return category;
    },

    /**
     * Create default categories for a user if they don't exist.
     */
    async ensureDefaultCategories(userId: string) {
      const defaultCategories = [
        { name: 'Recently funded startup', description: 'Startup that recently raised funding' },
        { name: 'Cold outreach', description: 'Initial contact without prior relationship' },
        { name: 'Warm outreach', description: 'Contact through mutual connection or prior interaction' },
        { name: 'Recruiter', description: 'Professional recruiter or talent acquisition' },
        { name: 'Hiring manager', description: 'Direct hiring manager or team lead' },
        { name: 'Speedster', description: 'Fast-moving or high-priority opportunity' },
      ];

      const existingCategories = await prisma.category.findMany({
        where: { userId },
        select: { name: true },
      });

      const existingNames = new Set(existingCategories.map((c) => c.name));
      const categoriesToCreate = defaultCategories.filter((category) => !existingNames.has(category.name));

      if (categoriesToCreate.length === 0) {
        return [];
      }

      const created = await prisma.category.createMany({
        data: categoriesToCreate.map((category) => ({
          userId,
          name: category.name,
          description: category.description,
        })),
      });

      // Return the newly created categories
      return await prisma.category.findMany({
        where: {
          userId,
          name: { in: categoriesToCreate.map((c) => c.name) },
        },
      });
    },
  };
}

