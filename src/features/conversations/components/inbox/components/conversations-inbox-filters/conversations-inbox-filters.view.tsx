'use client';

import { Box, TextField, MenuItem, ToggleButtonGroup, ToggleButton } from '@mui/material';
import type { ConversationsInboxFiltersProps } from './conversations-inbox-filters.types';
import { styles } from './conversations-inbox-filters.styles';

export function ConversationsInboxFilters({
  search,
  status,
  categoryId,
  stageId,
  emailStatus,
  availableCategories,
  availableStages,
  config,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onStageChange,
  onEmailStatusChange,
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
      <TextField
        select
        size="small"
        label="Email Status"
        value={emailStatus || ''}
        onChange={(e) => onEmailStatusChange((e.target.value as 'no_reply' | 'replied' | 'call_scheduled' | 'rejected' | 'in_process') || null)}
        sx={{ minWidth: 180 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="no_reply">No Reply</MenuItem>
        <MenuItem value="replied">Replied</MenuItem>
        <MenuItem value="call_scheduled">Call Scheduled</MenuItem>
        <MenuItem value="rejected">Rejected</MenuItem>
        <MenuItem value="in_process">In Process</MenuItem>
      </TextField>
    </Box>
  );
}

