import { useState } from 'react';
import { ChallengeFormSchema } from '../challenges-page.schema';
import type { ChallengeFormValues } from '../challenges-page.schema';
import type { ChallengeListItem } from '../../../services/challenges.service';

type SubmitHandler = (values: ChallengeFormValues, editingChallenge: ChallengeListItem | null) => Promise<void> | void;

/**
 * UI state hook for the "Create/Edit Challenge" dialog.
 */
export function useChallengeDialog(onSubmit: SubmitHandler) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState<ChallengeListItem | null>(null);
  const [values, setValues] = useState<ChallengeFormValues>({
    name: '',
    startDate: '',
    endDate: '',
    goal: 100,
    outreachesCount: 0,
    acceptsCount: 0,
    repliesCount: 0,
    callsCount: 0,
    interviewsCount: 0,
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ChallengeFormValues, string>>>({});

  const open = (challenge?: ChallengeListItem) => {
    if (challenge) {
      setEditingChallenge(challenge);
      setValues({
        name: challenge.name,
        startDate: challenge.startDateDate.toISOString(),
        endDate: challenge.endDateDate.toISOString(),
        goal: challenge.goal,
        outreachesCount: challenge.outreachesCount,
        acceptsCount: challenge.acceptsCount,
        repliesCount: challenge.repliesCount,
        callsCount: challenge.callsCount,
        interviewsCount: challenge.interviewsCount,
        notes: '',
      });
    } else {
      setEditingChallenge(null);
      setValues({
        name: '',
        startDate: '',
        endDate: '',
        goal: 100,
        outreachesCount: 0,
        acceptsCount: 0,
        repliesCount: 0,
        callsCount: 0,
        interviewsCount: 0,
        notes: '',
      });
    }
    setErrors({});
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setEditingChallenge(null);
  };

  const changeField = (
    field: keyof ChallengeFormValues,
    value: ChallengeFormValues[keyof ChallengeFormValues],
  ) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const submit = async () => {
    const parsed = ChallengeFormSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof ChallengeFormValues, string>> = {};
      parsed.error.issues.forEach((issue) => {
        const path = issue.path[0] as keyof ChallengeFormValues | undefined;
        if (path && !fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    const currentEditingChallenge = editingChallenge;
    await onSubmit(parsed.data, currentEditingChallenge);
  };

  return {
    isOpen,
    editingChallenge,
    values,
    errors,
    open,
    close,
    changeField,
    submit,
  };
}


