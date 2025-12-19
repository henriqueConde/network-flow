import type { Task } from '../../services/tasks.service';
import type { TaskCompletionFilter, TaskDueDateFilter, TaskPriorityFilter } from './hooks/use-tasks-filters.state';
import type { TASK_LIST_CONFIG } from './task-list.config';

export type TaskListFilters = {
  completion: TaskCompletionFilter;
  dueDate: TaskDueDateFilter;
  priority: TaskPriorityFilter;
};

export type TaskCreateValues = {
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriorityFilter | 'none';
};

export type TaskEditValues = TaskCreateValues & { id: string | null };

export type TaskListViewProps = {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  filters: TaskListFilters;
  config: typeof TASK_LIST_CONFIG;
  hasCustomFilters: boolean;
  isCreateOpen: boolean;
  isCreating: boolean;
  createValues: TaskCreateValues;
  createErrors: Partial<Record<keyof TaskCreateValues, string>>;
  isEditOpen: boolean;
  isEditing: boolean;
  editValues: TaskEditValues;
  editErrors: Partial<Record<keyof TaskCreateValues, string>>;
  actionError: string | null;
  onChangeCompletion: (value: TaskCompletionFilter) => void;
  onChangeDueDate: (value: TaskDueDateFilter) => void;
  onChangePriority: (value: TaskPriorityFilter) => void;
  onClearFilters: () => void;
  onSelectTask: (id: string) => void;
  onOpenCreate: () => void;
  onCloseCreate: () => void;
  onChangeCreateField: <K extends keyof TaskCreateValues>(field: K, value: TaskCreateValues[K]) => void;
  onSubmitCreate: () => void;
  onOpenEdit: (taskId: string) => void;
  onCloseEdit: () => void;
  onChangeEditField: <K extends keyof TaskCreateValues>(field: K, value: TaskCreateValues[K]) => void;
  onSubmitEdit: () => void;
};

