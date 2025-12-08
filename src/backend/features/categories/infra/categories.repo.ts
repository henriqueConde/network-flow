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
        { name: 'SMART Strategy', description: 'Systematic approach to warm and cold referrals' },
        { name: 'Recently Funded Startup', description: 'Target startups that recently raised money before job ads get flooded' },
        { name: 'Proof-Of-Work Outreach', description: 'Stand out by fixing real problems or building with the company\'s own product' },
        { name: 'Loom Email Outreach', description: 'High-signal emails + 1–2 minute Loom videos to get direct replies from decision-makers' },
        { name: 'Job Board Lead Sniping', description: 'Use LinkedIn jobs as lead generation, not as your main application channel' },
      ];

      // Delete old default categories
      const oldCategoryNames = [
        'Cold outreach',
        'Warm outreach',
        'Recruiter',
        'Hiring manager',
        'Speedster',
        'Recently funded startup', // Old lowercase version - delete this
      ];

      // Get all existing categories to check for case-insensitive matches
      const allExistingCategories = await prisma.category.findMany({
        where: { userId },
        select: { id: true, name: true },
      });

      // Delete old categories (exact match)
      await prisma.category.deleteMany({
        where: {
          userId,
          name: { in: oldCategoryNames },
        },
      });

      // Also delete "Recently funded startup" if it exists with any casing variation
      // (to handle the case where user might have the old lowercase version)
      const oldCategoryNamesLower = oldCategoryNames.map((n) => n.toLowerCase());
      const categoriesToDeleteByCase = allExistingCategories.filter((cat) => {
        const catNameLower = cat.name.toLowerCase();
        // Delete if it matches old category names (case-insensitive)
        return oldCategoryNamesLower.includes(catNameLower);
      });

      if (categoriesToDeleteByCase.length > 0) {
        await prisma.category.deleteMany({
          where: {
            userId,
            id: { in: categoriesToDeleteByCase.map((c) => c.id) },
          },
        });
      }

      // For "Recently Funded Startup", also delete any case variation that isn't exactly "Recently Funded Startup"
      const recentlyFundedVariations = allExistingCategories.filter((cat) => {
        const catNameLower = cat.name.toLowerCase();
        return catNameLower === 'recently funded startup' && cat.name !== 'Recently Funded Startup';
      });

      if (recentlyFundedVariations.length > 0) {
        await prisma.category.deleteMany({
          where: {
            userId,
            id: { in: recentlyFundedVariations.map((c) => c.id) },
          },
        });
      }

      // Now check what categories exist after deletions
      const existingCategories = await prisma.category.findMany({
        where: { userId },
        select: { name: true },
      });

      const existingNames = new Set(existingCategories.map((c) => c.name));
      const categoriesToCreate = defaultCategories.filter((category) => !existingNames.has(category.name));

      if (categoriesToCreate.length > 0) {
        await prisma.category.createMany({
          data: categoriesToCreate.map((category) => ({
            userId,
            name: category.name,
            description: category.description,
          })),
        });
      }

      // Return all categories after migration (deletion and creation)
      return await prisma.category.findMany({
        where: { userId },
        orderBy: { name: 'asc' },
      });
    },
  };
}

