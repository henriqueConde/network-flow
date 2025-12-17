import { useState } from 'react';
import { JobPostingFormSchema } from '../job-postings-page.schema';
import type { JobPostingFormValues } from '../job-postings-page.schema';
import type { JobPostingListItem } from '../../../services/job-postings.service';

type SubmitHandler = (values: JobPostingFormValues, editingJobPosting: JobPostingListItem | null) => Promise<void> | void;

/**
 * UI state hook for the "Create/Edit Job Posting" dialog.
 */
export function useJobPostingDialog(onSubmit: SubmitHandler) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingJobPosting, setEditingJobPosting] = useState<JobPostingListItem | null>(null);
  const [values, setValues] = useState<JobPostingFormValues>({
    companyId: '',
    jobTitle: '',
    jobUrl: '',
    postedAt: '',
    applicantsWhenFound: '',
    source: 'other',
    outreachDone: false,
    outreachChannels: [],
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof JobPostingFormValues, string>>>({});

  const open = (jobPosting?: JobPostingListItem) => {
    if (jobPosting) {
      setEditingJobPosting(jobPosting);
      setValues({
        companyId: jobPosting.companyId || '',
        jobTitle: jobPosting.jobTitle,
        jobUrl: jobPosting.jobUrl,
        postedAt: jobPosting.postedAt || '',
        applicantsWhenFound: jobPosting.applicantsWhenFound || '',
        source: jobPosting.source,
        outreachDone: jobPosting.outreachDone,
        outreachChannels: jobPosting.outreachChannels || [],
        notes: '',
      });
    } else {
      setEditingJobPosting(null);
      setValues({
        companyId: '',
        jobTitle: '',
        jobUrl: '',
        postedAt: '',
        applicantsWhenFound: '',
        source: 'other',
        outreachDone: false,
        outreachChannels: [],
        notes: '',
      });
    }
    setErrors({});
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setEditingJobPosting(null);
  };

  const changeField = (
    field: keyof JobPostingFormValues,
    value: JobPostingFormValues[keyof JobPostingFormValues],
  ) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submit = async () => {
    const parsed = JobPostingFormSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof JobPostingFormValues, string>> = {};
      parsed.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof JobPostingFormValues | undefined;
        if (path && !fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    const currentEditingJobPosting = editingJobPosting;
    await onSubmit(parsed.data, currentEditingJobPosting);
  };

  return {
    isOpen,
    editingJobPosting,
    values,
    errors,
    open,
    close,
    changeField,
    submit,
  };
}



