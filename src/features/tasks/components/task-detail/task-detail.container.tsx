'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { TaskDetailView } from './task-detail.view';
import { TASK_DETAIL_CONFIG } from './task-detail.config';
import { useTask } from '../../services/tasks.queries';
import {
  useCompleteTask,
  useDeleteTask,
  useUncompleteTask,
  useUpdateTask,
} from '../../services/tasks.mutations';
import { useTaskEdit } from './hooks/use-task-edit.state';

export function TaskDetailContainer() {
  const router = useRouter();
  const params = useParams<{ id?: string }>();
  const taskId = useMemo(() => params?.id as string | undefined, [params?.id]);

  const [actionError, setActionError] = useState<string | null>(null);

  const { data: task, isLoading, error } = useTask(taskId ?? '');
  const edit = useTaskEdit(task ?? null);

  const updateMutation = useUpdateTask();
  const completeMutation = useCompleteTask();
  const uncompleteMutation = useUncompleteTask();
  const deleteMutation = useDeleteTask();

  const handleBack = () => {
    router.push('/tasks');
  };

  const handleSave = async () => {
    if (!taskId) return;
    setActionError(null);

    const payload = {
      title: edit.values.title.trim(),
      description: edit.values.description.trim() || null,
      dueAt: edit.values.dueDate ? new Date(edit.values.dueDate).toISOString() : null,
      priority: edit.values.priority === 'none' ? null : edit.values.priority,
    };

    try {
      await updateMutation.mutateAsync({ id: taskId, payload });
      edit.finishEditing();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to save task');
    }
  };

  const handleToggleComplete = async () => {
    if (!taskId || !task) return;
    setActionError(null);
    try {
      if (task.completedAt) {
        await uncompleteMutation.mutateAsync(taskId);
      } else {
        await completeMutation.mutateAsync(taskId);
      }
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!taskId) return;
    setActionError(null);
    try {
      await deleteMutation.mutateAsync(taskId);
      router.push('/tasks');
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to delete task');
    }
  };

  return (
    <TaskDetailView
      task={task ?? null}
      isLoading={isLoading}
      error={error ? TASK_DETAIL_CONFIG.copy.error : null}
      config={TASK_DETAIL_CONFIG}
      editValues={edit.values}
      isEditing={edit.isEditing}
      isSaving={updateMutation.isPending}
      isToggling={completeMutation.isPending || uncompleteMutation.isPending}
      isDeleting={deleteMutation.isPending}
      hasChanges={edit.hasChanges}
      actionError={actionError}
      onBack={handleBack}
      onStartEdit={edit.startEditing}
      onChangeField={edit.changeField}
      onSave={handleSave}
      onCancelEdit={edit.cancelEditing}
      onToggleComplete={handleToggleComplete}
      onDelete={handleDelete}
    />
  );
}


