'use client';

import { Box, TextField, MenuItem } from '@mui/material';
import type { ContactsFiltersProps } from './contacts-filters.types';
import { styles } from './contacts-filters.styles';

export function ContactsFilters({
  search,
  company,
  categoryId,
  stageId,
  primaryPlatform,
  warmOrCold,
  connectionStatus,
  contactType,
  availableCategories,
  availableStages,
  config,
  onSearchChange,
  onCompanyChange,
  onCategoryChange,
  onStageChange,
  onPlatformChange,
  onWarmOrColdChange,
  onConnectionStatusChange,
  onContactTypeChange,
}: ContactsFiltersProps) {
  return (
    <Box sx={styles.filtersRow()}>
      <TextField
        size="small"
        placeholder={config.copy.searchPlaceholder}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ minWidth: 200 }}
      />
      <TextField
        size="small"
        placeholder="Filter by company"
        value={company}
        onChange={(e) => onCompanyChange(e.target.value)}
        sx={{ minWidth: 180 }}
      />
      <TextField
        select
        size="small"
        label={config.copy.table.category}
        value={categoryId || ''}
        onChange={(e) => onCategoryChange(e.target.value || null)}
        sx={{ minWidth: 180 }}
      >
        <MenuItem value="">All categories</MenuItem>
        {availableCategories.map((cat) => (
          <MenuItem key={cat.id} value={cat.id}>
            {cat.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        size="small"
        label={config.copy.table.stage}
        value={stageId || ''}
        onChange={(e) => onStageChange(e.target.value || null)}
        sx={{ minWidth: 180 }}
      >
        <MenuItem value="">All stages</MenuItem>
        {availableStages.map((stage) => (
          <MenuItem key={stage.id} value={stage.id}>
            {stage.name}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        size="small"
        label={config.copy.table.platform}
        value={primaryPlatform || ''}
        onChange={(e) => onPlatformChange(e.target.value || null)}
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">All platforms</MenuItem>
        <MenuItem value="linkedin">LinkedIn</MenuItem>
        <MenuItem value="email">Email</MenuItem>
        <MenuItem value="twitter">Twitter</MenuItem>
      </TextField>
      <TextField
        select
        size="small"
        label="Warm/Cold"
        value={warmOrCold || ''}
        onChange={(e) => onWarmOrColdChange((e.target.value as 'warm' | 'cold') || null)}
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="warm">Warm</MenuItem>
        <MenuItem value="cold">Cold</MenuItem>
      </TextField>
      <TextField
        select
        size="small"
        label="Connection Status"
        value={connectionStatus || ''}
        onChange={(e) => onConnectionStatusChange((e.target.value as 'not_connected' | 'request_sent' | 'connected') || null)}
        sx={{ minWidth: 180 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="not_connected">Not Connected</MenuItem>
        <MenuItem value="request_sent">Request Sent</MenuItem>
        <MenuItem value="connected">Connected</MenuItem>
      </TextField>
      <TextField
        size="small"
        placeholder="Filter by contact type"
        value={contactType}
        onChange={(e) => onContactTypeChange(e.target.value)}
        sx={{ minWidth: 180 }}
      />
    </Box>
  );
}

