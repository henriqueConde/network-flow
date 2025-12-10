import { useState } from 'react';

/**
 * UI state hook for the delete job posting confirmation dialog.
 */
export function useDeleteJobPostingDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [jobPostingId, setJobPostingId] = useState<string | null>(null);
  const [jobPostingTitle, setJobPostingTitle] = useState<string>('');

  const open = (id: string, title: string) => {
    setJobPostingId(id);
    setJobPostingTitle(title);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setJobPostingId(null);
    setJobPostingTitle('');
  };

  return {
    isOpen,
    jobPostingId,
    jobPostingTitle,
    open,
    close,
  };
}


