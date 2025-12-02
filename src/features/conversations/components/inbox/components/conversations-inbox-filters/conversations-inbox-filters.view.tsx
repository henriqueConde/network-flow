'use client';

import { Box, TextField, MenuItem, ToggleButtonGroup, ToggleButton } from '@mui/material';
import type { ConversationsInboxFiltersProps } from './conversations-inbox-filters.types';
import { styles } from './conversations-inbox-filters.styles';

export function ConversationsInboxFilters({
  search,
  status,
  categoryId,
  stageId,
  availableCategories,
  availableStages,
  config,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onStageChange,
}: ConversationsInboxFiltersProps) {
  return (
    <Box sx={styles.filtersRow()}>
      <TextField
        size="small"
        placeholder={config.copy.searchPlaceholder}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
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
      <ToggleButtonGroup
        size="small"
        value={status}
        exclusive
        onChange={(_, value) => {
          if (value) {
            onStatusChange(value);
          }
        }}
      >
        <ToggleButton value="all">
          {config.copy.statusFilter.all}
        </ToggleButton>
        <ToggleButton value="needs_attention">
          {config.copy.statusFilter.needs_attention}
        </ToggleButton>
        <ToggleButton value="waiting_on_them">
          {config.copy.statusFilter.waiting_on_them}
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

