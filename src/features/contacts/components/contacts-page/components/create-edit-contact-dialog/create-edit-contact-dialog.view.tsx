'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Autocomplete,
  Chip,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  Box,
} from '@mui/material';
import { useCompaniesList } from '@/features/companies/services/companies.queries';
import { STRATEGIES } from '@/features/strategies/components/strategies-page/strategies-page.config';
import type { CreateEditContactDialogProps } from './create-edit-contact-dialog.types';

export function CreateEditContactDialog({
  isOpen,
  isEditing,
  values,
  errors,
  isSubmitting,
  availableCategories,
  availableStages,
  config,
  onClose,
  onChangeField,
  onSubmit,
}: CreateEditContactDialogProps) {
  // Fetch companies for dropdown
  const { data: companiesData } = useCompaniesList({
    page: 1,
    pageSize: 100,
    sortBy: 'name',
    sortDir: 'asc',
    enabled: isOpen, // Only fetch when dialog is open
  });

  const companies = companiesData?.companies || [];
  const strategies = STRATEGIES;

  // Format date for input[type="datetime-local"]
  const formatDateForInput = (dateStr: string | null | undefined): string => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return '';
      // Format as YYYY-MM-DDTHH:mm for datetime-local input
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch {
      return '';
    }
  };

  // Convert datetime-local input value to ISO string
  const handleDateChange = (field: string, value: string) => {
    if (!value) {
      onChangeField(field as any, '');
      return;
    }
    try {
      const date = new Date(value);
      onChangeField(field as any, date.toISOString());
    } catch {
      onChangeField(field as any, '');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{isEditing ? config.copy.dialog.editTitle : config.copy.dialog.createTitle}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2, maxHeight: '70vh', overflowY: 'auto' }}>
        {/* Basic Information */}
        <Typography variant="subtitle2" fontWeight={600}>Basic Information</Typography>
        <TextField
          label="Name"
          fullWidth
          required
          size="small"
          value={values.name}
          onChange={(e) => onChangeField('name', e.target.value)}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Role / Headline"
          fullWidth
          size="small"
          value={values.headlineOrRole || ''}
          onChange={(e) => onChangeField('headlineOrRole', e.target.value)}
          error={!!errors.headlineOrRole}
          helperText={errors.headlineOrRole}
        />
        <TextField
          label="Company (text)"
          fullWidth
          size="small"
          value={values.company || ''}
          onChange={(e) => onChangeField('company', e.target.value)}
          error={!!errors.company}
          helperText={errors.company}
          placeholder="Or select from database below"
        />
        <Autocomplete
          options={companies}
          getOptionLabel={(option) => option.name}
          value={companies.find((c) => c.id === values.companyId) || null}
          onChange={(_, newValue) => {
            onChangeField('companyId', newValue?.id || null);
            if (newValue) {
              onChangeField('company', newValue.name);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Company (from database)"
              size="small"
              placeholder="Search companies..."
            />
          )}
        />
        <TextField
          label="Email"
          fullWidth
          type="email"
          size="small"
          value={values.email || ''}
          onChange={(e) => onChangeField('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          select
          label="Primary Platform"
          fullWidth
          size="small"
          value={values.primaryPlatform || ''}
          onChange={(e) => onChangeField('primaryPlatform', e.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="linkedin">LinkedIn</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="twitter">Twitter</MenuItem>
        </TextField>
        <TextField
          label="Contact Type"
          fullWidth
          size="small"
          value={values.contactType || ''}
          onChange={(e) => onChangeField('contactType', e.target.value)}
          placeholder="e.g., Developer, Manager, Recruiter"
        />

        <Divider sx={{ my: 1 }} />

        {/* Strategy Tracking */}
        <Typography variant="subtitle2" fontWeight={600}>Strategy Tracking</Typography>
        <Autocomplete
          multiple
          options={strategies}
          getOptionLabel={(option) => option.title}
          value={strategies.filter((s) => values.strategyIds?.includes(s.id)) || []}
          onChange={(_, newValue) => {
            onChangeField('strategyIds', newValue.map((s) => s.id));
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Strategies"
              size="small"
              placeholder="Select strategies..."
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option.id}
                label={option.title}
                size="small"
              />
            ))
          }
        />
        <TextField
          select
          label="Warm/Cold"
          fullWidth
          size="small"
          value={values.warmOrCold || ''}
          onChange={(e) => onChangeField('warmOrCold', (e.target.value as 'warm' | 'cold') || null)}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="warm">Warm</MenuItem>
          <MenuItem value="cold">Cold</MenuItem>
        </TextField>
        <TextField
          label="Common Ground"
          fullWidth
          multiline
          rows={3}
          size="small"
          value={values.commonGround || ''}
          onChange={(e) => onChangeField('commonGround', e.target.value)}
          placeholder="Shared interests, connections, or common ground..."
        />

        <Divider sx={{ my: 1 }} />

        {/* Connection Lifecycle */}
        <Typography variant="subtitle2" fontWeight={600}>Connection Lifecycle</Typography>
        <TextField
          select
          label="Connection Status"
          fullWidth
          size="small"
          value={values.connectionStatus || ''}
          onChange={(e) => onChangeField('connectionStatus', (e.target.value as 'not_connected' | 'request_sent' | 'connected') || null)}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="not_connected">Not Connected</MenuItem>
          <MenuItem value="request_sent">Request Sent</MenuItem>
          <MenuItem value="connected">Connected</MenuItem>
        </TextField>
        <TextField
          label="Connection Request Sent At"
          fullWidth
          type="datetime-local"
          size="small"
          value={formatDateForInput(values.connectionRequestSentAt)}
          onChange={(e) => handleDateChange('connectionRequestSentAt', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Connection Accepted At"
          fullWidth
          type="datetime-local"
          size="small"
          value={formatDateForInput(values.connectionAcceptedAt)}
          onChange={(e) => handleDateChange('connectionAcceptedAt', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="DM Sent At"
          fullWidth
          type="datetime-local"
          size="small"
          value={formatDateForInput(values.dmSentAt)}
          onChange={(e) => handleDateChange('dmSentAt', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="First Message Date"
          fullWidth
          type="datetime-local"
          size="small"
          value={formatDateForInput(values.firstMessageDate)}
          onChange={(e) => handleDateChange('firstMessageDate', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Last Follow-Up At"
          fullWidth
          type="datetime-local"
          size="small"
          value={formatDateForInput(values.lastFollowUpAt)}
          onChange={(e) => handleDateChange('lastFollowUpAt', e.target.value)}
          InputLabelProps={{ shrink: true }}
        />

        <Divider sx={{ my: 1 }} />

        {/* Referral Tracking */}
        <Typography variant="subtitle2" fontWeight={600}>Referral Tracking</Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={values.referralGiven || false}
              onChange={(e) => onChangeField('referralGiven', e.target.checked)}
            />
          }
          label="Referral Given"
        />
        <TextField
          label="Referral Given At"
          fullWidth
          type="datetime-local"
          size="small"
          value={formatDateForInput(values.referralGivenAt)}
          onChange={(e) => handleDateChange('referralGivenAt', e.target.value)}
          InputLabelProps={{ shrink: true }}
          disabled={!values.referralGiven}
        />
        <TextField
          label="Referral Details"
          fullWidth
          multiline
          rows={3}
          size="small"
          value={values.referralDetails || ''}
          onChange={(e) => onChangeField('referralDetails', e.target.value)}
          placeholder="Details about the referral..."
          disabled={!values.referralGiven}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isSubmitting}>
          {config.copy.dialog.cancel}
        </Button>
        <Button variant="contained" onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting
            ? 'Saving…'
            : isEditing
              ? config.copy.dialog.save
              : config.copy.dialog.create}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

