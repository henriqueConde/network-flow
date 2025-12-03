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
  });
  const [errors, setErrors] = useState<EditErrors>({});

  // Sync values when conversation changes
  useEffect(() => {
    if (conversation) {
      setValues({
        categoryId: conversation.categoryId,
        stageId: conversation.stageId,
        nextActionType: conversation.nextActionType,
        nextActionDueAt: conversation.nextActionDueAt
          ? new Date(conversation.nextActionDueAt).toISOString()
          : null,
        priority: conversation.priority,
        notes: conversation.notes,
        originalUrl: conversation.originalUrl,
      });
      setErrors({});
    }
  }, [conversation]);

  const changeField = (field: keyof EditValues, value: string | null) => {
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
        nextActionDueAt: conversation.nextActionDueAt
          ? new Date(conversation.nextActionDueAt).toISOString()
          : null,
        priority: conversation.priority,
        originalUrl: conversation.originalUrl,
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

