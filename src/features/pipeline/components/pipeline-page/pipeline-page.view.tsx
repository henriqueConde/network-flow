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
  IconButton,
  InputAdornment,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ClearIcon from '@mui/icons-material/Clear';
import { useState, useRef, useEffect } from 'react';
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
    <Box ref={setNodeRef} sx={showDragOver ? styles.columnDragOver() : styles.column()}>
      {children}
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
  search,
  onCategoryChange,
  onStageChange,
  onSearchChange,
  getMoveMenuItems,
  getCurrentStageForOpportunity,
  getActiveOpportunity,
}: PipelinePageViewProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<{ element: HTMLElement; opportunityId: string } | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

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

    // Find current stage (logic moved to container)
    const currentStage = getCurrentStageForOpportunity(opportunityId);

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

  // Get active opportunity for drag overlay (logic moved to container)
  const activeOpportunity = board ? getActiveOpportunity(activeId) : null;

  // Check scroll position for arrow buttons
  const checkScrollButtons = () => {
    if (!boardRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = boardRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  // Scroll handlers
  const scrollLeft = () => {
    if (boardRef.current) {
      boardRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (boardRef.current) {
      boardRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  // Check scroll buttons on mount and when board changes
  useEffect(() => {
    checkScrollButtons();
    const boardElement = boardRef.current;
    if (boardElement) {
      boardElement.addEventListener('scroll', checkScrollButtons);
      return () => boardElement.removeEventListener('scroll', checkScrollButtons);
    }
  }, [board]);

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

  // Filter stages when stageId filter is applied - show only the selected stage column
  const filteredStages = stageId
    ? board.stages.filter((stage) => stage.id === stageId)
    : board.stages;

  // Get all opportunity IDs for sortable context
  const allOpportunityIds = filteredStages.flatMap((stage) =>
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
          <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
            <TextField
              placeholder={config.copy.search.placeholder}
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              size="small"
              sx={{ minWidth: 300, flex: 1 }}
              InputProps={{
                endAdornment: search ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => onSearchChange('')}
                      edge="end"
                      aria-label="Clear search"
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
            />
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
          <Box sx={styles.boardContainer()}>
            {canScrollLeft && (
              <IconButton
                sx={styles.scrollButton('left')}
                onClick={scrollLeft}
                aria-label="Scroll left"
              >
                <ChevronLeftIcon />
              </IconButton>
            )}
            <Box ref={boardRef} sx={styles.board()}>
              {filteredStages.map((stage) => (
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

                <Box sx={styles.columnContent()}>
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
                </Box>
              </DroppableColumn>
            ))}
            </Box>
            {canScrollRight && (
              <IconButton
                sx={styles.scrollButton('right')}
                onClick={scrollRight}
                aria-label="Scroll right"
              >
                <ChevronRightIcon />
              </IconButton>
            )}
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
          {anchorEl && getMoveMenuItems(anchorEl.opportunityId).map((item) => (
            <MenuItem key={item.id} onClick={() => handleMove(item.id)}>
              <ListItemText primary={item.label} />
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </DndContext>
  );
}
