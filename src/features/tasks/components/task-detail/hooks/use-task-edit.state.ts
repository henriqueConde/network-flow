import { useEffect, useMemo, useState } from 'react';
import type { Task } from '../../../services/tasks.service';
import type { PriorityType } from '@/shared/types';

export type TaskEditValues = {
  title: string;
  description: string;
  dueDate: string;
  priority: PriorityType | 'none';
};

function taskToValues(task: Task | null): TaskEditValues {
  return {
    title: task?.title ?? '',
    description: task?.description ?? '',
    dueDate: task?.dueAt ? task.dueAt.split('T')[0] : '',
    priority: (task?.priority as PriorityType | null) ?? 'none',
  };
}

export function useTaskEdit(task: Task | null) {
  const [values, setValues] = useState<TaskEditValues>(() => taskToValues(task));
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setValues(taskToValues(task));
    setIsEditing(false);
  }, [task?.id, task?.updatedAt]);

  const hasChanges = useMemo(() => {
    if (!task) return false;
    const current = taskToValues(task);
    return (
      values.title !== current.title ||
      values.description !== current.description ||
      values.dueDate !== current.dueDate ||
      values.priority !== current.priority
    );
  }, [task, values.description, values.dueDate, values.priority, values.title]);

  const startEditing = () => setIsEditing(true);

  const cancelEditing = () => {
    setValues(taskToValues(task));
    setIsEditing(false);
  };

  const finishEditing = () => setIsEditing(false);

  const changeField = <K extends keyof TaskEditValues>(field: K, value: TaskEditValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  return {
    values,
    isEditing,
    hasChanges,
    startEditing,
    cancelEditing,
    finishEditing,
    changeField,
  };
}


