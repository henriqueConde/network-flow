import { client } from '@/shared/services/http/client';
import { z } from 'zod';

/**
 * Company list item DTO.
 */
const CompanyListItemDto = z.object({
  id: z.string(),
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

export type CompanyListItem = z.infer<typeof CompanyListItemDto> & {
  createdAtDate: Date;
  updatedAtDate: Date;
  fundingDateDate: Date | null;
  applicationDateDate: Date | null;
};

/**
 * Companies list response DTO.
 */
const CompaniesListDto = z.object({
  companies: z.array(CompanyListItemDto),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
});

/**
 * Company detail DTO.
 */
const CompanyDetailDto = z.object({
  id: z.string(),
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

export type CompanyDetail = Omit<z.infer<typeof CompanyDetailDto>, 'createdAt' | 'updatedAt' | 'fundingDate' | 'applicationDate'> & {
  createdAtDate: Date;
  updatedAtDate: Date;
  fundingDateDate: Date | null;
  applicationDateDate: Date | null;
};

/**
 * Create company payload.
 */
const CreateCompanyBody = z.object({
  name: z.string().min(1),
  industry: z.string().optional(),
  fundingRound: z.string().optional(),
  fundingDate: z.string().datetime().optional(),
  fundingSource: z.string().optional(),
  careersPageUrl: z.string().url().optional().or(z.literal('')),
  hasRelevantRole: z.boolean().optional(),
  roleTitle: z.string().optional(),
  applied: z.boolean().optional(),
  applicationDate: z.string().datetime().optional(),
  notes: z.string().optional(),
});

export type CreateCompanyPayload = z.infer<typeof CreateCompanyBody>;

/**
 * Update company payload.
 */
const UpdateCompanyBody = z.object({
  name: z.string().min(1).optional(),
  industry: z.string().optional(),
  fundingRound: z.string().optional(),
  fundingDate: z.string().datetime().optional(),
  fundingSource: z.string().optional(),
  careersPageUrl: z.string().url().optional().or(z.literal('')),
  hasRelevantRole: z.boolean().optional(),
  roleTitle: z.string().optional(),
  applied: z.boolean().optional(),
  applicationDate: z.string().datetime().optional(),
  notes: z.string().optional(),
});

export type UpdateCompanyPayload = z.infer<typeof UpdateCompanyBody>;

/**
 * Fetch companies for the directory.
 */
export async function listCompanies(params: {
  search?: string;
  industry?: string;
  fundingRound?: string;
  hasRelevantRole?: boolean;
  applied?: boolean;
  page: number;
  pageSize: number;
  sortBy: 'name' | 'fundingDate' | 'updatedAt' | 'createdAt';
  sortDir: 'asc' | 'desc';
}): Promise<{
  companies: CompanyListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}> {
  const res = await client.get('/api/companies', {
    params,
  });
  const data = CompaniesListDto.parse(res.data);

  return {
    ...data,
    companies: data.companies.map((item) => ({
      ...item,
      createdAtDate: new Date(item.createdAt),
      updatedAtDate: new Date(item.updatedAt),
      fundingDateDate: item.fundingDate ? new Date(item.fundingDate) : null,
      applicationDateDate: item.applicationDate ? new Date(item.applicationDate) : null,
    })),
  };
}

/**
 * Fetch a single company by ID with full detail.
 */
export async function getCompanyDetail(id: string): Promise<CompanyDetail> {
  const res = await client.get(`/api/companies/${id}`);
  const data = CompanyDetailDto.parse(res.data);

  return {
    ...data,
    createdAtDate: new Date(data.createdAt),
    updatedAtDate: new Date(data.updatedAt),
    fundingDateDate: data.fundingDate ? new Date(data.fundingDate) : null,
    applicationDateDate: data.applicationDate ? new Date(data.applicationDate) : null,
  };
}

/**
 * Create a new company.
 */
export async function createCompany(payload: CreateCompanyPayload) {
  const body = CreateCompanyBody.parse(payload);
  const res = await client.post('/api/companies', body);
  return res.data as { id: string };
}

/**
 * Update a company.
 */
export async function updateCompany(
  id: string,
  payload: UpdateCompanyPayload,
): Promise<CompanyDetail> {
  const body = UpdateCompanyBody.parse(payload);
  const res = await client.patch(`/api/companies/${id}`, body);
  const data = CompanyDetailDto.parse(res.data);

  return {
    ...data,
    createdAtDate: new Date(data.createdAt),
    updatedAtDate: new Date(data.updatedAt),
    fundingDateDate: data.fundingDate ? new Date(data.fundingDate) : null,
    applicationDateDate: data.applicationDate ? new Date(data.applicationDate) : null,
  };
}

/**
 * Delete a company.
 */
export async function deleteCompany(id: string): Promise<void> {
  await client.delete(`/api/companies/${id}`);
}


