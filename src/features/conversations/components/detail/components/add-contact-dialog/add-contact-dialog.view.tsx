'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Autocomplete,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import type { AddContactDialogProps } from './add-contact-dialog.types';
import { styles } from './add-contact-dialog.styles';

export function AddContactDialog({
  isOpen,
  onClose,
  onConfirm,
  contacts,
  existingContactIds,
  isLoading,
  config,
  searchInput: externalSearchInput,
  onSearchInputChange,
}: AddContactDialogProps) {
  const [selectedContact, setSelectedContact] = useState<{ id: string; name: string; company?: string | null } | null>(null);
  const [internalSearchInput, setInternalSearchInput] = useState('');

  // Use external search input if provided, otherwise use internal state
  const currentSearchInput = externalSearchInput ?? internalSearchInput;

  // Reset when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      setSelectedContact(null);
      if (!onSearchInputChange) {
        setInternalSearchInput('');
      }
    }
  }, [isOpen, onSearchInputChange]);

  // Filter out contacts that are already in the conversation
  const availableContacts = contacts.filter(
    (contact) => !existingContactIds.includes(contact.id)
  );

  const handleSearchInputChange = (value: string) => {
    if (onSearchInputChange) {
      onSearchInputChange(value);
    } else {
      setInternalSearchInput(value);
    }
  };

  const handleConfirm = () => {
    if (selectedContact) {
      onConfirm(selectedContact.id);
      setSelectedContact(null);
      if (!onSearchInputChange) {
        setInternalSearchInput('');
      }
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{config.copy.addContactDialog.title}</DialogTitle>
      <DialogContent>
        <Autocomplete
          options={availableContacts}
          getOptionLabel={(option) => {
            if (typeof option === 'string') return option;
            return option.name;
          }}
          inputValue={currentSearchInput}
          onInputChange={(_, newValue) => handleSearchInputChange(newValue)}
          onChange={(_, newValue) => {
            if (newValue && typeof newValue !== 'string') {
              setSelectedContact(newValue);
            } else {
              setSelectedContact(null);
            }
          }}
          value={selectedContact}
          loading={isLoading}
          filterOptions={(options, state) => {
            if (!state.inputValue) {
              return options;
            }
            return options.filter((option) => {
              const name = option.name?.toLowerCase() || '';
              const company = option.company?.toLowerCase() || '';
              const searchValue = state.inputValue.toLowerCase();
              return name.includes(searchValue) || company.includes(searchValue);
            });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={config.copy.addContactDialog.contactLabel}
              placeholder={config.copy.addContactDialog.contactPlaceholder}
              required
              size="small"
              sx={{ mt: 2 }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option) => (
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
          )}
          noOptionsText={availableContacts.length === 0 ? 'All contacts are already in this conversation' : 'No contacts found'}
        />
        {availableContacts.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            {config.copy.addContactDialog.allContactsAdded}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{config.copy.addContactDialog.cancel}</Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={!selectedContact || isLoading}
        >
          {config.copy.addContactDialog.add}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

