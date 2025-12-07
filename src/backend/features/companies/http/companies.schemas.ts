import { z } from 'zod';

export const listCompaniesQuery = z.object({
  search: z.string().trim().optional(),
  industry: z.string().trim().optional(),
  fundingRound: z.string().trim().optional(),
  hasRelevantRole: z.coerce.boolean().optional(),
  applied: z.coerce.boolean().optional(),
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'fundingDate', 'updatedAt', 'createdAt']).optional().default('name'),
  sortDir: z.enum(['asc', 'desc']).optional().default('asc'),
});

export type ListCompaniesQuery = z.infer<typeof listCompaniesQuery>;

/**
 * Response DTO for a single company row in the Companies list.
 */
export const companyListItemDto = z.object({
  id: z.string().uuid(),
  name: z.string(),
  industry: z.string().nullable(),
  fundingRound: z.string().nullable(),
  fundingDate: z.string().datetime().nullable(),
  fundingSource: z.string().nullable(),
  careersPageUrl: z.string().nullable(),
  hasRelevantRole: z.boolean(),
  roleTitle: z.string().nullable(),
  applied: z.boolean(),
  applicationDate: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type CompanyListItemDto = z.infer<typeof companyListItemDto>;

/**
 * Response DTO for companies list with pagination.
 */
export const companiesListDto = z.object({
  companies: z.array(companyListItemDto),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
});

export type CompaniesListDto = z.infer<typeof companiesListDto>;

/**
 * Response DTO for company detail.
 */
export const companyDetailDto = z.object({
  id: z.string().uuid(),
  name: z.string(),
  industry: z.string().nullable(),
  fundingRound: z.string().nullable(),
  fundingDate: z.string().datetime().nullable(),
  fundingSource: z.string().nullable(),
  careersPageUrl: z.string().nullable(),
  hasRelevantRole: z.boolean(),
  roleTitle: z.string().nullable(),
  applied: z.boolean(),
  applicationDate: z.string().datetime().nullable(),
  notes: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type CompanyDetailDto = z.infer<typeof companyDetailDto>;

/**
 * Request body for creating a company.
 */
export const createCompanyBody = z.object({
  name: z.string().min(1, 'Company name is required'),
  industry: z.string().optional(),
  fundingRound: z.string().optional(),
  fundingDate: z.string().datetime().optional(),
  fundingSource: z.string().optional(),
  careersPageUrl: z.string().url().optional().or(z.literal('')),
  hasRelevantRole: z.boolean().optional().default(false),
  roleTitle: z.string().optional(),
  applied: z.boolean().optional().default(false),
  applicationDate: z.string().datetime().optional(),
  notes: z.string().optional(),
});

export type CreateCompanyBody = z.infer<typeof createCompanyBody>;

/**
 * Request body for updating a company.
 */
export const updateCompanyBody = createCompanyBody.partial();

export type UpdateCompanyBody = z.infer<typeof updateCompanyBody>;

/**
 * Response DTO for create/update operations.
 */
export const companyResponseDto = companyDetailDto;

export type CompanyResponseDto = z.infer<typeof companyResponseDto>;

