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
} from '@mui/material';

interface EditGoalModalProps {
  isOpen: boolean;
  goal: number;
  error: string | null;
  isSaving: boolean;
  onClose: () => void;
  onChangeGoal: (goal: number) => void;
  onSave: () => Promise<void>;
}

export function EditGoalModal({
  isOpen,
  goal,
  error,
  isSaving,
  onClose,
  onChangeGoal,
  onSave,
}: EditGoalModalProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Edit Active Opportunities Goal</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Set your target number of active opportunities to track. Aim to add at least 5 new opportunities per day until you reach your goal.
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <TextField
            fullWidth
            type="number"
            label="Active Opportunities Goal"
            value={goal}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (!isNaN(value)) {
                onChangeGoal(value);
              }
            }}
            inputProps={{
              min: 1,
              max: 1000,
            }}
            error={!!error}
            helperText="Enter a number between 1 and 1000"
            disabled={isSaving}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}




