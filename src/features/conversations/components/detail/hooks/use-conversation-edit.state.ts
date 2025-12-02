import { useState, useEffect } from 'react';
import type { ConversationDetail } from '../../../services/conversations.service';

type EditValues = {
  categoryId: string | null;
  stageId: string | null;
  nextActionType: string | null;
  nextActionDueAt: string | null;
  priority: 'low' | 'medium' | 'high';
  notes: string | null;
};

type EditErrors = Partial<Record<keyof EditValues, string>>;

export function useConversationEdit(conversation: ConversationDetail | null) {
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState<EditValues>({
    categoryId: null,
    stageId: null,
    nextActionType: null,
    nextActionDueAt: null,
    priority: 'medium',
    notes: null,
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

  const startEditing = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
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
      });
    }
    setErrors({});
    setIsEditing(false);
  };

  const getUpdatePayload = () => {
    return {
      categoryId: values.categoryId,
      stageId: values.stageId,
      nextActionType: values.nextActionType,
      nextActionDueAt: values.nextActionDueAt,
      priority: values.priority,
      notes: values.notes,
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

