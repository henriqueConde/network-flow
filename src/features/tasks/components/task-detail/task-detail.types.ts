import type { Task } from '../../services/tasks.service';
import type { TASK_DETAIL_CONFIG } from './task-detail.config';
import type { TaskEditValues } from './hooks/use-task-edit.state';

export type TaskDetailViewProps = {
  task: Task | null;
  isLoading: boolean;
  error: string | null;
  config: typeof TASK_DETAIL_CONFIG;
  editValues: TaskEditValues;
  isEditing: boolean;
  isSaving: boolean;
  isToggling: boolean;
  isDeleting: boolean;
  hasChanges: boolean;
  actionError: string | null;
  onBack: () => void;
  onStartEdit: () => void;
  onChangeField: <K extends keyof TaskEditValues>(field: K, value: TaskEditValues[K]) => void;
  onSave: () => void;
  onCancelEdit: () => void;
  onToggleComplete: () => void;
  onDelete: () => void;
};


