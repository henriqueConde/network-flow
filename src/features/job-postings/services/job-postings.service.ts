import { client } from '@/shared/services/http/client';
import { z } from 'zod';

/**
 * Job posting list item DTO.
 */
const JobPostingListItemDto = z.object({
  id: z.string(),
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

export type JobPostingListItem = z.infer<typeof JobPostingListItemDto> & {
  createdAtDate: Date;
  updatedAtDate: Date;
  postedAtDate: Date | null;
};

/**
 * Job postings list response DTO.
 */
const JobPostingsListDto = z.object({
  jobPostings: z.array(JobPostingListItemDto),
  total: z.number(),
  page: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
});

/**
 * Job posting detail DTO.
 */
const JobPostingDetailDto = z.object({
  id: z.string(),
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
  contactsFound: z.any().nullable(),
  notes: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type JobPostingDetail = Omit<z.infer<typeof JobPostingDetailDto>, 'createdAt' | 'updatedAt' | 'postedAt'> & {
  createdAtDate: Date;
  updatedAtDate: Date;
  postedAtDate: Date | null;
};

/**
 * Create job posting payload.
 */
const CreateJobPostingBody = z.object({
  companyId: z.string().uuid().optional(),
  jobTitle: z.string().min(1),
  jobUrl: z.string().url(),
  postedAt: z.string().datetime().optional(),
  applicantsWhenFound: z.string().optional(),
  source: z.enum(['linkedin_post', 'linkedin_job', 'other']).default('other'),
  opportunityId: z.string().uuid().optional(),
  outreachDone: z.boolean().optional(),
  outreachChannels: z.array(z.string()).optional(),
  contactsFound: z.any().optional(),
  notes: z.string().optional(),
});

export type CreateJobPostingPayload = z.infer<typeof CreateJobPostingBody>;

/**
 * Update job posting payload.
 */
const UpdateJobPostingBody = z.object({
  companyId: z.string().uuid().optional(),
  jobTitle: z.string().min(1).optional(),
  jobUrl: z.string().url().optional(),
  postedAt: z.string().datetime().optional(),
  applicantsWhenFound: z.string().optional(),
  source: z.enum(['linkedin_post', 'linkedin_job', 'other']).optional(),
  opportunityId: z.string().uuid().optional(),
  outreachDone: z.boolean().optional(),
  outreachChannels: z.array(z.string()).optional(),
  contactsFound: z.any().optional(),
  notes: z.string().optional(),
});

export type UpdateJobPostingPayload = z.infer<typeof UpdateJobPostingBody>;

/**
 * Fetch job postings for the directory.
 */
export async function listJobPostings(params: {
  search?: string;
  source?: 'linkedin_post' | 'linkedin_job' | 'other';
  companyId?: string;
  outreachDone?: boolean;
  page: number;
  pageSize: number;
  sortBy: 'jobTitle' | 'postedAt' | 'updatedAt' | 'createdAt';
  sortDir: 'asc' | 'desc';
}): Promise<{
  jobPostings: JobPostingListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}> {
  const res = await client.get('/api/job-postings', {
    params,
  });
  const data = JobPostingsListDto.parse(res.data);

  return {
    ...data,
    jobPostings: data.jobPostings.map((item) => ({
      ...item,
      createdAtDate: new Date(item.createdAt),
      updatedAtDate: new Date(item.updatedAt),
      postedAtDate: item.postedAt ? new Date(item.postedAt) : null,
    })),
  };
}

/**
 * Fetch a single job posting by ID with full detail.
 */
export async function getJobPostingDetail(id: string): Promise<JobPostingDetail> {
  const res = await client.get(`/api/job-postings/${id}`);
  const data = JobPostingDetailDto.parse(res.data);

  return {
    ...data,
    createdAtDate: new Date(data.createdAt),
    updatedAtDate: new Date(data.updatedAt),
    postedAtDate: data.postedAt ? new Date(data.postedAt) : null,
  };
}

/**
 * Create a new job posting.
 */
export async function createJobPosting(payload: CreateJobPostingPayload) {
  const body = CreateJobPostingBody.parse(payload);
  const res = await client.post('/api/job-postings', body);
  return res.data as { id: string };
}

/**
 * Update a job posting.
 */
export async function updateJobPosting(
  id: string,
  payload: UpdateJobPostingPayload,
): Promise<JobPostingDetail> {
  const body = UpdateJobPostingBody.parse(payload);
  const res = await client.patch(`/api/job-postings/${id}`, body);
  const data = JobPostingDetailDto.parse(res.data);

  return {
    ...data,
    createdAtDate: new Date(data.createdAt),
    updatedAtDate: new Date(data.updatedAt),
    postedAtDate: data.postedAt ? new Date(data.postedAt) : null,
  };
}

/**
 * Delete a job posting.
 */
export async function deleteJobPosting(id: string): Promise<void> {
  await client.delete(`/api/job-postings/${id}`);
}

