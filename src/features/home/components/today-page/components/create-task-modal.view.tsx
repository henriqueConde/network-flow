'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Alert,
  MenuItem,
  Box,
} from '@mui/material';
import { useState, useEffect } from 'react';

interface CreateTaskModalProps {
  isOpen: boolean;
  error: string | null;
  isCreating: boolean;
  onClose: () => void;
  onCreate: (task: {
    title: string;
    description?: string;
    dueAt?: string;
    priority?: 'low' | 'medium' | 'high';
  }) => Promise<void>;
}

export function CreateTaskModal({
  isOpen,
  error,
  isCreating,
  onClose,
  onCreate,
}: CreateTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueAt, setDueAt] = useState(() => {
    // Default to today's date in YYYY-MM-DD format
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  });
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | ''>('');
  const [hasDueDate, setHasDueDate] = useState(true);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTitle('');
      setDescription('');
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      setDueAt(`${year}-${month}-${day}`);
      setPriority('');
      setHasDueDate(true);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }

    // Convert date to ISO string with time set to end of day in local timezone
    let dueAtISO: string | undefined;
    if (hasDueDate && dueAt) {
      // Parse the date string (YYYY-MM-DD) and create date in local timezone
      const [year, month, day] = dueAt.split('-').map(Number);
      // Create date at end of day (23:59:59) in local timezone
      const date = new Date(year, month - 1, day, 23, 59, 59, 999);
      dueAtISO = date.toISOString();
    }

    await onCreate({
      title: title.trim(),
      description: description.trim() || undefined,
      dueAt: dueAtISO,
      priority: priority || undefined,
    });
  };

  const handleClose = () => {
    if (!isCreating) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Add a task to your today&apos;s list. Tasks can be linked to conversations or opportunities when created from those pages.
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            error={!!error && !title.trim()}
            helperText={error && !title.trim() ? 'Title is required' : ''}
            disabled={isCreating}
            sx={{ mb: 2 }}
            autoFocus
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            disabled={isCreating}
            sx={{ mb: 2 }}
          />
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <input
                type="checkbox"
                id="hasDueDate"
                checked={hasDueDate}
                onChange={(e) => setHasDueDate(e.target.checked)}
                disabled={isCreating}
                style={{ marginRight: 8 }}
              />
              <label htmlFor="hasDueDate" style={{ fontSize: '0.875rem', color: 'rgba(0, 0, 0, 0.6)' }}>
                Set due date
              </label>
            </Box>
            {hasDueDate && (
              <TextField
                fullWidth
                type="date"
                label="Due Date"
                value={dueAt}
                onChange={(e) => setDueAt(e.target.value)}
                disabled={isCreating}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          </Box>
          <TextField
            fullWidth
            select
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high' | '')}
            disabled={isCreating}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isCreating}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isCreating || !title.trim()}
          >
            {isCreating ? 'Creating...' : 'Create Task'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

