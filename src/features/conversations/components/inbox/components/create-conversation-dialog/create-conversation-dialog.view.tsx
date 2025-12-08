'use client';

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
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
  availableCategories,
  availableStages,
}: CreateConversationDialogProps) {
  const [contactAutocompleteOpen, setContactAutocompleteOpen] = useState(false);
  const contactListboxRef = useRef<HTMLUListElement | null>(null);
  // Store distance from bottom so we can preserve relative scroll position
  const lastContactDistanceFromBottomRef = useRef(0);

  // Open autocomplete when dialog opens and when contacts become available
  useEffect(() => {
    if (isOpen) {
      if (allContactOptions.length > 0) {
        // Open when options are available
        const timer = setTimeout(() => {
          setContactAutocompleteOpen(true);
        }, 150);
        return () => clearTimeout(timer);
      } else if (!isSearchingContacts) {
        // If not loading and no options, keep closed
        setContactAutocompleteOpen(false);
      }
    } else {
      // Close when dialog closes
      setContactAutocompleteOpen(false);
      lastContactDistanceFromBottomRef.current = 0;
    }
  }, [isOpen, allContactOptions.length, isSearchingContacts]);

  // Preserve relative scroll position (distance from bottom) when options change.
  // useLayoutEffect to run before paint and avoid visible jump.
  useLayoutEffect(() => {
    if (contactAutocompleteOpen && contactListboxRef.current) {
      const listbox = contactListboxRef.current;
      const targetScrollTop = Math.max(
        0,
        listbox.scrollHeight - listbox.clientHeight - lastContactDistanceFromBottomRef.current,
      );
      listbox.scrollTop = targetScrollTop;
    }
  }, [allContactOptions.length, contactAutocompleteOpen]);

  const handleContactListboxScroll: React.UIEventHandler<HTMLUListElement> = (event) => {
    const listbox = event.currentTarget;
    const scrollTop = listbox.scrollTop;
    const scrollHeight = listbox.scrollHeight;
    const clientHeight = listbox.clientHeight;

    // How far we are from the bottom in pixels
    lastContactDistanceFromBottomRef.current = scrollHeight - scrollTop - clientHeight;

    onContactScroll(event);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{config.copy.title}</DialogTitle>
      <DialogContent sx={styles.createDialogContent()}>
        <Autocomplete
          freeSolo
          open={contactAutocompleteOpen}
          onOpen={() => setContactAutocompleteOpen(true)}
          onClose={() => setContactAutocompleteOpen(false)}
          openOnFocus
          options={allContactOptions}
          filterOptions={(options, state) => {
            // For freeSolo, we want to show all options when input is empty or show filtered results when typing
            if (!state.inputValue) {
              return options;
            }
            // Default filtering for when user is typing
            return options.filter((option) => {
              if (typeof option === 'string') return true;
              const name = option.name?.toLowerCase() || '';
              const company = option.company?.toLowerCase() || '';
              const searchValue = state.inputValue.toLowerCase();
              return name.includes(searchValue) || company.includes(searchValue);
            });
          }}
          getOptionLabel={(option) => {
            if (typeof option === 'string') return option;
            return option.name;
          }}
          inputValue={contactSearchInput}
          onInputChange={(_, newInputValue) => {
            onContactSearchChange(newInputValue);
            // Keep dropdown open when typing
            if (!contactAutocompleteOpen && allContactOptions.length > 0) {
              setContactAutocompleteOpen(true);
            }
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
            ref: contactListboxRef,
            onScroll: handleContactListboxScroll,
            style: styles.listbox,
          }}
          noOptionsText={isSearchingContacts ? 'Loading contacts...' : 'No contacts found'}
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
          label="Category"
          fullWidth
          size="small"
          value={values.categoryId || ''}
          onChange={(e) => onChangeField('categoryId', e.target.value || undefined)}
        >
          <MenuItem value="">None</MenuItem>
          {availableCategories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Stage"
          fullWidth
          size="small"
          value={values.stageId || ''}
          onChange={(e) => onChangeField('stageId', e.target.value || undefined)}
        >
          <MenuItem value="">None</MenuItem>
          {availableStages.map((stage) => (
            <MenuItem key={stage.id} value={stage.id}>
              {stage.name}
            </MenuItem>
          ))}
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
          helperText="Who sent the first message in this conversation?"
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

