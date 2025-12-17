'use client';

import { Box, Typography, CircularProgress, Alert, Chip, IconButton, Checkbox, Button } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import type { TodayPageViewProps } from './today-page.types';
import { styles } from './today-page.styles';
import { EditGoalModal } from './components/edit-goal-modal.view';
import { CreateTaskModal } from './components/create-task-modal.view';

export function TodayPageView({
  metrics,
  prioritizedActions,
  overdueItems,
  isLoading,
  error,
  config,
  onActionClick,
  onOverdueClick,
  onInterviewsClick,
  activeOpportunitiesGoal,
  onEditGoalClick,
  editGoalModal,
  onActionToggle,
  onRemoveAction,
  isCompletingTask,
  onCreateTaskClick,
  createTaskModal,
}: TodayPageViewProps) {
  if (isLoading) {
    return (
      <Box sx={styles.container()}>
        <Box sx={styles.header()}>
          <Typography variant="h3" sx={styles.title()}>
            {config.copy.title}
          </Typography>
          <Typography variant="body2" sx={styles.subtitle()}>
            {config.copy.subtitle}
          </Typography>
        </Box>
        <Box sx={styles.scrollableContent()}>
          <Box sx={styles.loadingContainer()}>
            <CircularProgress />
          </Box>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.container()}>
        <Box sx={styles.header()}>
          <Typography variant="h3" sx={styles.title()}>
            {config.copy.title}
          </Typography>
          <Typography variant="body2" sx={styles.subtitle()}>
            {config.copy.subtitle}
          </Typography>
        </Box>
        <Box sx={styles.scrollableContent()}>
          <Alert severity="error" sx={styles.errorContainer()}>
            {error}
          </Alert>
        </Box>
      </Box>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Box sx={styles.container()}>
      {/* Header - Fixed */}
      <Box sx={styles.header()}>
        <Typography variant="h3" sx={styles.title()}>
          {config.copy.title}
        </Typography>
        <Typography variant="body2" sx={styles.subtitle()}>
          {config.copy.subtitle}
        </Typography>
      </Box>

      {/* Scrollable Content */}
      <Box sx={styles.scrollableContent()}>
        {/* Metrics Snapshot */}
        <Box sx={styles.metricsGrid()}>
        <Box sx={styles.metricCard()}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 0.5 }}>
            <Typography sx={styles.metricLabel()}>
              {config.copy.metrics.activeOpportunities.label}
            </Typography>
            <IconButton
              size="small"
              onClick={onEditGoalClick}
              sx={{ 
                padding: 0.5,
                marginTop: -0.5,
                marginRight: -0.5,
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <EditIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
          <Typography sx={styles.metricValue()}>
            {metrics.activeOpportunities}/{activeOpportunitiesGoal}
          </Typography>
          {metrics.activeOpportunities < activeOpportunitiesGoal && (
            <Typography sx={styles.goalSuggestion()}>
              Aim to add {Math.min(5, activeOpportunitiesGoal - metrics.activeOpportunities)} more opportunity{activeOpportunitiesGoal - metrics.activeOpportunities !== 1 ? 'ies' : 'y'} today
            </Typography>
          )}
        </Box>
        <Box 
          sx={(theme) => ({
            ...styles.metricCard()(theme),
            cursor: 'pointer',
          })}
          onClick={onInterviewsClick}
        >
          <Typography sx={styles.metricLabel()}>
            {config.copy.metrics.interviewsInProgress.label}
          </Typography>
          <Typography sx={styles.metricValue()}>
            {metrics.interviewsInProgress}
          </Typography>
        </Box>
        <Box sx={styles.metricCard()}>
          <Typography sx={styles.metricLabel()}>
            {config.copy.metrics.overdueFollowUps.label}
          </Typography>
          <Typography sx={styles.metricValue()}>
            {metrics.overdueFollowUps}
          </Typography>
        </Box>
      </Box>

      {/* Content Grid */}
      <Box sx={styles.contentGrid()}>
        {/* Prioritized Actions */}
        <Box sx={styles.sectionCard()}>
          <Box sx={styles.sectionHeader()}>
            <Typography sx={styles.sectionTitle()}>
              {config.copy.sections.prioritizedActions.title}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              startIcon={<AddIcon />}
              onClick={onCreateTaskClick}
              sx={{ textTransform: 'none' }}
            >
              Create Task
            </Button>
          </Box>
          <Box sx={styles.sectionContent()}>
            {prioritizedActions.length === 0 ? (
              <Typography sx={styles.emptyState()}>
                {config.copy.sections.prioritizedActions.empty}
              </Typography>
            ) : (
              prioritizedActions.map((action) => {
                const isCompleted = action.completed ?? false;
                return (
                  <Box
                    key={action.id}
                    sx={(theme) => ({
                      ...styles.actionItem()(theme),
                      opacity: isCompleted ? 0.6 : 1,
                    })}
                    onClick={(e) => {
                      // Don't trigger action click if clicking checkbox or remove button
                      if (
                        (e.target as HTMLElement).closest('.action-checkbox') ||
                        (e.target as HTMLElement).closest('.remove-action-button')
                      ) {
                        return;
                      }
                      onActionClick(action.id, action.conversationId);
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 0.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, flex: 1 }}>
                        <Checkbox
                          className="action-checkbox"
                          checked={isCompleted}
                          onChange={(e) => {
                            e.stopPropagation();
                            onActionToggle(action);
                          }}
                          disabled={isCompletingTask}
                          size="small"
                          sx={{ padding: 0, marginTop: -0.5 }}
                        />
                        <Typography
                          sx={(theme) => ({
                            ...styles.actionTitle()(theme),
                            textDecoration: isCompleted ? 'line-through' : 'none',
                            color: isCompleted ? theme.palette.text.secondary : theme.palette.text.primary,
                          })}
                        >
                          {action.title}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {action.priority && !isCompleted && (
                          <Chip
                            label={action.priority}
                            size="small"
                            sx={styles.priorityBadge(action.priority)}
                          />
                        )}
                        {isCompleted && (
                          <IconButton
                            className="remove-action-button"
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              onRemoveAction(action);
                            }}
                            sx={{
                              padding: 0.5,
                              color: 'text.secondary',
                              '&:hover': {
                                color: 'error.main',
                                backgroundColor: 'error.light',
                              },
                            }}
                          >
                            <CloseIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        )}
                      </Box>
                    </Box>
                    {action.type === 'seek_opportunities' ? (
                      <>
                        {action.description && (
                          <Typography sx={styles.actionMeta()}>
                            {action.description}
                          </Typography>
                        )}
                        <Typography sx={styles.actionMeta()}>
                          <AccessTimeIcon sx={{ fontSize: 14 }} />
                          Due today
                        </Typography>
                      </>
                    ) : (
                      <>
                        {action.contactName && (
                          <Typography sx={styles.actionMeta()}>
                            {action.contactName}
                            {action.contactCompany && ` • ${action.contactCompany}`}
                            {action.category && ` • ${action.category}`}
                          </Typography>
                        )}
                        <Typography sx={styles.actionMeta()}>
                          <AccessTimeIcon sx={{ fontSize: 14 }} />
                          Due {formatDate(action.dueAt)}
                        </Typography>
                      </>
                    )}
                  </Box>
                );
              })
            )}
          </Box>
        </Box>

        {/* Overdue Items */}
        {overdueItems.length > 0 && (
          <Box sx={styles.sectionCard()}>
            <Box sx={styles.sectionHeader()}>
              <Typography sx={styles.sectionTitle()}>
                {config.copy.sections.overdueItems.title}
              </Typography>
            </Box>
            <Box sx={styles.sectionContent()}>
              {overdueItems.map((item) => (
                <Box
                  key={item.id}
                  sx={styles.overdueItem()}
                  onClick={() => onOverdueClick(item.id, item.conversationId)}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography sx={styles.actionTitle()}>
                        {item.contactName}
                        {item.contactCompany && ` • ${item.contactCompany}`}
                      </Typography>
                      <Typography sx={styles.actionMeta()}>
                        {item.actionType}
                      </Typography>
                      {item.messagePreview && (
                        <Typography 
                          sx={styles.messagePreview()}
                          title={item.messagePreview}
                        >
                          {item.messagePreview}
                        </Typography>
                      )}
                    </Box>
                    <Chip
                      label={`${item.daysOverdue}d overdue`}
                      size="small"
                      sx={styles.overdueBadge()}
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
      </Box>

      {/* Edit Goal Modal */}
      <EditGoalModal
        isOpen={editGoalModal.isOpen}
        goal={editGoalModal.goal}
        error={editGoalModal.error}
        isSaving={editGoalModal.isSaving}
        onClose={editGoalModal.onClose}
        onChangeGoal={editGoalModal.onChangeGoal}
        onSave={editGoalModal.onSave}
      />

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={createTaskModal.isOpen}
        error={createTaskModal.error}
        isCreating={createTaskModal.isCreating}
        onClose={createTaskModal.onClose}
        onCreate={createTaskModal.onCreate}
      />
    </Box>
  );
}
