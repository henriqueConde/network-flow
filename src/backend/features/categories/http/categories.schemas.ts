import { z } from 'zod';

/**
 * DTO for a category.
 */
export const categoryDto = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
});

export type CategoryDto = z.infer<typeof categoryDto>;

/**
 * Response DTO for listing categories.
 */
export const categoriesListDto = z.array(categoryDto);

export type CategoriesListDto = z.infer<typeof categoriesListDto>;

/**
 * Query schema for listing categories.
 */
export const listCategoriesQuery = z.object({
  ensureDefaults: z
    .string()
    .optional()
    .transform((val) => val === 'true'),
});

export type ListCategoriesQuery = z.infer<typeof listCategoriesQuery>;

