'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  LinearProgress,
} from '@mui/material';
import type { ImportLinkedInDialogProps } from './import-linkedin-dialog.types';

export function ImportLinkedInDialog({
  isOpen,
  importProgress,
  importError,
  isImporting,
  config,
  onClose,
}: ImportLinkedInDialogProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{config.copy.importDialog.title}</DialogTitle>
      <DialogContent>
        {importError ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {config.copy.importDialog.error}: {importError}
          </Alert>
        ) : importProgress ? (
          <Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {isImporting ? config.copy.importDialog.processing : config.copy.importDialog.completed}
            </Typography>

            {importProgress.total > 0 && (
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {importProgress.processed} / {importProgress.total}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {Math.round((importProgress.processed / importProgress.total) * 100)}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(importProgress.processed / importProgress.total) * 100}
                  sx={{ height: 8, borderRadius: 1 }}
                />
              </Box>
            )}

            {importProgress.currentContact && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  {config.copy.importDialog.currentContact}:
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {importProgress.currentContact.name}
                </Typography>
              </Box>
            )}

            <Box sx={{ display: 'flex', gap: 3, mt: 3 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {config.copy.importDialog.stats.total}
                </Typography>
                <Typography variant="h6">{importProgress.total}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {config.copy.importDialog.stats.processed}
                </Typography>
                <Typography variant="h6">{importProgress.processed}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {config.copy.importDialog.stats.created}
                </Typography>
                <Typography variant="h6" color="success.main">
                  {importProgress.created}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">
                  {config.copy.importDialog.stats.skipped}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {importProgress.skipped}
                </Typography>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CircularProgress size={24} />
            <Typography variant="body2">{config.copy.importDialog.processing}</Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isImporting}>
          {config.copy.importDialog.close}
        </Button>
      </DialogActions>
    </Dialog>
  );
}


