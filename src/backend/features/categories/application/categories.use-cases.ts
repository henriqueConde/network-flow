import { makeCategoriesRepo } from '../infra/categories.repo';
import { categoriesListDto } from '../http/categories.schemas';

/**
 * Use case: Get all categories for a user.
 */
export async function listCategories(userId: string) {
  const repo = makeCategoriesRepo();
  const categories = await repo.listCategories(userId);

  return categoriesListDto.parse(categories);
}

/**
 * Use case: Get a category by name for a user.
 * Returns null if not found.
 */
export async function getCategoryByName(userId: string, name: string) {
  const repo = makeCategoriesRepo();
  return await repo.getCategoryByName(userId, name);
}

/**
 * Use case: Ensure default categories exist for a user.
 * Creates default categories if they don't exist.
 */
export async function ensureDefaultCategories(userId: string) {
  const repo = makeCategoriesRepo();
  await repo.ensureDefaultCategories(userId);
  
  // Return all categories after ensuring defaults
  return listCategories(userId);
}

