'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { TaskListView } from './task-list.view';
import { TASK_LIST_CONFIG } from './task-list.config';
import { useTasks } from '../../services/tasks.queries';
import { useTasksFilters } from './hooks/use-tasks-filters.state';
import { useCreateTask, useUpdateTask } from '../../services/tasks.mutations';
import type { TaskCreateValues, TaskEditValues } from './task-list.types';
import type { Task } from '../../services/tasks.service';

const DEFAULT_CREATE_VALUES: TaskCreateValues = {
  title: '',
  description: '',
  dueDate: '',
  priority: 'none',
};

const DEFAULT_EDIT_VALUES: TaskEditValues = {
  id: null,
  title: '',
  description: '',
  dueDate: '',
  priority: 'none',
};

export function TaskListContainer() {
  const router = useRouter();
  const { filters, setCompletion, setDueDate, setPriority, clearFilters, hasCustomFilters } = useTasksFilters();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createValues, setCreateValues] = useState<TaskCreateValues>(DEFAULT_CREATE_VALUES);
  const [createErrors, setCreateErrors] = useState<Partial<Record<keyof TaskCreateValues, string>>>({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editValues, setEditValues] = useState<TaskEditValues>(DEFAULT_EDIT_VALUES);
  const [editErrors, setEditErrors] = useState<Partial<Record<keyof TaskCreateValues, string>>>({});
  const [actionError, setActionError] = useState<string | null>(null);

  const { data: tasks = [], isLoading, error } = useTasks({
    completed: filters.completion === 'all' ? undefined : filters.completion === 'completed',
    dueDate: filters.dueDate === 'all' ? undefined : filters.dueDate,
    priority: filters.priority === 'all' ? undefined : filters.priority,
  });

  const createMutation = useCreateTask();
  const updateMutation = useUpdateTask();

  const taskById = useMemo(() => {
    const map = new Map<string, Task>();
    tasks.forEach((t) => map.set(t.id, t));
    return map;
  }, [tasks]);

  const handleSelectTask = (taskId: string) => {
    router.push(`/tasks/${taskId}`);
  };

  const openCreate = () => {
    setCreateErrors({});
    setActionError(null);
    setCreateValues(DEFAULT_CREATE_VALUES);
    setIsCreateOpen(true);
  };

  const closeCreate = () => {
    setIsCreateOpen(false);
  };

  const handleChangeCreateField = <K extends keyof TaskCreateValues>(field: K, value: TaskCreateValues[K]) => {
    setCreateValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitCreate = async () => {
    const errors: Partial<Record<keyof TaskCreateValues, string>> = {};
    if (!createValues.title.trim()) {
      errors.title = TASK_LIST_CONFIG.copy.createDialog.errors.titleRequired;
    }
    setCreateErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setActionError(null);
    const payload = {
      title: createValues.title.trim(),
      description: createValues.description.trim() || undefined,
      dueAt: createValues.dueDate ? new Date(createValues.dueDate).toISOString() : undefined,
      priority: (createValues.priority === 'none' || createValues.priority === 'all') 
        ? undefined 
        : (createValues.priority as 'low' | 'medium' | 'high'),
    };

    try {
      await createMutation.mutateAsync(payload);
      closeCreate();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to create task');
    }
  };

  const openEdit = (taskId: string) => {
    const task = taskById.get(taskId);
    if (!task) return;
    setEditErrors({});
    setActionError(null);
    setEditValues({
      id: task.id,
      title: task.title,
      description: task.description ?? '',
      dueDate: task.dueAt ? task.dueAt.split('T')[0] : '',
      priority: (task.priority as TaskEditValues['priority']) ?? 'none',
    });
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
  };

  const handleChangeEditField = <K extends keyof TaskCreateValues>(field: K, value: TaskCreateValues[K]) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitEdit = async () => {
    if (!editValues.id) return;
    const errors: Partial<Record<keyof TaskCreateValues, string>> = {};
    if (!editValues.title.trim()) {
      errors.title = TASK_LIST_CONFIG.copy.editDialog.errors.titleRequired;
    }
    setEditErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setActionError(null);
    const payload = {
      title: editValues.title.trim(),
      description: editValues.description.trim() || null,
      dueAt: editValues.dueDate ? new Date(editValues.dueDate).toISOString() : null,
      priority: (editValues.priority === 'none' || editValues.priority === 'all') 
        ? null 
        : (editValues.priority as Task['priority']),
    };

    try {
      await updateMutation.mutateAsync({ id: editValues.id, payload });
      closeEdit();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to update task');
    }
  };

  return (
    <TaskListView
      tasks={tasks}
      isLoading={isLoading}
      error={error ? 'Failed to load tasks' : null}
      filters={filters}
      hasCustomFilters={hasCustomFilters}
      isCreateOpen={isCreateOpen}
      isCreating={createMutation.isPending}
      createValues={createValues}
      createErrors={createErrors}
      isEditOpen={isEditOpen}
      isEditing={updateMutation.isPending}
      editValues={editValues}
      editErrors={editErrors}
      actionError={actionError}
      config={TASK_LIST_CONFIG}
      onChangeCompletion={setCompletion}
      onChangeDueDate={setDueDate}
      onChangePriority={setPriority}
      onClearFilters={clearFilters}
      onSelectTask={handleSelectTask}
      onOpenCreate={openCreate}
      onCloseCreate={closeCreate}
      onChangeCreateField={handleChangeCreateField}
      onSubmitCreate={handleSubmitCreate}
      onOpenEdit={openEdit}
      onCloseEdit={closeEdit}
      onChangeEditField={handleChangeEditField}
      onSubmitEdit={handleSubmitEdit}
    />
  );
}

