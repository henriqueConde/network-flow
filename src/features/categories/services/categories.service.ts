import { client } from '@/shared/services/http/client';
import { z } from 'zod';

const CategoryDto = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
});

const CategoriesListDto = z.array(CategoryDto);

export type Category = z.infer<typeof CategoryDto>;

/**
 * Fetch all categories for the current user.
 */
export async function listCategories(): Promise<Category[]> {
  const res = await client.get('/api/categories');
  return CategoriesListDto.parse(res.data);
}

/**
 * Ensure default categories exist for the current user.
 * Creates default categories if none are found.
 */
export async function ensureDefaultCategories(): Promise<Category[]> {
  const res = await client.get('/api/categories', { params: { ensureDefaults: 'true' } });
  return CategoriesListDto.parse(res.data);
}

