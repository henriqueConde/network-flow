import { useState, useEffect } from 'react';
import type { ChallengeDetail } from '../../../services/challenges.service';

type EditValues = {
  name: string;
  startDate: string;
  endDate: string;
  goal: number;
  outreachesPerDay: number | null;
  outreachesCount: number;
  acceptsCount: number;
  repliesCount: number;
  callsCount: number;
  interviewsCount: number;
  notes: string;
};

type EditErrors = Partial<Record<keyof EditValues, string>>;

export function useChallengeEdit(challenge: ChallengeDetail | null) {
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState<EditValues>({
    name: '',
    startDate: '',
    endDate: '',
    goal: 0,
    outreachesPerDay: null,
    outreachesCount: 0,
    acceptsCount: 0,
    repliesCount: 0,
    callsCount: 0,
    interviewsCount: 0,
    notes: '',
  });
  const [errors, setErrors] = useState<EditErrors>({});

  // Initialize values from challenge
  useEffect(() => {
    if (challenge) {
      setValues({
        name: challenge.name,
        startDate: challenge.startDateDate.toISOString(),
        endDate: challenge.endDateDate.toISOString(),
        goal: challenge.goal,
        outreachesPerDay: challenge.outreachesPerDay ?? null,
        outreachesCount: challenge.outreachesCount,
        acceptsCount: challenge.acceptsCount,
        repliesCount: challenge.repliesCount,
        callsCount: challenge.callsCount,
        interviewsCount: challenge.interviewsCount,
        notes: challenge.notes || '',
      });
    }
  }, [challenge]);

  const changeField = (field: keyof EditValues, value: string | number | null) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: EditErrors = {};

    if (!values.name.trim()) {
      newErrors.name = 'Challenge name is required';
    }

    if (!values.startDate) {
      newErrors.startDate = 'Start date is required';
    }

    if (!values.endDate) {
      newErrors.endDate = 'End date is required';
    }

    if (values.goal < 1) {
      newErrors.goal = 'Goal must be at least 1';
    }

    if (new Date(values.startDate) >= new Date(values.endDate)) {
      newErrors.endDate = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    if (challenge) {
      setValues({
        name: challenge.name,
        startDate: challenge.startDateDate.toISOString(),
        endDate: challenge.endDateDate.toISOString(),
        goal: challenge.goal,
        outreachesPerDay: challenge.outreachesPerDay ?? null,
        outreachesCount: challenge.outreachesCount,
        acceptsCount: challenge.acceptsCount,
        repliesCount: challenge.repliesCount,
        callsCount: challenge.callsCount,
        interviewsCount: challenge.interviewsCount,
        notes: challenge.notes || '',
      });
    }
    setErrors({});
    setIsEditing(false);
  };

  const getUpdatePayload = () => {
    return {
      name: values.name.trim(),
      startDate: values.startDate,
      endDate: values.endDate,
      goal: values.goal,
      outreachesPerDay: values.outreachesPerDay ?? null,
      outreachesCount: values.outreachesCount,
      acceptsCount: values.acceptsCount,
      repliesCount: values.repliesCount,
      callsCount: values.callsCount,
      interviewsCount: values.interviewsCount,
      notes: values.notes.trim() || undefined,
    };
  };

  return {
    isEditing,
    values,
    errors,
    changeField,
    validate,
    startEditing,
    cancelEditing,
    getUpdatePayload,
  };
}

