'use client';

import { useMemo, useState } from 'react';
import {
  useTodayMetrics,
  useTodayActions,
  useOverdueItems,
} from '../../services/today.queries';
import { useUserSettings, useUpdateUserSettings } from '../../services/user-settings.queries';
import { TodayPageView } from './today-page.view';
import { TODAY_PAGE_CONFIG } from './today-page.config';
import { useTodayLoadingError } from './hooks/use-today-loading-error.state';
import { useTodayData } from './hooks/use-today-data.state';
import { useTodaySorting } from './hooks/use-today-sorting.state';
import { useTodayNavigation } from './hooks/use-today-navigation.state';
import { useEditGoalModal } from './hooks/use-edit-goal-modal.state';
import { useCreateTaskModal } from './hooks/use-create-task-modal.state';
import { useCompletedActions } from './hooks/use-completed-actions.state';
import { useCompleteTask, useUncompleteTask, useCreateTask, useDeleteTask } from '@/features/tasks';
import type { TodayAction } from './today-page.types';

export function TodayPageContainer() {
  // Fetch data using service layer queries
  const {
    data: metrics = {
      activeOpportunities: 0,
      interviewsInProgress: 0,
      overdueFollowUps: 0,
    },
    isLoading: isMetricsLoading,
    error: metricsError,
  } = useTodayMetrics();

  const {
    data: actions = [],
    isLoading: isActionsLoading,
    error: actionsError,
  } = useTodayActions();

  const {
    data: overdueItems = [],
    isLoading: isOverdueLoading,
    error: overdueError,
  } = useOverdueItems();

  const {
    data: userSettings,
    isLoading: isSettingsLoading,
    error: settingsError,
  } = useUserSettings();

  const updateSettingsMutation = useUpdateUserSettings();
  const completeTaskMutation = useCompleteTask();
  const uncompleteTaskMutation = useUncompleteTask();
  const createTaskMutation = useCreateTask();
  const deleteTaskMutation = useDeleteTask();
  const completedActions = useCompletedActions();
  const [dismissedActionIds, setDismissedActionIds] = useState<Set<string>>(new Set());
  const [actionPendingDelete, setActionPendingDelete] = useState<TodayAction | null>(null);

  // Aggregate loading and error states
  const { isLoading, error } = useTodayLoadingError(
    isMetricsLoading,
    isActionsLoading,
    isOverdueLoading,
    metricsError,
    actionsError,
    overdueError,
  );

  // Aggregate and derive data
  const { metrics: metricsWithOverdue } = useTodayData(metrics, overdueItems);

  // Add "seek opportunities" action if below goal
  const activeOpportunitiesGoal = userSettings?.activeOpportunitiesGoal ?? 15;
  const needsMoreOpportunities = metrics.activeOpportunities < activeOpportunitiesGoal;
  const opportunitiesToSeek = needsMoreOpportunities 
    ? Math.min(5, activeOpportunitiesGoal - metrics.activeOpportunities)
    : 0;

  const actionsWithSeekOpportunities = useMemo(() => {
    if (!needsMoreOpportunities) {
      return actions;
    }

    const seekOpportunitiesAction: TodayAction = {
      id: 'seek-opportunities',
      type: 'seek_opportunities',
      title: `Seek ${opportunitiesToSeek} new ${opportunitiesToSeek === 1 ? 'opportunity' : 'opportunities'} today`,
      description: `You have ${metrics.activeOpportunities} out of ${activeOpportunitiesGoal} active opportunities. Aim to add ${opportunitiesToSeek} more today.`,
      dueAt: new Date(), // Due today
      priority: 'high',
      completed: false,
    };

    // Add at the beginning with high priority
    return [seekOpportunitiesAction, ...actions];
  }, [actions, needsMoreOpportunities, opportunitiesToSeek, metrics.activeOpportunities, activeOpportunitiesGoal]);

  // Merge completion state: backend state (for tasks) + frontend state (for other actions)
  const actionsWithCompletionState = useMemo(() => {
    return actionsWithSeekOpportunities.map((action) => {
      // For tasks, use backend completion state
      if (action.source === 'task' && action.taskId) {
        return { ...action, completed: action.completed ?? false };
      }
      // For other actions, use frontend completion state
      return {
        ...action,
        completed: completedActions.isCompleted(action.id),
      };
    });
  }, [actionsWithSeekOpportunities, completedActions]);

  // Sort and limit data for display
  const { prioritizedActions, sortedOverdueItems } = useTodaySorting(
    actionsWithCompletionState.filter(
      (action) => !(dismissedActionIds.has(action.id) && (action.completed ?? false)),
    ),
    overdueItems,
  );

  // Navigation handlers
  const { handleActionClick, handleOverdueClick, handleInterviewsClick } = useTodayNavigation();

  // Action completion handlers (works for all action types)
  const handleActionToggle = async (action: TodayAction) => {
    if (action.source === 'task' && action.taskId) {
      // For tasks, toggle via API
      if (action.completed) {
        await uncompleteTaskMutation.mutateAsync(action.taskId);
        // If it was dismissed, re-show it when marking incomplete
        setDismissedActionIds((prev) => {
          const next = new Set(prev);
          next.delete(action.id);
          return next;
        });
      } else {
        await completeTaskMutation.mutateAsync(action.taskId);
      }
    } else {
      // For other actions, toggle in frontend state
      if (action.completed) {
        completedActions.markIncomplete(action.id);
        setDismissedActionIds((prev) => {
          const next = new Set(prev);
          next.delete(action.id);
          return next;
        });
      } else {
        completedActions.markCompleted(action.id);
      }
    }
  };

  const handleRemoveAction = (action: TodayAction) => {
    if (action.source === 'task' && action.taskId) {
      setActionPendingDelete(action);
      return;
    }
    // Non-task actions: just dismiss
    setDismissedActionIds((prev) => new Set(prev).add(action.id));
  };

  const handleConfirmDeleteTask = async () => {
    if (!actionPendingDelete?.taskId) return;
    await deleteTaskMutation.mutateAsync(actionPendingDelete.taskId);
    setDismissedActionIds((prev) => new Set(prev).add(actionPendingDelete.id));
    setActionPendingDelete(null);
  };

  const handleCancelDeleteTask = () => {
    setActionPendingDelete(null);
  };

  // Edit goal modal state
  const editGoalModal = useEditGoalModal({
    initialGoal: userSettings?.activeOpportunitiesGoal ?? 15,
    onSave: async (goal) => {
      await updateSettingsMutation.mutateAsync({ activeOpportunitiesGoal: goal });
    },
    isSaving: updateSettingsMutation.isPending,
  });

  // Create task modal state
  const createTaskModal = useCreateTaskModal({
    onCreate: async (task) => {
      await createTaskMutation.mutateAsync(task);
    },
    isCreating: createTaskMutation.isPending,
  });

  return (
    <TodayPageView
      metrics={metricsWithOverdue}
      prioritizedActions={prioritizedActions}
      overdueItems={sortedOverdueItems}
      isLoading={isLoading || isSettingsLoading}
      error={error || (settingsError ? 'Failed to load settings' : null)}
      config={TODAY_PAGE_CONFIG}
      onActionClick={handleActionClick}
      onOverdueClick={handleOverdueClick}
      onInterviewsClick={handleInterviewsClick}
      activeOpportunitiesGoal={userSettings?.activeOpportunitiesGoal ?? 15}
      onEditGoalClick={editGoalModal.onOpen}
      editGoalModal={editGoalModal}
      onActionToggle={handleActionToggle}
      onRemoveAction={handleRemoveAction}
      isCompletingTask={completeTaskMutation.isPending || uncompleteTaskMutation.isPending}
      onCreateTaskClick={createTaskModal.onOpen}
      createTaskModal={createTaskModal}
      deleteTaskDialog={{
        isOpen: !!actionPendingDelete,
        actionTitle: actionPendingDelete?.title ?? null,
        isDeleting: deleteTaskMutation.isPending,
        onConfirm: handleConfirmDeleteTask,
        onCancel: handleCancelDeleteTask,
      }}
    />
  );
}
