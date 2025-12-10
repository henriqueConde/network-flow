import { makeJobPostingsRepo } from '../infra/job-postings.repo';
import {
  jobPostingsListDto,
  jobPostingDetailDto,
  jobPostingResponseDto,
  type ListJobPostingsQuery,
  type CreateJobPostingBody,
  type UpdateJobPostingBody,
} from '../http/job-postings.schemas';

/**
 * Use case: list job postings for the Job Postings Directory.
 */
export async function listJobPostings(input: { userId: string } & ListJobPostingsQuery) {
  const repo = makeJobPostingsRepo();
  const result = await repo.listJobPostings({
    userId: input.userId,
    search: input.search,
    source: input.source,
    companyId: input.companyId,
    outreachDone: input.outreachDone,
    page: input.page,
    pageSize: input.pageSize,
    sortBy: input.sortBy,
    sortDir: input.sortDir,
  });

  // Transform to DTO format
  const jobPostings = result.jobPostings.map((jobPosting) => ({
    id: jobPosting.id,
    companyId: jobPosting.companyId,
    companyName: jobPosting.company?.name || null,
    jobTitle: jobPosting.jobTitle,
    jobUrl: jobPosting.jobUrl,
    postedAt: jobPosting.postedAt?.toISOString() || null,
    applicantsWhenFound: jobPosting.applicantsWhenFound,
    source: jobPosting.source as 'linkedin_post' | 'linkedin_job' | 'other',
    opportunityId: jobPosting.opportunityId,
    outreachDone: jobPosting.outreachDone,
    outreachChannels: jobPosting.outreachChannels,
    createdAt: jobPosting.createdAt.toISOString(),
    updatedAt: jobPosting.updatedAt.toISOString(),
  }));

  return jobPostingsListDto.parse({
    jobPostings,
    total: result.total,
    page: result.page,
    pageSize: result.pageSize,
    totalPages: result.totalPages,
  });
}

/**
 * Use case: get a single job posting by ID.
 */
export async function getJobPostingById(input: { userId: string; jobPostingId: string }) {
  const repo = makeJobPostingsRepo();
  const jobPosting = await repo.getJobPostingById({
    userId: input.userId,
    jobPostingId: input.jobPostingId,
  });

  if (!jobPosting) {
    return null;
  }

  return jobPostingDetailDto.parse({
    id: jobPosting.id,
    companyId: jobPosting.companyId,
    companyName: jobPosting.company?.name || null,
    jobTitle: jobPosting.jobTitle,
    jobUrl: jobPosting.jobUrl,
    postedAt: jobPosting.postedAt?.toISOString() || null,
    applicantsWhenFound: jobPosting.applicantsWhenFound,
    source: jobPosting.source as 'linkedin_post' | 'linkedin_job' | 'other',
    opportunityId: jobPosting.opportunityId,
    outreachDone: jobPosting.outreachDone,
    outreachChannels: jobPosting.outreachChannels,
    contactsFound: jobPosting.contactsFound,
    notes: jobPosting.notes,
    createdAt: jobPosting.createdAt.toISOString(),
    updatedAt: jobPosting.updatedAt.toISOString(),
  });
}

/**
 * Use case: create a new job posting.
 */
export async function createJobPosting(input: { userId: string } & CreateJobPostingBody) {
  const repo = makeJobPostingsRepo();
  const jobPosting = await repo.createJobPosting({
    userId: input.userId,
    companyId: input.companyId || null,
    jobTitle: input.jobTitle,
    jobUrl: input.jobUrl,
    postedAt: input.postedAt ? new Date(input.postedAt) : null,
    applicantsWhenFound: input.applicantsWhenFound || null,
    source: input.source,
    opportunityId: input.opportunityId || null,
    outreachDone: input.outreachDone ?? false,
    outreachChannels: input.outreachChannels || [],
    contactsFound: input.contactsFound || null,
    notes: input.notes || null,
  });

  return jobPostingResponseDto.parse({
    id: jobPosting.id,
    companyId: jobPosting.companyId,
    companyName: jobPosting.company?.name || null,
    jobTitle: jobPosting.jobTitle,
    jobUrl: jobPosting.jobUrl,
    postedAt: jobPosting.postedAt?.toISOString() || null,
    applicantsWhenFound: jobPosting.applicantsWhenFound,
    source: jobPosting.source as 'linkedin_post' | 'linkedin_job' | 'other',
    opportunityId: jobPosting.opportunityId,
    outreachDone: jobPosting.outreachDone,
    outreachChannels: jobPosting.outreachChannels,
    contactsFound: jobPosting.contactsFound,
    notes: jobPosting.notes,
    createdAt: jobPosting.createdAt.toISOString(),
    updatedAt: jobPosting.updatedAt.toISOString(),
  });
}

/**
 * Use case: update an existing job posting.
 */
export async function updateJobPosting(
  input: { userId: string; jobPostingId: string } & UpdateJobPostingBody,
) {
  const repo = makeJobPostingsRepo();
  const jobPosting = await repo.updateJobPosting({
    userId: input.userId,
    jobPostingId: input.jobPostingId,
    companyId: input.companyId,
    jobTitle: input.jobTitle,
    jobUrl: input.jobUrl,
    postedAt: input.postedAt ? new Date(input.postedAt) : undefined,
    applicantsWhenFound: input.applicantsWhenFound,
    source: input.source,
    opportunityId: input.opportunityId,
    outreachDone: input.outreachDone,
    outreachChannels: input.outreachChannels,
    contactsFound: input.contactsFound,
    notes: input.notes,
  });

  return jobPostingResponseDto.parse({
    id: jobPosting.id,
    companyId: jobPosting.companyId,
    companyName: jobPosting.company?.name || null,
    jobTitle: jobPosting.jobTitle,
    jobUrl: jobPosting.jobUrl,
    postedAt: jobPosting.postedAt?.toISOString() || null,
    applicantsWhenFound: jobPosting.applicantsWhenFound,
    source: jobPosting.source as 'linkedin_post' | 'linkedin_job' | 'other',
    opportunityId: jobPosting.opportunityId,
    outreachDone: jobPosting.outreachDone,
    outreachChannels: jobPosting.outreachChannels,
    contactsFound: jobPosting.contactsFound,
    notes: jobPosting.notes,
    createdAt: jobPosting.createdAt.toISOString(),
    updatedAt: jobPosting.updatedAt.toISOString(),
  });
}

/**
 * Use case: delete a job posting.
 */
export async function deleteJobPosting(input: { userId: string; jobPostingId: string }) {
  const repo = makeJobPostingsRepo();
  await repo.deleteJobPosting({
    userId: input.userId,
    jobPostingId: input.jobPostingId,
  });
}


