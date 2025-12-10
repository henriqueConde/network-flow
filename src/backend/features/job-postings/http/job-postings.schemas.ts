import { z } from 'zod';

export const listJobPostingsQuery = z.object({
  search: z.string().trim().optional(),
  source: z.enum(['linkedin_post', 'linkedin_job', 'other']).optional(),
  companyId: z.string().uuid().optional(),
  outreachDone: z.coerce.boolean().optional(),
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(100).default(20),
  sortBy: z.enum(['jobTitle', 'postedAt', 'updatedAt', 'createdAt']).optional().default('postedAt'),
  sortDir: z.enum(['asc', 'desc']).optional().default('desc'),
});

export type ListJobPostingsQuery = z.infer<typeof listJobPostingsQuery>;

/**
 * Response DTO for a single job posting row in the Job Postings list.
 */
export const jobPostingListItemDto = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid().nullable(),
  companyName: z.string().nullable(),
  jobTitle: z.string(),
  jobUrl: z.string(),
  postedAt: z.string().datetime().nullable(),
  applicantsWhenFound: z.string().nullable(),
  source: z.enum(['linkedin_post', 'linkedin_job', 'other']),
  opportunityId: z.string().uuid().nullable(),
  outreachDone: z.boolean(),
  outreachChannels: z.array(z.string()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type JobPostingListItemDto = z.infer<typeof jobPostingListItemDto>;

/**
 * Response DTO for job postings list with pagination.
 */
export const jobPostingsListDto = z.object({
  jobPostings: z.array(jobPostingListItemDto),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
});

export type JobPostingsListDto = z.infer<typeof jobPostingsListDto>;

/**
 * Response DTO for job posting detail.
 */
export const jobPostingDetailDto = z.object({
  id: z.string().uuid(),
  companyId: z.string().uuid().nullable(),
  companyName: z.string().nullable(),
  jobTitle: z.string(),
  jobUrl: z.string(),
  postedAt: z.string().datetime().nullable(),
  applicantsWhenFound: z.string().nullable(),
  source: z.enum(['linkedin_post', 'linkedin_job', 'other']),
  opportunityId: z.string().uuid().nullable(),
  outreachDone: z.boolean(),
  outreachChannels: z.array(z.string()),
  contactsFound: z.any().nullable(), // JSON field - array of { name, role?, contactId? }
  notes: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type JobPostingDetailDto = z.infer<typeof jobPostingDetailDto>;

/**
 * Request body for creating a job posting.
 */
export const createJobPostingBody = z.object({
  companyId: z.string().uuid().optional(),
  jobTitle: z.string().min(1, 'Job title is required'),
  jobUrl: z.string().url('Job URL must be a valid URL'),
  postedAt: z.string().datetime().optional(),
  applicantsWhenFound: z.string().optional(),
  source: z.enum(['linkedin_post', 'linkedin_job', 'other']).default('other'),
  opportunityId: z.string().uuid().optional(),
  outreachDone: z.boolean().optional().default(false),
  outreachChannels: z.array(z.string()).optional().default([]),
  contactsFound: z.any().optional(), // JSON field
  notes: z.string().optional(),
});

export type CreateJobPostingBody = z.infer<typeof createJobPostingBody>;

/**
 * Request body for updating a job posting.
 */
export const updateJobPostingBody = createJobPostingBody.partial();

export type UpdateJobPostingBody = z.infer<typeof updateJobPostingBody>;

/**
 * Response DTO for create/update operations.
 */
export const jobPostingResponseDto = jobPostingDetailDto;

export type JobPostingResponseDto = z.infer<typeof jobPostingResponseDto>;


