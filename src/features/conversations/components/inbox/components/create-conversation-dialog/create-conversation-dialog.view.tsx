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
  Chip,
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
  onContactsSelect,
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
  availableChallenges,
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
          multiple
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
            // Filter out string values (freeSolo typed values) and new contact options
            const validContacts = newValue
              .filter((v): v is typeof allContactOptions[0] => 
                typeof v !== 'string' && !('isNewContact' in v && v.isNewContact)
              )
              .map(v => ({ id: v.id, name: v.name, company: v.company }));

            // Handle new contact creation if there's a string value
            const stringValue = newValue.find(v => typeof v === 'string');
            if (stringValue && stringValue.trim()) {
              // For new contact, use the single contact handler (backwards compat)
              onContactSelect(null, stringValue);
            } else {
              // Update selected contacts
              onContactsSelect(validContacts);
            }
          }}
          value={
            values.contactIds && values.contactIds.length > 0
              ? contactOptions.filter((c) => values.contactIds?.includes(c.id))
              : values.contactId
                ? contactOptions.filter((c) => c.id === values.contactId)
                : []
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
              label={config.copy.contactLabel + ' (select multiple)'}
              placeholder={config.copy.contactPlaceholder}
              required
              size="small"
              error={!!errors.contactName}
              helperText={errors.contactName || 'Select one or more contacts for this conversation'}
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
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <Chip
                  key={key}
                  {...tagProps}
                  label={
                    <Box>
                      <Typography variant="caption" component="span">
                        {typeof option === 'string' ? option : option.name}
                      </Typography>
                    </Box>
                  }
                  size="small"
                />
              );
            })
          }
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
          label="Challenge"
          fullWidth
          size="small"
          value={values.challengeId || ''}
          onChange={(e) => onChangeField('challengeId', e.target.value || undefined)}
          helperText="Assign the opportunity that owns this conversation to a challenge"
        >
          <MenuItem value="">None</MenuItem>
          {availableChallenges.map((challenge) => (
            <MenuItem key={challenge.id} value={challenge.id}>
              {challenge.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label={config.copy.firstMessageSenderLabel}
          fullWidth
          size="small"
          value={values.firstMessageSender}
          onChange={(e) => {
            onChangeField('firstMessageSender', e.target.value as typeof values.firstMessageSender);
            // Clear firstMessageContactId when switching to "user"
            if (e.target.value === 'user') {
              onChangeField('firstMessageContactId', undefined);
            }
          }}
          helperText="Who sent the first message in this conversation?"
        >
          <MenuItem value="contact">Contact</MenuItem>
          <MenuItem value="user">You</MenuItem>
        </TextField>
        {values.firstMessageSender === 'contact' && 
         values.contactIds && 
         values.contactIds.length > 1 && (
          <TextField
            select
            label="Which contact sent the first message?"
            fullWidth
            size="small"
            value={values.firstMessageContactId || values.contactIds[0] || ''}
            onChange={(e) => onChangeField('firstMessageContactId', e.target.value || undefined)}
            helperText="Select which contact sent the first message"
            required
          >
            {values.contactIds.map((contactId) => {
              // Find the contact name from the selected contacts
              // First try to find in contactOptions (for existing contacts)
              let contact = contactOptions.find((c) => c.id === contactId);
              // If not found, try to find in allContactOptions (might be a new contact option)
              if (!contact) {
                const option = allContactOptions.find((c) => typeof c !== 'string' && !('isNewContact' in c && c.isNewContact) && c.id === contactId);
                if (option && typeof option !== 'string') {
                  contact = option;
                }
              }
              // Fallback: if still not found and it's the first contact (contactId), use contactName
              const displayName = contact?.name || (contactId === values.contactId ? values.contactName : contactId);
              const displayCompany = contact?.company || (contactId === values.contactId ? values.contactCompany : undefined);
              return (
                <MenuItem key={contactId} value={contactId}>
                  {displayName}
                  {displayCompany ? ` (${displayCompany})` : ''}
                </MenuItem>
              );
            })}
          </TextField>
        )}
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

