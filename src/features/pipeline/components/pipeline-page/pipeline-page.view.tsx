'use client';

import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Menu,
  MenuItem,
  ListItemText,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDndMonitor,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableOpportunityCard } from './sortable-opportunity-card';
import type { PipelinePageViewProps, PipelineOpportunity } from './pipeline-page.types';
import { styles } from './pipeline-page.styles';

function DroppableColumn({
  stageId,
  children,
  isOver,
}: {
  stageId: string;
  children: React.ReactNode;
  isOver: boolean;
}) {
  const { setNodeRef, isOver: isDroppableOver } = useDroppable({
    id: stageId,
  });

  const showDragOver = isOver || isDroppableOver;

  return (
    <Box ref={setNodeRef}>
      <Box sx={showDragOver ? styles.columnDragOver() : styles.column()}>
        {children}
      </Box>
    </Box>
  );
}

export function PipelinePageView({
  board,
  isLoading,
  error,
  config,
  onOpportunityClick,
  onMoveOpportunity,
  availableStages,
  availableCategories,
  categoryId,
  stageId,
  onCategoryChange,
  onStageChange,
}: PipelinePageViewProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<{ element: HTMLElement; opportunityId: string } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px of movement before starting drag
      },
    }),
    useSensor(KeyboardSensor),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    if (event.over) {
      setOverId(event.over.id as string);
    } else {
      setOverId(null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setOverId(null);

    if (!over || !board) return;

    const opportunityId = active.id as string;
    const targetStageId = over.id as string;

    // Find current stage
    const currentStage = board.stages.find((stage) =>
      stage.opportunities.some((opp) => opp.id === opportunityId),
    );

    // Don't do anything if dropped in the same stage
    if (currentStage?.id === targetStageId) return;

    // Move the opportunity
    const finalStageId = targetStageId === '__unassigned__' ? null : targetStageId;
    onMoveOpportunity(opportunityId, finalStageId || '__unassigned__');
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, opportunityId: string) => {
    event.stopPropagation();
    setAnchorEl({ element: event.currentTarget, opportunityId });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMove = (stageId: string) => {
    if (anchorEl) {
      const finalStageId = stageId === '__unassigned__' ? null : stageId;
      onMoveOpportunity(anchorEl.opportunityId, finalStageId || '__unassigned__');
      handleMenuClose();
    }
  };

  // Get active opportunity for drag overlay
  const activeOpportunity = board?.stages
    .flatMap((stage) => stage.opportunities)
    .find((opp) => opp.id === activeId);

  if (isLoading) {
    return (
      <Box sx={styles.loadingState()}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.errorState()}>
        <Alert severity="error">Failed to load pipeline: {error.message}</Alert>
      </Box>
    );
  }

  // Check if we have any data at all
  const hasAnyOpportunities = board?.stages.some((stage) => stage.opportunities.length > 0) ?? false;
  const hasStages = (board?.stages.length ?? 0) > 0;

  if (!board || (!hasStages && !hasAnyOpportunities)) {
    return (
      <Box sx={styles.root()}>
        <Box sx={styles.header()}>
          <Typography variant="h4" sx={styles.title()}>
            {config.copy.title}
          </Typography>
          <Typography variant="body1" sx={styles.subtitle()}>
            {config.copy.subtitle}
          </Typography>
        </Box>
        <Box sx={styles.emptyState()}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {config.copy.empty.noData}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {config.copy.empty.noStages}
          </Typography>
        </Box>
      </Box>
    );
  }

  // Get all opportunity IDs for sortable context
  const allOpportunityIds = board.stages.flatMap((stage) =>
    stage.opportunities.map((opp) => opp.id),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={() => {
        setActiveId(null);
        setOverId(null);
      }}
    >
      <Box sx={styles.root()}>
        <Box sx={styles.header()}>
          <Typography variant="h4" sx={styles.title()}>
            {config.copy.title}
          </Typography>
          <Typography variant="body1" sx={styles.subtitle()}>
            {config.copy.subtitle}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <TextField
              select
              size="small"
              label={config.copy.categoryFilter.label}
              value={categoryId || ''}
              onChange={(e) => onCategoryChange(e.target.value || null)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">{config.copy.categoryFilter.all}</MenuItem>
              {availableCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              size="small"
              label={config.copy.stageFilter.label}
              value={stageId || ''}
              onChange={(e) => onStageChange(e.target.value || null)}
              sx={{ minWidth: 150 }}
            >
              <MenuItem value="">{config.copy.stageFilter.all}</MenuItem>
              {availableStages.map((stage) => (
                <MenuItem key={stage.id} value={stage.id}>
                  {stage.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>

        <SortableContext items={allOpportunityIds} strategy={verticalListSortingStrategy}>
          <Box sx={styles.board()}>
            {board.stages.map((stage) => (
              <DroppableColumn
                key={stage.id}
                stageId={stage.id}
                isOver={overId === stage.id && !!activeId}
              >
                  <Box sx={styles.columnHeader()}>
                    <Typography variant="h6" sx={styles.columnTitle()}>
                      {stage.name}
                      <Typography component="span" sx={styles.columnCount()}>
                        ({stage.opportunities.length})
                      </Typography>
                    </Typography>
                  </Box>

                  {stage.opportunities.length === 0 ? (
                    <Box sx={styles.emptyState()}>
                      <Typography variant="body2">{config.copy.empty.noOpportunities}</Typography>
                    </Box>
                  ) : (
                    <SortableContext items={stage.opportunities.map((opp) => opp.id)}>
                      {stage.opportunities.map((opportunity) => (
                        <SortableOpportunityCard
                          key={opportunity.id}
                          opportunity={opportunity}
                          config={config}
                          onOpportunityClick={onOpportunityClick}
                          onMenuOpen={handleMenuOpen}
                        />
                      ))}
                    </SortableContext>
                  )}
              </DroppableColumn>
            ))}
          </Box>
        </SortableContext>

        <DragOverlay>
          {activeOpportunity ? (
            <Box sx={{ ...styles.opportunityCard(), opacity: 0.8, transform: 'rotate(5deg)' }}>
              <Typography variant="subtitle2">{activeOpportunity.contactName}</Typography>
            </Box>
          ) : null}
        </DragOverlay>

        <Menu
          anchorEl={anchorEl?.element}
          open={!!anchorEl}
          onClose={handleMenuClose}
          onClick={(e) => e.stopPropagation()}
        >
          <MenuItem disabled>
            <ListItemText primary={config.copy.opportunity.moveTo} />
          </MenuItem>
          {(() => {
            // Find the current stage of this opportunity
            const currentStage = board.stages.find((s) =>
              s.opportunities.some((o) => o.id === anchorEl?.opportunityId),
            );

            // Filter out the current stage
            const otherStages = availableStages.filter((stage) => stage.id !== currentStage?.id);

            // If current stage is not unassigned, add an "Unassigned" option
            const showUnassigned = currentStage?.id !== '__unassigned__';

            const menuItems = [];
            
            if (showUnassigned) {
              menuItems.push(
                <MenuItem key="__unassigned__" onClick={() => handleMove('__unassigned__')}>
                  <ListItemText primary="Unassigned" />
                </MenuItem>
              );
            }
            
            otherStages.forEach((stage) => {
              menuItems.push(
                <MenuItem key={stage.id} onClick={() => handleMove(stage.id)}>
                  <ListItemText primary={stage.name} />
                </MenuItem>
              );
            });

            return menuItems;
          })()}
        </Menu>
      </Box>
    </DndContext>
  );
}
