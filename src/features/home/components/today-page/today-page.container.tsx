'use client';

import { useMemo } from 'react';
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
    };

    // Add at the beginning with high priority
    return [seekOpportunitiesAction, ...actions];
  }, [actions, needsMoreOpportunities, opportunitiesToSeek, metrics.activeOpportunities, activeOpportunitiesGoal]);

  // Sort and limit data for display
  const { prioritizedActions, sortedOverdueItems } = useTodaySorting(
    actionsWithSeekOpportunities,
    overdueItems,
  );

  // Navigation handlers
  const { handleActionClick, handleOverdueClick } = useTodayNavigation();

  // Edit goal modal state
  const editGoalModal = useEditGoalModal({
    initialGoal: userSettings?.activeOpportunitiesGoal ?? 15,
    onSave: async (goal) => {
      await updateSettingsMutation.mutateAsync({ activeOpportunitiesGoal: goal });
    },
    isSaving: updateSettingsMutation.isPending,
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
      activeOpportunitiesGoal={userSettings?.activeOpportunitiesGoal ?? 15}
      onEditGoalClick={editGoalModal.onOpen}
      editGoalModal={editGoalModal}
    />
  );
}
