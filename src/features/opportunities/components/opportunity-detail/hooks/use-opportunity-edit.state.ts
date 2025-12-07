import { useState, useEffect } from 'react';
import type { OpportunityDetail } from '../../../services/opportunities.service';

type EditValues = {
  title: string | null;
  categoryId: string | null;
  stageId: string | null;
  nextActionType: string | null;
  nextActionDueAt: string | null;
  priority: 'low' | 'medium' | 'high' | null;
  summary: string | null;
  notes: string | null;
  autoFollowupsEnabled: boolean;
  strategyIds: string[];
  proofOfWorkType: 'proof_of_work_bugs' | 'proof_of_work_build' | 'other' | null;
  issuesFound: any; // JSON field - array of { issue, screenshot?, notes? }
  projectDetails: string | null;
  loomVideoUrl: string | null;
  githubRepoUrl: string | null;
  liveDemoUrl: string | null;
  sharedChannels: string[];
  teamResponses: any; // JSON field - array of { name, response, date }
};

type EditErrors = Partial<Record<keyof EditValues, string>>;

export function useOpportunityEdit(opportunity: OpportunityDetail | null) {
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState<EditValues>({
    title: null,
    categoryId: null,
    stageId: null,
    nextActionType: null,
    nextActionDueAt: null,
    priority: 'medium',
    summary: null,
    notes: null,
    autoFollowupsEnabled: false,
    strategyIds: [],
    proofOfWorkType: null,
    issuesFound: null,
    projectDetails: null,
    loomVideoUrl: null,
    githubRepoUrl: null,
    liveDemoUrl: null,
    sharedChannels: [],
    teamResponses: null,
  });
  const [errors, setErrors] = useState<EditErrors>({});

  // Initialize values from opportunity
  useEffect(() => {
    if (opportunity) {
      setValues({
        title: opportunity.title,
        categoryId: opportunity.categoryId,
        stageId: opportunity.stageId,
        nextActionType: opportunity.nextActionType,
        nextActionDueAt: opportunity.nextActionDueAtDate
          ? opportunity.nextActionDueAtDate.toISOString()
          : null,
        priority: opportunity.priority,
        summary: opportunity.summary,
        notes: opportunity.notes,
        autoFollowupsEnabled: opportunity.autoFollowupsEnabled,
        strategyIds: opportunity.strategyIds || [],
        proofOfWorkType: opportunity.proofOfWorkType,
        issuesFound: opportunity.issuesFound,
        projectDetails: opportunity.projectDetails,
        loomVideoUrl: opportunity.loomVideoUrl,
        githubRepoUrl: opportunity.githubRepoUrl,
        liveDemoUrl: opportunity.liveDemoUrl,
        sharedChannels: opportunity.sharedChannels || [],
        teamResponses: opportunity.teamResponses,
      });
      setErrors({});
    }
  }, [opportunity]);

  const changeField = (field: keyof EditValues, value: string | string[] | boolean | any | null) => {
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

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    if (opportunity) {
      setValues({
        title: opportunity.title,
        categoryId: opportunity.categoryId,
        stageId: opportunity.stageId,
        nextActionType: opportunity.nextActionType,
        nextActionDueAt: opportunity.nextActionDueAtDate
          ? opportunity.nextActionDueAtDate.toISOString()
          : null,
        priority: opportunity.priority,
        summary: opportunity.summary,
        notes: opportunity.notes,
        autoFollowupsEnabled: opportunity.autoFollowupsEnabled,
        strategyIds: opportunity.strategyIds || [],
        proofOfWorkType: opportunity.proofOfWorkType,
        issuesFound: opportunity.issuesFound,
        projectDetails: opportunity.projectDetails,
        loomVideoUrl: opportunity.loomVideoUrl,
        githubRepoUrl: opportunity.githubRepoUrl,
        liveDemoUrl: opportunity.liveDemoUrl,
        sharedChannels: opportunity.sharedChannels || [],
        teamResponses: opportunity.teamResponses,
      });
    }
    setErrors({});
    setIsEditing(false);
  };

  const getUpdatePayload = () => {
    return {
      title: values.title ?? undefined,
      categoryId: values.categoryId,
      stageId: values.stageId,
      nextActionType: values.nextActionType,
      nextActionDueAt: values.nextActionDueAt,
      priority: values.priority,
      summary: values.summary,
      notes: values.notes,
      autoFollowupsEnabled: values.autoFollowupsEnabled,
      strategyIds: values.strategyIds,
      proofOfWorkType: values.proofOfWorkType,
      issuesFound: values.issuesFound,
      projectDetails: values.projectDetails,
      loomVideoUrl: values.loomVideoUrl || null,
      githubRepoUrl: values.githubRepoUrl || null,
      liveDemoUrl: values.liveDemoUrl || null,
      sharedChannels: values.sharedChannels,
      teamResponses: values.teamResponses,
    };
  };

  return {
    isEditing,
    values,
    errors,
    changeField,
    startEditing,
    cancelEditing,
    getUpdatePayload,
    setErrors,
    setIsEditing,
  };
}

