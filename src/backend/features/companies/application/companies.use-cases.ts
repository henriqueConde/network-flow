import { makeCompaniesRepo } from '../infra/companies.repo';
import {
  companiesListDto,
  companyDetailDto,
  companyResponseDto,
  type ListCompaniesQuery,
  type CreateCompanyBody,
  type UpdateCompanyBody,
} from '../http/companies.schemas';

/**
 * Use case: list companies for the Companies Directory.
 */
export async function listCompanies(input: { userId: string } & ListCompaniesQuery) {
  const repo = makeCompaniesRepo();
  const result = await repo.listCompanies({
    userId: input.userId,
    search: input.search,
    industry: input.industry,
    fundingRound: input.fundingRound,
    hasRelevantRole: input.hasRelevantRole,
    applied: input.applied,
    page: input.page,
    pageSize: input.pageSize,
    sortBy: input.sortBy,
    sortDir: input.sortDir,
  });

  // Transform to DTO format
  const companies = result.companies.map((company) => ({
    id: company.id,
    name: company.name,
    industry: company.industry,
    fundingRound: company.fundingRound,
    fundingDate: company.fundingDate?.toISOString() || null,
    fundingSource: company.fundingSource,
    careersPageUrl: company.careersPageUrl,
    hasRelevantRole: company.hasRelevantRole,
    roleTitle: company.roleTitle,
    applied: company.applied,
    applicationDate: company.applicationDate?.toISOString() || null,
    createdAt: company.createdAt.toISOString(),
    updatedAt: company.updatedAt.toISOString(),
  }));

  return companiesListDto.parse({
    companies,
    total: result.total,
    page: result.page,
    pageSize: result.pageSize,
    totalPages: result.totalPages,
  });
}

/**
 * Use case: get a single company by ID.
 */
export async function getCompanyById(input: { userId: string; companyId: string }) {
  const repo = makeCompaniesRepo();
  const company = await repo.getCompanyById({
    userId: input.userId,
    companyId: input.companyId,
  });

  if (!company) {
    return null;
  }

  return companyDetailDto.parse({
    id: company.id,
    name: company.name,
    industry: company.industry,
    fundingRound: company.fundingRound,
    fundingDate: company.fundingDate?.toISOString() || null,
    fundingSource: company.fundingSource,
    careersPageUrl: company.careersPageUrl,
    hasRelevantRole: company.hasRelevantRole,
    roleTitle: company.roleTitle,
    applied: company.applied,
    applicationDate: company.applicationDate?.toISOString() || null,
    notes: company.notes,
    createdAt: company.createdAt.toISOString(),
    updatedAt: company.updatedAt.toISOString(),
  });
}

/**
 * Use case: create a new company.
 */
export async function createCompany(input: { userId: string } & CreateCompanyBody) {
  const repo = makeCompaniesRepo();
  const company = await repo.createCompany({
    userId: input.userId,
    name: input.name,
    industry: input.industry || null,
    fundingRound: input.fundingRound || null,
    fundingDate: input.fundingDate ? new Date(input.fundingDate) : null,
    fundingSource: input.fundingSource || null,
    careersPageUrl: input.careersPageUrl || null,
    hasRelevantRole: input.hasRelevantRole ?? false,
    roleTitle: input.roleTitle || null,
    applied: input.applied ?? false,
    applicationDate: input.applicationDate ? new Date(input.applicationDate) : null,
    notes: input.notes || null,
  });

  return companyResponseDto.parse({
    id: company.id,
    name: company.name,
    industry: company.industry,
    fundingRound: company.fundingRound,
    fundingDate: company.fundingDate?.toISOString() || null,
    fundingSource: company.fundingSource,
    careersPageUrl: company.careersPageUrl,
    hasRelevantRole: company.hasRelevantRole,
    roleTitle: company.roleTitle,
    applied: company.applied,
    applicationDate: company.applicationDate?.toISOString() || null,
    notes: company.notes,
    createdAt: company.createdAt.toISOString(),
    updatedAt: company.updatedAt.toISOString(),
  });
}

/**
 * Use case: update an existing company.
 */
export async function updateCompany(
  input: { userId: string; companyId: string } & UpdateCompanyBody,
) {
  const repo = makeCompaniesRepo();
  const company = await repo.updateCompany({
    userId: input.userId,
    companyId: input.companyId,
    name: input.name,
    industry: input.industry,
    fundingRound: input.fundingRound,
    fundingDate: input.fundingDate ? new Date(input.fundingDate) : undefined,
    fundingSource: input.fundingSource,
    careersPageUrl: input.careersPageUrl,
    hasRelevantRole: input.hasRelevantRole,
    roleTitle: input.roleTitle,
    applied: input.applied,
    applicationDate: input.applicationDate ? new Date(input.applicationDate) : undefined,
    notes: input.notes,
  });

  return companyResponseDto.parse({
    id: company.id,
    name: company.name,
    industry: company.industry,
    fundingRound: company.fundingRound,
    fundingDate: company.fundingDate?.toISOString() || null,
    fundingSource: company.fundingSource,
    careersPageUrl: company.careersPageUrl,
    hasRelevantRole: company.hasRelevantRole,
    roleTitle: company.roleTitle,
    applied: company.applied,
    applicationDate: company.applicationDate?.toISOString() || null,
    notes: company.notes,
    createdAt: company.createdAt.toISOString(),
    updatedAt: company.updatedAt.toISOString(),
  });
}

/**
 * Use case: delete a company.
 */
export async function deleteCompany(input: { userId: string; companyId: string }) {
  const repo = makeCompaniesRepo();
  await repo.deleteCompany({
    userId: input.userId,
    companyId: input.companyId,
  });
}




