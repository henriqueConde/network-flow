/**
 * Public API for tasks feature module.
 * Other modules should only import from this file.
 */
export { useTasks, useTask } from './services/tasks.queries';
export {
  useCreateTask,
  useUpdateTask,
  useCompleteTask,
  useUncompleteTask,
  useDeleteTask,
} from './services/tasks.mutations';
export type { Task } from './services/tasks.service';
export type { CreateTaskPayload, UpdateTaskPayload } from './services/tasks.service';
export { TaskListContainer } from './components/task-list/task-list.container';
export { TaskDetailContainer } from './components/task-detail/task-detail.container';


