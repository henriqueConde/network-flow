'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Autocomplete,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';
import type { CreateConversationDialogProps } from './create-conversation-dialog.types';
import { styles } from './create-conversation-dialog.styles';

export function CreateConversationDialog({
  isOpen,
  onClose,
  values,
  errors,
  onChangeField,
  onSubmit,
  isCreating,
  config,
  contactSearchInput,
  onContactSearchChange,
  onContactSelect,
  contactOptions,
  allContactOptions,
  contactSearchInputTrimmed,
  onContactScroll,
  isSearchingContacts,
  opportunitySearchInput,
  onOpportunitySearchChange,
  onOpportunitySelect,
  opportunities,
  isSearchingOpportunities,
}: CreateConversationDialogProps) {

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{config.copy.title}</DialogTitle>
      <DialogContent sx={styles.createDialogContent()}>
        <Autocomplete
          freeSolo
          options={allContactOptions}
          getOptionLabel={(option) => {
            if (typeof option === 'string') return option;
            return option.name;
          }}
          inputValue={contactSearchInput}
          onInputChange={(_, newInputValue) => {
            onContactSearchChange(newInputValue);
          }}
          onChange={(_, newValue) => {
            if (!newValue || typeof newValue === 'string') {
              // User typed a string directly (freeSolo)
              onContactSelect(null, newValue || '');
            } else if ('isNewContact' in newValue && newValue.isNewContact) {
              // User selected "New contact" option
              onContactSelect(null, contactSearchInputTrimmed);
            } else {
              // User selected an existing contact
              onContactSelect(newValue.id, newValue.name, newValue.company);
            }
          }}
          value={
            values.contactId
              ? contactOptions.find((c) => c.id === values.contactId) || null
              : null
          }
          loading={isSearchingContacts}
          ListboxProps={{
            onScroll: onContactScroll,
            style: styles.listbox,
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={config.copy.contactLabel}
              placeholder={config.copy.contactPlaceholder}
              required
              size="small"
              error={!!errors.contactName}
              helperText={errors.contactName}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isSearchingContacts ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option) => {
            if (typeof option === 'string') {
              return (
                <Box component="li" {...props}>
                  {option}
                </Box>
              );
            }
            if ('isNewContact' in option && option.isNewContact) {
              return (
                <Box component="li" {...props}>
                  <Typography>{option.name}</Typography>
                </Box>
              );
            }
            return (
              <Box component="li" {...props}>
                <Box>
                  <Typography variant="body2">{option.name}</Typography>
                  {option.company && (
                    <Typography variant="caption" color="text.secondary">
                      {option.company}
                    </Typography>
                  )}
                </Box>
              </Box>
            );
          }}
        />
        <Autocomplete
          options={opportunities || []}
          getOptionLabel={(option) => {
            if (typeof option === 'string') return option;
            return option.title || `${option.contactName}${option.contactCompany ? ` - ${option.contactCompany}` : ''}`;
          }}
          inputValue={opportunitySearchInput}
          onInputChange={(_, newInputValue) => {
            onOpportunitySearchChange(newInputValue);
          }}
          onChange={(_, newValue) => {
            if (!newValue || typeof newValue === 'string') {
              onOpportunitySelect(null);
            } else {
              onOpportunitySelect(newValue.id);
            }
          }}
          value={
            values.opportunityId
              ? opportunities.find((o) => o.id === values.opportunityId) || null
              : null
          }
          loading={isSearchingOpportunities}
          renderInput={(params) => (
            <TextField
              {...params}
              label={config.copy.opportunityLabel}
              placeholder={config.copy.opportunityPlaceholder}
              size="small"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isSearchingOpportunities ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option) => {
            if (typeof option === 'string') {
              return (
                <Box component="li" {...props}>
                  {option}
                </Box>
              );
            }
            return (
              <Box component="li" {...props}>
                <Box>
                  <Typography variant="body2">
                    {option.title || option.contactName}
                  </Typography>
                  {option.contactCompany && (
                    <Typography variant="caption" color="text.secondary">
                      {option.contactCompany}
                    </Typography>
                  )}
                </Box>
              </Box>
            );
          }}
        />
        <TextField
          label={config.copy.companyLabel}
          fullWidth
          size="small"
          value={values.contactCompany}
          onChange={(e) => onChangeField('contactCompany', e.target.value)}
          error={!!errors.contactCompany}
          helperText={errors.contactCompany}
        />
        <TextField
          select
          label={config.copy.channelLabel}
          fullWidth
          size="small"
          value={values.channel}
          onChange={(e) =>
            onChangeField('channel', e.target.value as typeof values.channel)
          }
        >
          <MenuItem value="linkedin">LinkedIn</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="twitter">Twitter</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
        <TextField
          select
          label={config.copy.firstMessageSenderLabel}
          fullWidth
          size="small"
          value={values.firstMessageSender}
          onChange={(e) =>
            onChangeField('firstMessageSender', e.target.value as typeof values.firstMessageSender)
          }
        >
          <MenuItem value="contact">Contact</MenuItem>
          <MenuItem value="user">You</MenuItem>
        </TextField>
        <TextField
          label={config.copy.pastedTextLabel}
          fullWidth
          required
          size="small"
          multiline
          minRows={4}
          value={values.pastedText}
          onChange={(e) => onChangeField('pastedText', e.target.value)}
          error={!!errors.pastedText}
          helperText={errors.pastedText}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{config.copy.cancelButton}</Button>
        <Button disabled={isCreating} variant="contained" onClick={onSubmit}>
          {isCreating ? config.copy.creatingButton : config.copy.createButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

