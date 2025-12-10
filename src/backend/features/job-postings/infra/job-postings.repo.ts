import { prisma } from '@/backend/core/db/prisma';

/**
 * Repository for Job Postings data access.
 */
export function makeJobPostingsRepo() {
  return {
    /**
     * List job postings for a user with optional filters.
     */
    async listJobPostings(params: {
      userId: string;
      search?: string;
      source?: 'linkedin_post' | 'linkedin_job' | 'other';
      companyId?: string;
      outreachDone?: boolean;
      page: number;
      pageSize: number;
      sortBy: 'jobTitle' | 'postedAt' | 'updatedAt' | 'createdAt';
      sortDir: 'asc' | 'desc';
    }) {
      const {
        userId,
        search,
        source,
        companyId,
        outreachDone,
        page,
        pageSize,
        sortBy,
        sortDir,
      } = params;

      const where: any = {
        userId,
      };

      // Search by job title or company name
      if (search && search.trim().length > 0) {
        where.OR = [
          {
            jobTitle: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            company: {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            },
          },
        ];
      }

      if (source) {
        where.source = source;
      }

      if (companyId) {
        where.companyId = companyId;
      }

      if (outreachDone !== undefined) {
        where.outreachDone = outreachDone;
      }

      const [jobPostings, total] = await Promise.all([
        prisma.jobPosting.findMany({
          where,
          include: {
            company: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            [sortBy === 'jobTitle' ? 'jobTitle' : sortBy]: sortDir,
          },
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
        prisma.jobPosting.count({ where }),
      ]);

      return {
        jobPostings,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      };
    },

    /**
     * Get a single job posting by ID.
     */
    async getJobPostingById(params: { userId: string; jobPostingId: string }) {
      const jobPosting = await prisma.jobPosting.findFirst({
        where: {
          id: params.jobPostingId,
          userId: params.userId,
        },
        include: {
          company: {
            select: {
              name: true,
            },
          },
        },
      });

      return jobPosting;
    },

    /**
     * Create a new job posting.
     */
    async createJobPosting(params: {
      userId: string;
      companyId?: string | null;
      jobTitle: string;
      jobUrl: string;
      postedAt?: Date | null;
      applicantsWhenFound?: string | null;
      source: 'linkedin_post' | 'linkedin_job' | 'other';
      opportunityId?: string | null;
      outreachDone?: boolean;
      outreachChannels?: string[];
      contactsFound?: any; // JSON field
      notes?: string | null;
    }) {
      const jobPosting = await prisma.jobPosting.create({
        data: {
          userId: params.userId,
          companyId: params.companyId || null,
          jobTitle: params.jobTitle,
          jobUrl: params.jobUrl,
          postedAt: params.postedAt || null,
          applicantsWhenFound: params.applicantsWhenFound || null,
          source: params.source,
          opportunityId: params.opportunityId || null,
          outreachDone: params.outreachDone ?? false,
          outreachChannels: params.outreachChannels || [],
          contactsFound: params.contactsFound || null,
          notes: params.notes || null,
        },
        include: {
          company: {
            select: {
              name: true,
            },
          },
        },
      });

      return jobPosting;
    },

    /**
     * Update an existing job posting.
     */
    async updateJobPosting(params: {
      userId: string;
      jobPostingId: string;
      companyId?: string | null;
      jobTitle?: string;
      jobUrl?: string;
      postedAt?: Date | null;
      applicantsWhenFound?: string | null;
      source?: 'linkedin_post' | 'linkedin_job' | 'other';
      opportunityId?: string | null;
      outreachDone?: boolean;
      outreachChannels?: string[];
      contactsFound?: any; // JSON field
      notes?: string | null;
    }) {
      const jobPosting = await prisma.jobPosting.update({
        where: {
          id: params.jobPostingId,
          userId: params.userId,
        },
        data: {
          ...(params.companyId !== undefined && { companyId: params.companyId }),
          ...(params.jobTitle !== undefined && { jobTitle: params.jobTitle }),
          ...(params.jobUrl !== undefined && { jobUrl: params.jobUrl }),
          ...(params.postedAt !== undefined && { postedAt: params.postedAt }),
          ...(params.applicantsWhenFound !== undefined && {
            applicantsWhenFound: params.applicantsWhenFound,
          }),
          ...(params.source !== undefined && { source: params.source }),
          ...(params.opportunityId !== undefined && { opportunityId: params.opportunityId }),
          ...(params.outreachDone !== undefined && { outreachDone: params.outreachDone }),
          ...(params.outreachChannels !== undefined && { outreachChannels: params.outreachChannels }),
          ...(params.contactsFound !== undefined && { contactsFound: params.contactsFound }),
          ...(params.notes !== undefined && { notes: params.notes }),
        },
        include: {
          company: {
            select: {
              name: true,
            },
          },
        },
      });

      return jobPosting;
    },

    /**
     * Delete a job posting.
     */
    async deleteJobPosting(params: { userId: string; jobPostingId: string }) {
      await prisma.jobPosting.delete({
        where: {
          id: params.jobPostingId,
          userId: params.userId,
        },
      });
    },
  };
}


