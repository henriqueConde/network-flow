import { prisma } from '@/backend/core/db/prisma';

/**
 * Repository for Companies data access.
 */
export function makeCompaniesRepo() {
  return {
    /**
     * List companies for a user with optional filters.
     */
    async listCompanies(params: {
      userId: string;
      search?: string;
      industry?: string;
      fundingRound?: string;
      hasRelevantRole?: boolean;
      applied?: boolean;
      page: number;
      pageSize: number;
      sortBy: 'name' | 'fundingDate' | 'updatedAt' | 'createdAt';
      sortDir: 'asc' | 'desc';
    }) {
      const {
        userId,
        search,
        industry,
        fundingRound,
        hasRelevantRole,
        applied,
        page,
        pageSize,
        sortBy,
        sortDir,
      } = params;

      const where: any = {
        userId,
      };

      // Search by name or industry
      if (search && search.trim().length > 0) {
        where.OR = [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            industry: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ];
      }

      if (industry) {
        where.industry = {
          contains: industry,
          mode: 'insensitive',
        };
      }

      if (fundingRound) {
        where.fundingRound = fundingRound;
      }

      if (hasRelevantRole !== undefined) {
        where.hasRelevantRole = hasRelevantRole;
      }

      if (applied !== undefined) {
        where.applied = applied;
      }

      const [companies, total] = await Promise.all([
        prisma.company.findMany({
          where,
          orderBy: {
            [sortBy === 'fundingDate' ? 'fundingDate' : sortBy]: sortDir,
          },
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
        prisma.company.count({ where }),
      ]);

      return {
        companies,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      };
    },

    /**
     * Get a single company by ID.
     */
    async getCompanyById(params: { userId: string; companyId: string }) {
      const company = await prisma.company.findFirst({
        where: {
          id: params.companyId,
          userId: params.userId,
        },
      });

      return company;
    },

    /**
     * Create a new company.
     */
    async createCompany(params: {
      userId: string;
      name: string;
      industry?: string | null;
      fundingRound?: string | null;
      fundingDate?: Date | null;
      fundingSource?: string | null;
      careersPageUrl?: string | null;
      hasRelevantRole?: boolean;
      roleTitle?: string | null;
      applied?: boolean;
      applicationDate?: Date | null;
      notes?: string | null;
    }) {
      const company = await prisma.company.create({
        data: {
          userId: params.userId,
          name: params.name,
          industry: params.industry,
          fundingRound: params.fundingRound,
          fundingDate: params.fundingDate,
          fundingSource: params.fundingSource,
          careersPageUrl: params.careersPageUrl,
          hasRelevantRole: params.hasRelevantRole ?? false,
          roleTitle: params.roleTitle,
          applied: params.applied ?? false,
          applicationDate: params.applicationDate,
          notes: params.notes,
        },
      });

      return company;
    },

    /**
     * Update an existing company.
     */
    async updateCompany(params: {
      userId: string;
      companyId: string;
      name?: string;
      industry?: string | null;
      fundingRound?: string | null;
      fundingDate?: Date | null;
      fundingSource?: string | null;
      careersPageUrl?: string | null;
      hasRelevantRole?: boolean;
      roleTitle?: string | null;
      applied?: boolean;
      applicationDate?: Date | null;
      notes?: string | null;
    }) {
      const company = await prisma.company.update({
        where: {
          id: params.companyId,
          userId: params.userId,
        },
        data: {
          ...(params.name !== undefined && { name: params.name }),
          ...(params.industry !== undefined && { industry: params.industry }),
          ...(params.fundingRound !== undefined && { fundingRound: params.fundingRound }),
          ...(params.fundingDate !== undefined && { fundingDate: params.fundingDate }),
          ...(params.fundingSource !== undefined && { fundingSource: params.fundingSource }),
          ...(params.careersPageUrl !== undefined && { careersPageUrl: params.careersPageUrl }),
          ...(params.hasRelevantRole !== undefined && { hasRelevantRole: params.hasRelevantRole }),
          ...(params.roleTitle !== undefined && { roleTitle: params.roleTitle }),
          ...(params.applied !== undefined && { applied: params.applied }),
          ...(params.applicationDate !== undefined && { applicationDate: params.applicationDate }),
          ...(params.notes !== undefined && { notes: params.notes }),
        },
      });

      return company;
    },

    /**
     * Delete a company.
     */
    async deleteCompany(params: { userId: string; companyId: string }) {
      await prisma.company.delete({
        where: {
          id: params.companyId,
          userId: params.userId,
        },
      });
    },
  };
}


