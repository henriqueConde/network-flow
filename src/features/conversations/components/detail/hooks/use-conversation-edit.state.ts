import { useState, useEffect } from 'react';
import type { ConversationDetail } from '../../../services/conversations.service';

type EditValues = {
  categoryId: string | null;
  stageId: string | null;
  nextActionType: string | null;
  nextActionDueAt: string | null;
  priority: 'low' | 'medium' | 'high' | null | null;
  notes: string | null;
  originalUrl: string | null;
  strategyIds: string[];
  responseReceived: boolean;
  responseReceivedAt: string | null;
  emailSentAt: string | null;
  loomVideoUrl: string | null;
  loomSent: boolean;
  emailFollowUpDates: string[];
  emailStatus: 'no_reply' | 'replied' | 'call_scheduled' | 'rejected' | 'in_process' | null;
  followUp1Date: string | null;
  followUp2Date: string | null;
  followUp3Date: string | null;
};

type EditErrors = Partial<Record<keyof EditValues, string>>;

export function useConversationEdit(conversation: ConversationDetail | null) {
  const [isEditingMetadata, setIsEditingMetadata] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [values, setValues] = useState<EditValues>({
    categoryId: null,
    stageId: null,
    nextActionType: null,
    nextActionDueAt: null,
    priority: 'medium' as 'low' | 'medium' | 'high' | null,
    notes: null,
    originalUrl: null,
    strategyIds: [],
    responseReceived: false,
    responseReceivedAt: null,
    emailSentAt: null,
    loomVideoUrl: null,
    loomSent: false,
    emailFollowUpDates: [],
    emailStatus: null,
    followUp1Date: null,
    followUp2Date: null,
    followUp3Date: null,
  });
  const [errors, setErrors] = useState<EditErrors>({});

  // Sync values when conversation changes
  useEffect(() => {
    if (conversation) {
      setValues({
        categoryId: conversation.categoryId,
        stageId: conversation.stageId,
        nextActionType: conversation.nextActionType,
        nextActionDueAt: conversation.nextActionDueAtDate
          ? conversation.nextActionDueAtDate.toISOString()
          : null,
        priority: conversation.priority,
        notes: conversation.notes,
        originalUrl: conversation.originalUrl,
        strategyIds: conversation.strategyIds || [],
        responseReceived: conversation.responseReceived || false,
        responseReceivedAt: conversation.responseReceivedAtDate
          ? conversation.responseReceivedAtDate.toISOString()
          : null,
        emailSentAt: conversation.emailSentAtDate
          ? conversation.emailSentAtDate.toISOString()
          : null,
        loomVideoUrl: conversation.loomVideoUrl,
        loomSent: conversation.loomSent || false,
        emailFollowUpDates: conversation.emailFollowUpDatesDates.map((d) => d.toISOString()),
        emailStatus: conversation.emailStatus,
        followUp1Date: conversation.followUp1DateDate
          ? conversation.followUp1DateDate.toISOString()
          : null,
        followUp2Date: conversation.followUp2DateDate
          ? conversation.followUp2DateDate.toISOString()
          : null,
        followUp3Date: conversation.followUp3DateDate
          ? conversation.followUp3DateDate.toISOString()
          : null,
      });
      setErrors({});
    }
  }, [conversation]);

  const changeField = (field: keyof EditValues, value: string | string[] | boolean | null) => {
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

  const startEditingMetadata = () => {
    setIsEditingMetadata(true);
  };

  const startEditingNotes = () => {
    setIsEditingNotes(true);
  };

  const cancelEditingMetadata = () => {
    if (conversation) {
      setValues((prev) => ({
        ...prev,
        categoryId: conversation.categoryId,
        stageId: conversation.stageId,
        nextActionType: conversation.nextActionType,
        nextActionDueAt: conversation.nextActionDueAtDate
          ? conversation.nextActionDueAtDate.toISOString()
          : null,
        priority: conversation.priority,
        originalUrl: conversation.originalUrl,
        strategyIds: conversation.strategyIds || [],
        responseReceived: conversation.responseReceived || false,
        responseReceivedAt: conversation.responseReceivedAtDate
          ? conversation.responseReceivedAtDate.toISOString()
          : null,
        emailSentAt: conversation.emailSentAtDate
          ? conversation.emailSentAtDate.toISOString()
          : null,
        loomVideoUrl: conversation.loomVideoUrl,
        loomSent: conversation.loomSent || false,
        emailFollowUpDates: conversation.emailFollowUpDatesDates.map((d) => d.toISOString()),
        emailStatus: conversation.emailStatus,
        followUp1Date: conversation.followUp1DateDate
          ? conversation.followUp1DateDate.toISOString()
          : null,
        followUp2Date: conversation.followUp2DateDate
          ? conversation.followUp2DateDate.toISOString()
          : null,
        followUp3Date: conversation.followUp3DateDate
          ? conversation.followUp3DateDate.toISOString()
          : null,
      }));
    }
    // Clear only metadata-related errors
    setErrors((prev) => {
      const next = { ...prev };
      delete next.categoryId;
      delete next.stageId;
      delete next.nextActionType;
      delete next.nextActionDueAt;
      delete next.priority;
      delete next.originalUrl;
      return next;
    });
    setIsEditingMetadata(false);
  };

  const cancelEditingNotes = () => {
    if (conversation) {
      setValues((prev) => ({
        ...prev,
        notes: conversation.notes,
      }));
    }
    // Clear only notes-related errors
    setErrors((prev) => {
      const next = { ...prev };
      delete next.notes;
      return next;
    });
    setIsEditingNotes(false);
  };

  const getUpdatePayload = () => {
    return {
      categoryId: values.categoryId,
      stageId: values.stageId,
      nextActionType: values.nextActionType,
      nextActionDueAt: values.nextActionDueAt,
      priority: values.priority,
      notes: values.notes,
      originalUrl: values.originalUrl,
      strategyIds: values.strategyIds,
      responseReceived: values.responseReceived,
      responseReceivedAt: values.responseReceivedAt,
      emailSentAt: values.emailSentAt,
      loomVideoUrl: values.loomVideoUrl || null,
      loomSent: values.loomSent,
      emailFollowUpDates: values.emailFollowUpDates,
      emailStatus: values.emailStatus,
      followUp1Date: values.followUp1Date,
      followUp2Date: values.followUp2Date,
      followUp3Date: values.followUp3Date,
    };
  };

  return {
    isEditingMetadata,
    isEditingNotes,
    values,
    errors,
    changeField,
    startEditingMetadata,
    startEditingNotes,
    cancelEditingMetadata,
    cancelEditingNotes,
    getUpdatePayload,
    setErrors,
    setIsEditingMetadata,
    setIsEditingNotes,
  };
}

